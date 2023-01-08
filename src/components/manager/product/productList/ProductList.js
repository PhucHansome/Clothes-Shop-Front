import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
import "../../layout/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import * as BiIcons from "react-icons/bi";
import productService from "../../../../service/products/productService";
import Spinner from "../../spinner/Spinner";
import Helper from "../../helper/Helper";

const Product = () => {
  const [sidebar, setSidebar] = useState(false);

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
                    Product<span>/</span>
                    <span>Product</span>
                  </span>
                </div>
                <div className="col-1"></div>
                <div className="col-3">
                  <div className="input-group">
                    <div className="form-outline">
                      <input
                        id="search-focus"
                        type="search"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form1">
                        Search
                      </label>
                    </div>
                    <button type="button" className="btn btn-primary">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3 ">
                  <Link to='/manager/product/add'
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
                      <div className="card" style={{ "boderRadius": "15px" }}>
                        <img
                          src={product.image}
                          height="350px"
                          className="card-img-top"
                          alt="..."
                        />
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
                          <button className="btn btn-success float-start">
                            View
                          </button>
                          <button href="#" className="btn btn-danger float-end">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Product;
