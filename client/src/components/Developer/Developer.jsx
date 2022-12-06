import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import constants from "../../constants";
import "./Developer.css";
export default function Developer() {
  const [serviceMenu, setServiceMenu] = useState([]);
  const [resetMenu, setResetMenu] = useState({ selected: "Select Service" });
  const [resetSubMenu, setResetSubMenu] = useState({
    selected: "Select Config Type",
  });
  const [serviceName, setServiceName] = useState([]);
  const [subMenu, setSubMenu] = useState([]);
  const [serviceKey, setServiceKey] = useState(null);
  const [configKey, setConfigKey] = useState(null);

  const [selectedServiceName, setSelectedServiceName] = useState(null);
  const [selectedConfigName, setSelectedConfigName] = useState(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [toggleSubMenu, setToggleSubMenu] = useState(true);
  const [header, setHeader] = useState({
    serviceName: "",
    configName: "",
  });

  useEffect(() => {
    axios
      .get(`${constants.API_URI}/menu`)
      .then((res) => {
        console.log(res.data);
        setServiceMenu(res.data);
        getServiceNames(res.data);
      })
      .catch(() => toast.error("Error on fetching menu"));
  }, []);

  const getServiceNames = (data) => {
    setServiceName(
      data
        .filter((element) => {
          return (
            element.name !== "Developer Docs" && element.name !== "About Us"
          );
        })
        .map((el) => {
          return { name: el.name, key: el.key };
        })
    );
  };
  const selectMenu = (e) => {
    const menuIdx = e.nativeEvent.target.selectedIndex;
    setSelectedServiceName(e.nativeEvent.target[menuIdx].text);
    setResetSubMenu({ selected: "Select Config Type" });
    setConfigKey(null);
    setToggle(false);
    setResetMenu({ selected: e.target.value });
    setToggleSubMenu(false);
    setServiceKey(e.target.value);
    serviceMenu.map((element) => {
      if (element.key === e.target.value) {
        setSubMenu(element.submenu);
      }
    });
  };
  const selectSubMenu = (e) => {
    const menuIdx = e.nativeEvent.target.selectedIndex;
    setSelectedConfigName(e.nativeEvent.target[menuIdx].text);
    setConfigKey(e.target.value);
    setResetSubMenu({ selected: e.target.value });
  };

  const fetchData = async (e) => {
    try {
      let api_url = "";
      configKey === null
        ? (api_url = `${constants.API_URI}/config/${serviceKey}`)
        : (api_url = `${constants.API_URI}/config/${serviceKey}/${configKey}`);
      await axios
        .get(api_url)
        .then((res) => {
          setApiData(JSON.stringify(res.data, null, 4));
          setApiUrl(api_url);
          setResetMenu({ selected: "Select Service" });
          setResetSubMenu({ selected: "Select Config Type" });
          setSubMenu([]);
          setToggle(true);
          setToggleSubMenu(true);
          setConfigKey(null);
          setServiceKey(null);
          setHeader({
            serviceName: selectedServiceName,
            configName: selectedConfigName,
          });
          setHideHeader(true);
          setSelectedServiceName(null);
          setSelectedConfigName(null);
        })
        .catch(() => toast.error("Error on fetching menu"));
    } catch (error) {
      console.log(error.message);
      toast.error("Error please try again later");
    }
  };

  return (
    <>
      <div className="container px-4 mt-5">
        <h1 className="text-center">Config Response</h1>
        <div className="row mt-5">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control bg-white border-0"
              placeholder="Api URL..."
              value={apiUrl}
              readOnly
            />
          </div>
        </div>
        <div className="row gx-5 gy-4 mt-1 mb-2">
          <div className="col-md-6">
            <div
              className="card border-0 shadow-lg bg-body "
              style={{ height: "400px" }}
            >
              <div className="card-header p-3">
                <div className="d-flex">
                  <div className="dot bg-danger"></div>
                  <div className="dot bg-warning ms-1"></div>
                  <div className="dot bg-success ms-1"></div>
                </div>
              </div>
              <div className="card-body h-100" style={{ overflow: "auto" }}>
                <h5>Usage</h5>
                <hr />
                <ul className="mt-4">
                  <li>Select the service name.</li>
                  <li>Then select the config type (This is optional).</li>
                  <li>Get config by clicking on submit button.</li>
                  <li>
                    You can copy config and use it anywhere or you could use the
                    API that is shown above to get same config.
                  </li>
                </ul>

                <div className="row gy-2 mt-3 ">
                  <div className="col-md-6">
                    <select
                      className="form-select "
                      aria-label="Default select example"
                      onChange={(e) => selectMenu(e)}
                      value={resetMenu.selected}
                    >
                      <option selected disabled>
                        Select Service
                      </option>
                      {serviceName.map((element) => (
                        <option value={element.key}>{element.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => selectSubMenu(e)}
                      disabled={toggle}
                      value={resetSubMenu.selected}
                    >
                      <option selected disabled>
                        Select Config Type
                      </option>
                      {subMenu.map((element) => (
                        <option value={element.key}>{element.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2">
                    <button
                      className="btn btn-success float-end"
                      disabled={toggleSubMenu}
                      onClick={(e) => fetchData(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div
              className="card border-0  shadow-lg bg-body "
              style={{ height: "400px" }}
            >
              <div className="card-header p-3">
                <ol className="breadcrumb m-0" style={{ height: "15px" }}>
                  {hideHeader ? (
                    <>
                      <li className="breadcrumb-item active">
                        {header.serviceName}
                      </li>
                      <li className="breadcrumb-item active">
                        {header.configName}
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </ol>
              </div>
              <div className="card-body p-2 ">
                <textarea
                  readOnly
                  className="p-2 form-control bg-white border-0 w-100 h-100"
                  placeholder="You JSON will appear here..."
                  value={apiData}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
