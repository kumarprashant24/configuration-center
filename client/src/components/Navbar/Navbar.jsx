import React, { useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import MultiLevelMenu from "./MultiLevelMenu";
import "./Navbar.css";

export default function Navbar({ serviceMenu }) {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const menuButtonRef = useRef(null);

  const handleChange = () => {
    setToggle((p) => !p);
  };

  if (location.pathname === "/") return;
  return (
    <>
      <nav className="navbar navbar-expand-lg navBar">
        <div className="container-fluid p-1 ">
          <div
            onClick={handleChange}
            style={{ cursor: "pointer", width: "max-content" }}
            className="ms-2"
            ref={menuButtonRef}
          >
            <i className="fa-solid fa-bars me-2 fa-xl"></i>
            MENU
          </div>
          <div className="flex-c">
            <h5 className="p-0 m-0">Configuration Center</h5>
          </div>
        </div>
      </nav>
      {toggle ? (
        <MultiLevelMenu
          setMenuToggle={setToggle}
          serviceMenu={serviceMenu}
          menuButtonRef={menuButtonRef}
        />
      ) : (
        ""
      )}
    </>
  );
}
