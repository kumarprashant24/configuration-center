import React, { useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import styles from "./Dashboard.module.css";
import Table from "../Table/Tables";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = ({ refresh, serviceMenu }) => {
  const [TableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [breadcrum, setBreadcrum] = useState({
    serviceName: null,
    configType: null,
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let serviceName = serviceMenu?.find(
      (el) => el.key === params.serviceName
    )?.name;

    let configType = serviceMenu
      ?.find((el) => el.key === params.serviceName)
      ?.submenu.find((el) => el.key === params.configType)?.name;

    setBreadcrum({
      serviceName,
      configType,
    });
    if (serviceMenu && (!serviceName || !configType)) navigate(`/404`);
  }, [serviceMenu, params]);

  return (
    <div className={styles.container}>
      <div className={styles.txt}>
        <h2 className={styles.para}>
          Saved Configurations for {breadcrum.configType}
        </h2>

        <Button
          onClick={() => {
            setShow(true);
            setEditRow({});
          }}
          className={styles.addbutton}
        >
          Add New
        </Button>
        <Popup
          show={show}
          setShow={setShow}
          editRow={editRow}
          refresh={refresh}
          tableData={TableData}
          serviceName={breadcrum.serviceName}
          configType={breadcrum.configType}
        />
      </div>

      <div className={styles.table}>
        <h5>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">{breadcrum.serviceName}</li>
            <li className="breadcrumb-item active">{breadcrum.configType}</li>
          </ol>
        </h5>

        <Table
          infos={TableData}
          setInfos={setTableData}
          setShow={setShow}
          refresh={refresh}
          breadcrum={breadcrum}
        />
      </div>
    </div>
  );
};

export default Dashboard;
