import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
import "../../layout/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as BiIcons from "react-icons/bi";
import productService from "../../../../service/products/productService";
import Spinner from "../../spinner/Spinner";
import Helper from "../../helper/Helper";
import "../../../../../node_modules/react-confirm-alert/src/react-confirm-alert.css";

const Product = () => {
  const [sidebar, setSidebar] = useState(false);

  const [key, setKey] = useState("");

  const [state, setState] = useState({
    loading: false,
    products: [],
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

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    try {
      setState({ ...state, loading: true });
      const getData = async () => {
        let productsRes = await productService.getProduct();
        setState({
          ...state,
          products: productsRes.data,
          loading: false,
        });
      };
      getData();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  const handleRemoveProduct = (id) => {
    confirmAlert({
      title: "Remove Product",
      message: "Are You Sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            try {
              async function removeData() {
                setState({ ...state, loading: true });
                let deleteResult = await productService.removeProduct(id);
                let productRes = await productService.getProduct();
                setState({
                  ...state,
                  products: productRes.data,
                });
                toast.success("Product removed success.");
              }
              removeData();
            } catch (error) {
              toast.error(error.message);
              setState({
                ...state,
                loading: false,
                errorMessage: error.message,
              });
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleSearch = (e) => {
    setState({ ...state, loading: false });
    let idSearch = document.getElementById("search-focus");
    let valueBackData = document.getElementById("valueBackData");

    if (idSearch.value.length > 2) {
      async function getData() {
        let resData = await productService.getProduct();
        setState({
          ...state,
          products: resData.data.filter((product) =>
            product.title.toLowerCase().includes(key.toLocaleLowerCase())
          ),
          loading: false,
        });
        if (valueBackData.firstElementChild) {
          valueBackData.removeChild(valueBackData.firstElementChild);
        }
      }
      getData();
    }

    if (idSearch.value.length <= 2) {
      if (valueBackData.firstElementChild) {
        valueBackData.removeChild(valueBackData.firstElementChild);
      }
      let node = document.createElement("span");
      let str = document.createTextNode("Nhập từ 2 ký tự trở lên!!");
      node.appendChild(str);
      valueBackData.appendChild(node).setAttribute("class", "text-secondary-emphasis");

    }

    if (idSearch.value.length === 0) {
      async function data() {
        let resData = await productService.getProduct();
        setState({
          ...state,
          products: resData.data,
          loading: false,
        });
        console.log(resData.data);
        if (valueBackData.firstElementChild) {
          valueBackData.removeChild(valueBackData.firstElementChild);
        }
        let node = document.createElement("span");
        let str = document.createTextNode("Hãy nhập tên sản phẩm!");
        node.appendChild(str);
        valueBackData.appendChild(node).setAttribute("class", "text-danger");
      }
      data();
    }
  };

  const { loading, products, errorMessage } = state;
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
                    item.title === "Products"
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
                <div className="col-2">
                  <span>
                    Products<span>/</span>
                    <span>Products</span>
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
                          onInput={(e) => setKey(e.target.value)}
                          placeholder="Search"
                        />
                      </div>
                      <button
                        onClick={handleSearch}
                        type="button"
                        className="btn btn-primary"
                      >
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <label id="valueBackData"></label>
                  </div>
                </div>
                <div className="col-2"></div>
                <div className="col-3 ">
                  <Link
                    to="/manager/product/add"
                    className="btn btn-dark btn-rounded float-end"
                    data-mdb-ripple-color="dark"
                  >
                    <AiIcons.AiOutlinePlusSquare />
                    &nbsp;Add Product
                  </Link>
                </div>
              </div>
            </div>
            {/* content */}
            <div className="content">
              <div className="row mt-3">
                {loading ? (
                  <Spinner />
                ) : (
                  products.length > 0 &&
                  products.map((product) => (
                    <div className="col-3 " key={product.id}>
                      <div className="card" style={{ boderRadius: "15px" }}>
                        <div>
                          <button
                            className="Iconx float-end btn btn-danger fs-5"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <BiIcons.BiX />
                          </button>
                          <img
                            src={product.image}
                            height="350px"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="list-group-item header">
                            Title: &nbsp;{product.title}
                          </h5>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              category:&nbsp;
                              {product.category.name}
                            </li>
                            <li className="list-group-item">
                              Status: &nbsp; {product.status}
                            </li>
                            <li className="list-group-item">
                              Quantity:&nbsp; {product.quantity}
                            </li>
                            <li className="list-group-item">
                              Price:&nbsp;
                              {Helper.formatNumberVND(product.salesPrice)}
                            </li>
                          </ul>
                        </div>

                        <div className="card-body ">
                          <Link
                            to={`/manager/product/view/${product.slug}`}
                            className="btn btn-warning float-start"
                          >
                            View
                          </Link>
                          <Link
                            to={`/manager/product/edit/${product.slug}`}
                            className="btn btn-success float-end"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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

export default Product;
