import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Await, Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
import "../../../../assets/css/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as BiIcons from "react-icons/bi";
import "../../../../../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import customerInfoService from "../../../../service/customerInfo/customerInfoService";
import locationRegionService from "../../../../service/locationRegion/locationRegionService";

const AddCustomer = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [key, setKey] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    loading: false,
    customerInfor: {
      id: 0,
      user: "",
      fullName: "",
      phone: "",
      debt: "0",
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

  const [locationRegion, setLocationRegion] = useState({
    provinces: [],
    districts: [],
  });

  const [select, setSelect] = useState({
    provinceId: "92",
  });

  const { provinceId, districtId } = select;

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
      const getData = async () => {
        let provinceDataListRes = await locationRegionService.getAllProvinces();
        let districtDataListRes = await locationRegionService.getAllDistricts(
          provinceId
        );
        setLocationRegion({
          provinces: provinceDataListRes.data.results,
          districts: districtDataListRes.data.results,
        });
      };
      getData();
    } catch (error) {}
  }, [provinceId]);

  const { provinces, districts } = locationRegion;

  const handleInputValue = (e) => {
    setCustomerInfo({
      ...customerInfo,
      customerInfor: {
        ...customerInfo,
        [e.target.name]: e.target.value,
      },
    });
    console.log(customerInfo);
  };

  const handleChangeLocation = (e) => {
    if (e.target.name === "provinceId") {
      locationRegion.provinces.map((province) => {
        if (province.province_id === e.target.value) {
          const getDistricts = async () => {
            let provinceValue = e.target.value;
            let ResDistrictChangeProvinceId =
              await locationRegionService.getAllDistricts(provinceValue);
            setSelect({
              ...select,
              provinceId: provinceValue,
            });
            let firtsDistrictId =
              ResDistrictChangeProvinceId.data.results[0].district_id;
            let firtsDistrictName =
              ResDistrictChangeProvinceId.data.results[0].district_name;
            setCustomerInfo({
              ...customerInfo,
              customerInfor: {
                locationRegion: {
                  provinceId: e.target.value,
                  provinceName: province.province_name,
                  districtId: firtsDistrictId,
                  districtName: firtsDistrictName,
                },
              },
            });
          };
          getDistricts();
        }
      });
    }
    if (e.target.name === "districtId") {
      locationRegion.districts.map((district) => {
        if (e.target.value === district.district_id) {
            setCustomerInfo({
              ...customerInfo,
              customerInfor: {
                locationRegion: {
                  ...customerInfor.locationRegion,
                  districtId: district.district_id,
                  districtName: district.district_name,
                },
              },
            });
        }
      });
    }
    if (e.target.name === "address") {
      setCustomerInfo({
        ...customerInfo,
        customerInfor: {
          locationRegion: {
            ...customerInfor.locationRegion,
            address: e.target.value,
          },
        },
      });
    }
  };

  const { customerInfor, loading } = customerInfo;
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
                <div className="row">
                  <div className="col-6">
                    <label className="form-label" htmlFor="form12">
                      Full Name:
                    </label>
                    <input
                      onInput={handleInputValue}
                      name="fullName"
                      type="text"
                      id="form12"
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="form12">
                      Phone Number:
                    </label>
                    <input
                      onInput={handleInputValue}
                      name="phone"
                      type="text"
                      id="form12"
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="form12">
                      Province:
                    </label>
                    <select
                      className="select-css"
                      onChange={handleChangeLocation}
                      name="provinceId"
                    >
                      {provinces.map((province) => (
                        <option
                          value={province.province_id}
                          key={province.province_id}
                        >
                          {province.province_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="form12">
                      District:
                    </label>
                    <select
                      className="select-css"
                      onChange={handleChangeLocation}
                      name="districtId"
                    >
                      {districts.map((district) => (
                        <option
                          value={district.district_id}
                          key={district.district_id}
                        >
                          {district.district_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="form12">
                      Address:
                    </label>
                    <input
                      onChange={handleChangeLocation}
                      name="address"
                      type="text"
                      id="form12"
                      className="form-control"
                    />
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

export default AddCustomer;
