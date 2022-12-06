import { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Menu.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import constants from "../../constants";
import { useParams } from "react-router-dom";

function Menu({
  refresh,
  modalClose,
  setLoading,
  rowData,
  tableData,
  serviceName,
  configType,
}) {
  const params = useParams();
  const [record, setRecord] = useState({
    marketName: rowData.marketName || "",
    jurisdiction: rowData.jurisdiction || [],
    enabled: rowData.enabled === undefined ? true : rowData.enabled,
  });

  const [marketTypes, setMarketTypes] = useState(null);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 200);
  };

  useEffect(() => {
    async function getterData() {
      setLoading(true);
      const resMarket = await axios.get(`${constants.API_URI}/market-types`);
      setMarketTypes(resMarket.data);
      setLoading(false);
    }
    getterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Send the records
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dubError = false;
      let orgName = "";
      const lowerMNOne = record.marketName.toLowerCase().replaceAll(" ", "");
      const lowerSavedMN = tableData.map((e) =>
        e.marketName.toLowerCase().replaceAll(" ", "")
      );

      if (lowerSavedMN.includes(lowerMNOne)) {
        dubError = true;
        orgName = tableData[lowerSavedMN.indexOf(lowerMNOne)].marketName;
        if (rowData.marketName === record.marketName) {
          dubError = false;
        }
      }
      if (dubError) {
        return toast.warn(`Record already exists for ${orgName}`);
      }

      let marketName = record.marketName.trim();
      marketTypes.forEach((m) => {
        if (
          m.bet_option.toLowerCase().replaceAll(" ", "") ===
          record.marketName.toLowerCase().replaceAll(" ", "")
        ) {
          marketName = m.bet_option;
        }
      });

      if (record.jurisdiction.length === 0)
        return toast.warn("Select atleast one jurisdiction");
      else if (rowData.id) {
        await axios
          .put(`${constants.API_URI}/config/${rowData.id}`, {
            ...record,
            marketName,
          })
          .then((res) => {
            toast.success("Configuration updated");
            refresh();
            modalClose();
          });
      } else {
        await axios
          .post(
            `${constants.API_URI}/config/${params.serviceName}/${params.configType}`,
            { ...record, marketName }
          )
          .then((res) => {
            toast.success("Configuration added");
            refresh();
            modalClose();
          });
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Error on submission, try again later");
    }
  };
  const handleJudsSelect = (e) => {
    const val = e.target.value;
    let juds = record.jurisdiction;
    if (juds.includes(val)) {
      setRecord((prev) => ({
        ...prev,
        jurisdiction: juds.filter((v) => v !== val),
      }));
    } else setRecord((prev) => ({ ...prev, jurisdiction: [...juds, val] }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className={styles.innerBox}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">{serviceName}</li>
            <li className="breadcrumb-item active">{configType}</li>
          </ol>

          <InputGroup className="mb-3">
            <div>Market Name</div>
            <div className="my-2 w-100 align-self-center position-relative">
              <input
                type="text"
                className="w-100 form-control"
                placeholder="Select Market Type"
                autoComplete="off"
                onChange={(e) =>
                  setRecord((prev) => ({ ...prev, marketName: e.target.value }))
                }
                value={record.marketName}
                onFocus={onFocus}
                onBlur={onBlur}
                required
              />
              <div
                className="dropdown-search w-100 position-absolute left-0"
                style={{ zIndex: 1 }}
              >
                <ul
                  className="list-group overflow-auto"
                  style={{ maxHeight: "200px" }}
                >
                  {focused &&
                    marketTypes
                      ?.filter((el) => {
                        if (
                          tableData
                            .map((e) => e.marketName)
                            .includes(el.bet_option)
                        ) {
                          if (rowData.marketName === el.bet_option) return true;
                          return false;
                        }

                        if (record.marketName && el.enabled) {
                          return el.bet_option
                            .toLowerCase()
                            .includes(record.marketName.toLowerCase());
                        } else {
                          return el.enabled;
                        }
                      })
                      .map(({ bet_option }, i) => (
                        <li
                          key={i}
                          className={`list-group-item pointer ${styles.hoverrow}`}
                          onClick={() => {
                            setRecord((prev) => ({
                              ...prev,
                              marketName: bet_option,
                            }));
                            setFocused(false);
                          }}
                        >
                          <div className="row text-dark">
                            <div className="col-auto d-flex">
                              <span className="m-0">{bet_option}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </div>{" "}
          </InputGroup>

          <InputGroup className="mb-3">
            <div>Select Jurisdiction</div>
            <div className="my-2 align-self-center row">
              {constants.JURISDICTION.map((jud) => (
                <div className="form-check col-4" key={jud}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={jud}
                    onChange={handleJudsSelect}
                    id={jud}
                    checked={record.jurisdiction.includes(jud)}
                  />
                  <label className="form-check-label" htmlFor={jud}>
                    {jud}
                  </label>
                </div>
              ))}
            </div>
          </InputGroup>

          <InputGroup className="mb-3">
            <div className={styles.icenter}>Enabled</div>
            <Form.Check
              type="checkbox"
              className={`mx-2 ${styles.checkboxfeatured}`}
              onChange={(e) =>
                setRecord((prev) => ({ ...prev, enabled: e.target.checked }))
              }
              checked={record.enabled}
            />
          </InputGroup>

          <div className={styles.savebuttondiv}>
            <Button className={styles.savebutton} type="submit">
              {rowData.id ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Menu;
