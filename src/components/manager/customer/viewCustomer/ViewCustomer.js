import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
import "../../../../assets/css/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as BiIcons from "react-icons/bi";
import "../../../../../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import customerInfoService from "../../../../service/customerInfo/customerInfoService";
import locationRegionService from "../../../../service/locationRegion/locationRegionService";
import authService from "../../../../service/auth/authService";

const ViewCustomer = () => {
  const { id } = useParams();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [key, setKey] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    loading: false,
    customerInfor: {
      id: "",
      user: "",
      fullName: "",
      phone: "",
      email: localStorage.getItem("username"),
      locationRegion: {
        provinceId: "",
        provinceName: "",
        districtId: "",
        districtName: "",
        address: "",
      },
    },
    userData: [],
    errorMessage: "",
  });
  localStorage.removeItem("registerUsername");
  localStorage.removeItem("registerPass");

  let navigate = useNavigate();
  if (localStorage.length === 0) {
    toast.error("You are not logged in");
    setTimeout(function () {}, 1000);
  }

  useEffect(() => {
    try {
      const getData = async () => {
        let customerRes = await customerInfoService.getCustomerInfoById(id);
        setCustomerInfo({
          customerInfor: customerRes.data,
        });
      };
      getData();
    } catch (error) {}
  }, []);

  const { customerInfor } = customerInfo;
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
                <li
                  key={index}
                  className={
                    item.title === "Customers"
                      ? "nav-text active-nav"
                      : item.cName
                  }
                >
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
                  <span>
                    Add Customer<span>/</span>
                    <span>Add Customer</span>
                  </span>
                </div>
                <div className="col-5"></div>
                <div className="col-2">
                  <Link
                    to="/manager/customer/"
                    className="btn btn-info btn-rounded float-end"
                  >
                    Back Product
                  </Link>
                </div>
              </div>
              <div className="allContent">
                <div className="row mt-4">
                  <div className="col-4">
                    <div className="d-flex align-items-center">
                      <img
                        src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                        alt=""
                        style={{ width: "285px", height: "285px" }}
                        className="rounded-circle"
                      />

                      <div className="ms-3">
                        <p className="fw-bold mb-1">{customerInfo.fullName}</p>
                        <p className="text-muted mb-0">{customerInfo.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12">
                            Full Name:
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12">
                            {customerInfo.customerInfor.fullName}
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12">
                            Phone Number:
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12 ">
                          {customerInfo.customerInfor.phone}
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12 ">
                           Email
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12 ">
                          {customerInfo.customerInfor.email}
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12">
                          Province:
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12">
                          {customerInfo.customerInfor.locationRegion.provinceName}

                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12">
                            District
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12">
                          {customerInfo.customerInfor.locationRegion.districtName}

                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12">
                            Address
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12">
                          {customerInfo.customerInfor.locationRegion.address}

                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label" htmlFor="form12">
                            User:
                          </label>
                        </div>
                        <div className="col-7">
                          <label className="form-label viewAfter" htmlFor="form12">
                          {customerInfo.customerInfor.user.username}

                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default ViewCustomer;
