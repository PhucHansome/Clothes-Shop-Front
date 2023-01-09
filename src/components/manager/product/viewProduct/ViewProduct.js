import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
import "../../layout/Manager.css";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import * as BiIcons from "react-icons/bi";
import categoryService from "../../../../service/Category/categoryService";
import productColorService from "../../../../service/productColor/productColorService";
import productSizeService from "../../../../service/productSize/ProductSizeService";
import noAvatar from "../../../../assets/images/choice-a-picture/Bán-hàng-online-nên-bán-gì-và-Cách-xây-dựng-mô-hình-kinh-doanh-ít-vốn-lựa-chọn-sản-phẩm.jpg";
import Spinner from "../../spinner/Spinner";
import FileService from "../../../../service/uploadFile/FileService";
import productService from "../../../../service/products/productService";

const ViewProduct = () => {
  const { slugProduct } = useParams();

  const [sidebar, setSidebar] = useState(false);

  const [select, setSelect] = useState({
    uploading: false,
    file: "",
  });

  const [state, setState] = useState({
    loading: false,
    product: {
      id: 0,
      code: "",
      title: "",
      salesPrice: "",
      quantity: "",
      status: "",
      description: "",
      slug: "",
      entryPrice: "",
      image: "",
      category: "",
      productColor: "",
      productSize: "",
    },
    errorMessage: "",
  });

  let navigate = useNavigate();
  if (localStorage.length === 0) {
    toast.error("You are not logged in");
    setTimeout(function () {
      navigate("/manager/login", { replace: true });
    }, 1000);
  }
  localStorage.removeItem("registerUsername");
  localStorage.removeItem("registerPass");

  useEffect(() => {
    try {
      setState({ ...state, loading: true });
      const getData = async () => {
        let productRes = await productService.getProductBySlug(slugProduct);
        setState({
          ...state,
          product: {
            id: productRes.data.id,
            code: productRes.data.code,
            title: productRes.data.title,
            salesPrice: productRes.data.salesPrice,
            quantity: productRes.data.quantity,
            status: productRes.data.status,
            description: productRes.data.description,
            slug: productRes.data.slug,
            entryPrice: productRes.data.entryPrice,
            image: productRes.data.image,
            category: productRes.data.category,
            productColor: productRes.data.productColor,
            productSize: productRes.data.productSize,
          },
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

  const handleInputValue = (e) => {
    setState({
      ...state,
      product: {
        ...product,
        [e.target.name]: e.target.value,
      },
    });
  };

  const showSidebar = () => setSidebar(!sidebar);

  const { product, loading, errorMessage } = state;

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
            <div className="row mt-3 fs-5">
              <div className="row">
                <div className="col-5">
                  <span>
                    Product View<span>/</span>
                    <span>Product View</span>
                  </span>
                </div>
                <div className="col-5"></div>
                <div className="col-2">
                  <Link
                    to="/manager/product/"
                    className="btn btn-info btn-rounded float-end"
                  >
                    Back Product
                  </Link>
                </div>
              </div>
              <div className="allContent">
                <div className="row">
                  <div className="col-4 center mt-4">
                    <div className="d-flex flex-column align-items-center avatar">
                      <img
                        className="avartar-lg"
                        src={product.image}
                        alt=''
                        width="350px"
                      />
                      <span>Product Picture</span>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="row center mt-4 ">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Title:<span className="text-danger font-weight-bold">{product.title}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Code: <span className="text-danger font-weight-bold">{product.code}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-2">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Quantity:<span className="text-danger font-weight-bold">{product.quantity}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Entry Price:<span className="text-danger font-weight-bold">{product.entryPrice}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-2">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Sales Price:<span className="text-danger font-weight-bold">{product.salesPrice}</span>
                          </label>
                        </div>
                      </div>

                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Slug:{" "}<span className="text-danger font-weight-bold">
                            {product.title === undefined
                              ? ""
                              : product.title
                                  .toLowerCase()
                                  .trim()
                                  .replace(/ /gi, "-")
                                  .replace(/\-\-\-\-\-/gi, "-")
                                  .replace(/\-\-\-\-/gi, "-")
                                  .replace(/\-\-\-/gi, "-")
                                  .replace(/\-\-/gi, "-")
                                  .replace(
                                    /á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g,
                                    "a"
                                  )
                                  .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/, "e")
                                  .replace(/i|í|ì|ỉ|ĩ|ị/, "i")
                                  .replace(
                                    /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,
                                    "o"
                                  )
                                  .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/, "u")
                                  .replace(/ý|ỳ|ỷ|ỹ|ỵ/, "y")
                                  .replace(/đ/, "d")}
                            </span>
                           
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-2">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Product color:<span className="text-danger font-weight-bold">{product.productColor.color}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Product Size: <span className="text-danger font-weight-bold">{product.productSize.size}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-2">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Category: <span className="text-danger font-weight-bold">{product.category.name}</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label fs-5" htmlFor="form12">
                            Status:<span className="text-danger font-weight-bold ">{product.status}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row center mt-2">
                      
                      <div className="col-12">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Description:<span className="text-danger font-weight-bold fs-5">{product.description}</span>
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
export default ViewProduct;
