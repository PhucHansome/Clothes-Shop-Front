import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
import "../../../../assets/css/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as BiIcons from "react-icons/bi";
import productService from "../../../../service/products/productService";
import Spinner from "../../spinner/Spinner";
import Helper from "../../helper/Helper";
import "../../../../../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import customerInfoService from "../../../../service/customerInfo/customerInfoService";

const CustomerList = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [key, setKey] = useState("");

  const [state, setState] = useState({
    loading: false,
    customerInfores: [],
    errorMessage: "",
  });

  localStorage.removeItem("registerUsername");
  localStorage.removeItem("registerPass");

  let navigate = useNavigate();
  if (localStorage.length === 0) {
    toast.error("You are not logged in");
    setTimeout(function () {
      navigate("/manager/login", { replace: true });
    }, 1000);
  }

  useEffect(() => {
    try {
      setState({ ...state, loading: true });
      const getData = async () => {
        let dataCustomers = await customerInfoService.getCustomerInfo();
        setState({
          ...state,
          loading: false,
          customerInfores: dataCustomers.data,
        });
        console.log(dataCustomers.data);
      };
      getData();
    } catch (error) {}
  }, []);

  const { loading, customerInfores, errorMessage } = state;
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
                toast.success("logout success");
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
            {/* navbar content */}
            <div className="row mt-3 fs-5 ">
              <div className="row">
                <div className="col-3">
                  <span>
                    Customers<span>/</span>
                    <span>Customers</span>
                  </span>
                </div>
                <div className="col-1"></div>
                <div className="col-4">
                  <div className="row">
                    <div className="input-group">
                      <div className="form-outline">
                        <input
                          id="search-focus"
                          type="search"
                          className="form-control"
                          //   onInput={(e) => setKey(e.target.value)}
                          placeholder="Search"
                        />
                      </div>
                      <button
                        // onClick={handleSearch}
                        type="button"
                        className="btn btn-primary"
                      >
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <label id="contentSearch"></label>
                  </div>
                </div>
                <div className="col-1"></div>
                <div className="col-3 ">
                  <Link
                    to="/manager/customer/add"
                    className="btn btn-dark btn-rounded float-end"
                    data-mdb-ripple-color="dark"
                  >
                    <AiIcons.AiOutlinePlusSquare />
                    &nbsp;Add Customer
                  </Link>
                </div>
              </div>
            </div>
            {/* content */}
            <div className="content">
              <div className="row mt-3">
                <table className="table table-hover table-dark text-nowrap">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th className="text-center">Phone</th>
                      <th>Debt</th>
                      <th colSpan={3} className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td className="text-center">
                          <div>
                            <Spinner />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      customerInfores.length > 0 &&
                      customerInfores.map((customerInfo) => (
                        <tr key={customerInfo.id}>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              {customerInfo.user.role.id === 1 ? (
                                <img
                                  src="https://thumbs.dreamstime.com/b/admin-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135742404.jpg"
                                  alt=""
                                  style={{ width: "45px", height: "45px" }}
                                />
                              ) : (
                                <img
                                  src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                                  alt=""
                                  style={{ width: "45px", height: "45px" }}
                                  className="rounded-circle"
                                />
                              )}

                              <div className="ms-3">
                                <p className="fw-bold mb-1">
                                  {customerInfo.fullName}
                                </p>
                                <p className="text-muted mb-0">
                                  {customerInfo.user.username}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="fw-normal text-muted mb-1">
                              {customerInfo.locationRegion.provinceName}
                            </p>
                            <p className="text-muted  mb-1">
                              {customerInfo.locationRegion.districtName}
                            </p>
                            <p className="text-muted  mb-0">
                              {customerInfo.locationRegion.address}
                            </p>
                          </td>
                          <td className="align-middle text-center">
                            <span className="badge badge-success rounded-pill  d-inline">
                              {customerInfo.phone}
                            </span>
                          </td>
                          <td className="text-muted align-middle">
                            {customerInfo.debt}
                          </td>
                          <td className="text-center align-middle">
                            <button
                              type="button"
                              className="btn btn-warning btn-sm btn-rounded fw-bold"
                            >
                              <AiIcons.AiOutlineUser />
                            </button>
                          </td>
                          <td className="text-center align-middle">
                            <button
                              type="button"
                              className="btn btn-success btn-sm btn-rounded fw-bold"
                            >
                              <FaIcons.FaEdit />
                            </button>
                          </td>
                          <td className="text-center align-middle">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm btn-rounded fw-bold"
                            >
                              <FaIcons.FaBan />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="row mt-2">
                <div className="text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default CustomerList;
