import React from "react";
import { useState, useEffect } from "react";
import styles from "./Tables.module.css";
import Moment from "react-moment";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import constants from "../../constants";
import { useParams } from "react-router-dom";
import Popup from "../Popup/Popup";

function Tables({ infos, setInfos, refresh, breadcrum }) {
  const [show, setShow] = useState(false);
  const [editRow, setEditRow] = useState({});
  const params = useParams();
  const handleEdit = (data) => {
    setEditRow(data);
    setShow(true);
  };

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${constants.API_URI}/config/${id}`);

      toast.success("Deleted Successfully");
      refresh();
      data._id && setInfos(infos.filter(({ _id }) => _id !== data._id));
    } catch (error) {
      console.log(error.message);
      return toast.error("Error please try again later");
    }
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, params]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${constants.API_URI}/config/${params.serviceName}/${params.configType}`
      );
      console.log(data);
      setInfos(data?.config[params.configType] || []);
    } catch (error) {
      console.log(error);
      toast.error("Error please try again later");
    }
  };

  return (
    <>
      <Popup
        show={show}
        refresh={refresh}
        setShow={setShow}
        editRow={editRow}
        tableData={infos}
        serviceName={breadcrum.serviceName}
        configType={breadcrum.configType}
      />
      <Table bordered hover responsive>
        <thead>
          <tr className={styles.head}>
            <th>Market Name</th>
            <th>Jurisdictions</th>
            <th>Date Added</th>
            <th>Enabled</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className={styles.body}>
          {infos.map((info) => (
            <tr key={info.id}>
              <td>{info.marketName}</td>

              <td>{info.jurisdiction.toString().replaceAll(",", " ")}</td>

              <td>
                <Moment format="dddd, MMMM Do, h:mm a">{info.updatedAt}</Moment>
              </td>

              <td className={styles.check}>
                <input type="checkbox" checked={info.enabled} readOnly />
              </td>

              <td>
                <div className={styles.t_flex}>
                  <button
                    className={styles.space1}
                    onClick={() => handleEdit(info)}
                  >
                    <MdEdit />
                  </button>

                  <button
                    className={styles.space2}
                    onClick={() => handleDelete(info.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Tables;
