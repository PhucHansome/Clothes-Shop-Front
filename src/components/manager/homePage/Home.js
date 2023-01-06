import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../sideBarData/SidebarData";
import "../layout/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import * as BiIcons from "react-icons/bi";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);

  let navigate = useNavigate();
  if (localStorage.length === 0) {
    toast.error("You are not logged in");
    setTimeout(function () {
      navigate("/manager/login", { replace: true });
    }, 1000);
  }

  const showSidebar = () => setSidebar(!sidebar);

  localStorage.removeItem("registerUsername");
  localStorage.removeItem("registerPass");

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="col-3">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <div className="col-8">
            <span className="float-end">
              {localStorage.getItem("username")}
            </span>
          </div>
          <div className="col-1">
            <Link
              to="/manager/login"
              onClick={() => {
                localStorage.clear();
                toast.success("Logout success");
              }}
              className="logout"
            >
              <BiIcons.BiLogIn />
            </Link>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu" : "nav-menu active"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.title === "Home" ? "nav-text active-nav" : item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={sidebar ? "row contents-active" : "row contents"}>
          <div className="container">
            {/* content  */}
            <div className="row mt-3 fs-5">
              <div className="row">
                <div className="col-5">
                  <span>Home Page<span>/</span>
                    <span>Home Page</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Home;
