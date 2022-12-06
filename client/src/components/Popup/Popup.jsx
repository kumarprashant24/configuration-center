import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader/Loader";
import Menu from "../Menu/Menu";
import styles from "./Popup.module.css";

const Popup = ({
  setShow,
  show,
  editRow,
  refresh,
  tableData,
  serviceName,
  configType,
}) => {
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {loading && (
          <div className={styles.fullModalLoading}>
            <Loader />
          </div>
        )}
        <Modal.Header>
          <h3 className={styles.modalheading}>
            {editRow.id ? "Update Configuration" : "Add Configuration"}
          </h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body>
          <Menu
            modalClose={handleClose}
            setLoading={setLoading}
            rowData={editRow}
            refresh={refresh}
            tableData={tableData}
            serviceName={serviceName}
            configType={configType}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
