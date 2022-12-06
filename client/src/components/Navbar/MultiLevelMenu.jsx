import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCode } from 'react-icons/fa';

export default function MultiLevelMenu({
  setMenuToggle,
  serviceMenu,
  menuButtonRef,
}) {
  const [toggle, setToggle] = useState(false);
  const [subMenu, setSubmenu] = useState([]);
  const [serviceName, setServiceName] = useState("");

  const navigate = useNavigate();
  const menuRef = useRef(null);

  function useOutsideAlerter(ref, menuButtonRef) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref.current && menuButtonRef.current.contains(event.target)) {
            setMenuToggle((p) => p);
          } else {
            setMenuToggle(false);
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
  }

  useOutsideAlerter(menuRef, menuButtonRef);

  const menuList = (val) => {
    serviceMenu?.map((element) => {
      if (element.name === val) setSubmenu(element.submenu);
    });
    setToggle((p) => !p);
  };
  return (
    <div className=" text-white mainMenu" ref={menuRef}>
      <div className=" text-white "></div>

      <div className="p-0" style={{ height: "95%" }}>
        <div className="btn-group dropend d-flex   flex-column w-100 ">
          {serviceMenu?.map((element) =>
            element.submenu.length !== 0 ? (
              <>
                <button
                  type="button"
                  className="btn menuBtn rounded-0 dropdown-toggle text-start p-2 text-white"
                  onClick={() => {
                    menuList(element.name);
                    setServiceName(element.key);
                  }}
                >
                  <i className="fa-brands fa-slack me-2 ms-1" style={{width:"20px"}}></i>
                  {element.name} &nbsp; &nbsp;
                </button>
                {toggle ? (
                  <div
                    className="sideMenu d-flex flex-column"
                    style={{ height: "95%" }}
                  >
                    {subMenu.map((element) => (
                      <button
                        type="button"
                        className="btn subMenuBtn  p-2 pe-5 rounded-0  text-white "
                        onClick={() => {
                          navigate(`/config/${serviceName}/${element.key}`);
                          setMenuToggle(false);
                        }}
                      >
                        <i className="fa-solid fa-store ms-1 me-2"style={{width:"20px"}}></i>
                        {element.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn menuBtn text-white rounded-0 w-100 text-start p-2 "
                  onClick={() => {
                    navigate(`/${element.key}`);
                    setMenuToggle(false);
                  }}
                >
                  
                  {element.name === "Developer Docs" ? (
                    <i className="fa-solid fa-code ms-1 me-2 "  style={{width:"20px"}}></i>
                  ) : (
                    <i className="fa-solid fa-circle-info ms-1 me-2" style={{width:"20px"}}></i>
                  )}
                  {element.name}
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
