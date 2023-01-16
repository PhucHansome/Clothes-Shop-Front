import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarData } from "../../sideBarData/SidebarData";
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
import "../../../../assets/css/Manager.css";

const EditProduct = () => {
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
    categoryData: [],
    productColorData: [],
    productSizeData: [],
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
        let categoryRes = await categoryService.getCategory();
        let productColorRes = await productColorService.getproductColor();
        let productSizeRes = await productSizeService.getProductSize();
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
            category: productRes.data.category.id,
            productColor: productRes.data.productColor.id,
            productSize: productRes.data.productSize.id,
          },
          categoryData: categoryRes.data,
          productColorData: productColorRes.data,
          productSizeData: productSizeRes.data,
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

  const changeAvatar = (e) => {
    let seclet_file = e.target.files[0];
    if (seclet_file) {
      setSelect({ ...select, uploading: true });
      const uploadImage = async () => {
        let uploadResult = await FileService.upload(seclet_file);
        console.log(uploadResult.data);
        product.image = uploadResult.data.url;
        setSelect({
          ...select,
          uploading: false,
        });
        toast.success("Avatar uploaded success");
      };
      uploadImage();
    } else {
      toast.info("Please select an Avatar");
    }
  };

  const doEditProduct = async () => {
    try {
      setState({ ...state, loading: true });
      if (product.productColor === "" || product.productColor === "0") {
        toast.error("Hãy chọn Màu sắc sản phẩm");
        return;
      }

      if (product.productSize === "" || product.productSize === "0") {
        toast.error("Hãy chọn Kích thước sản phẩm");
        return;
      }

      if (product.category === "" || product.productSize === "0") {
        toast.error("Hãy chọn Thể loại sản phẩm");
        return;
      }

      let productColorRes = await productColorService.getproductColorById(
        product.productColor
      );

      let productSizeRes = await productSizeService.getProductSizeById(
        product.productSize
      );

      let CategoryRes = await categoryService.getCategoryById(product.category);

      product.productColor = productColorRes.data;
      product.productSize = productSizeRes.data;
      product.category = CategoryRes.data;

      if (product.quantity > 0) {
        product.status = "Sản phẩm Đã lên Kệ";
      }

      if (product.quantity <= 0) {
        product.status = "Sản phẩm Đã Hết hàng";
      }

      product.slug = product.title
        .toLowerCase()
        .trim()
        .replace(/ /gi, "-")
        .replace(/\-\-\-\-\-/gi, "-")
        .replace(/\-\-\-\-/gi, "-")
        .replace(/\-\-\-/gi, "-")
        .replace(/\-\-/gi, "-")
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/, "e")
        .replace(/i|í|ì|ỉ|ĩ|ị/, "i")
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/, "u")
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/, "y")
        .replace(/đ/, "d");
      let productRest = await productService.editProduct(product);
      setState({ ...state, loading: false });
      console.log(productRest.data);
      if (productRest.data) {
        toast.success("Edit Product Success");
        navigate("/manager/product", { replace: true });
      }
    } catch (error) {}
  };

  const {
    product,
    categoryData,
    productSizeData,
    productColorData,
    loading,
    errorMessage,
  } = state;

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
                    Add Product<span>/</span>
                    <span>Add Product</span>
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
                        src={product.image || noAvatar}
                        width="350px"
                        alt=""
                        onClick={() =>
                          document.querySelector("#fileAvatar").click()
                        }
                      />
                      <input
                        className="form-control d-none"
                        accept="image/*"
                        type="file"
                        id="fileAvatar"
                        onChange={changeAvatar}
                        required
                      />
                      <span>Select a Picture Product</span>
                      {select.uploading ? <Spinner /> : ""}
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="row center mt-4 ">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Title:
                          </label>
                          <input
                            onInput={handleInputValue}
                            name="title"
                            type="text"
                            id="form12"
                            value={product.title}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Code:
                          </label>
                          <input
                            onInput={handleInputValue}
                            name="code"
                            type="text"
                            id="form12"
                            value={product.code}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-3">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Quantity:
                          </label>
                          <input
                            onInput={handleInputValue}
                            name="quantity"
                            type="text"
                            id="form12"
                            value={product.quantity}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Entry Price:
                          </label>
                          <input
                            onInput={handleInputValue}
                            name="entryPrice"
                            type="number"
                            id="form12"
                            value={product.entryPrice}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-3">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Sales Price:
                          </label>
                          <input
                            onInput={handleInputValue}
                            name="salesPrice"
                            type="number"
                            id="form12"
                            value={product.salesPrice}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Slug:
                          </label>
                          <input
                            onInput={handleInputValue}
                            value={
                              product.title === undefined
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
                                    .replace(/đ/, "d")
                            }
                            name="slug"
                            type="text"
                            id="form12"
                            className="form-control"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-3">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Product color:
                          </label>
                          <select
                            className="select-css"
                            onInput={handleInputValue}
                            name="productColor"
                            value={product.productColor}
                          >
                            <option value="0" key="0">
                              Select a Product Color
                            </option>
                            {productColorData.map((productColor) => (
                              <option
                                // name="product_color"
                                value={productColor.id}
                                key={productColor.id}
                              >
                                {productColor.color}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Product Size:
                          </label>
                          <select
                            className="select-css"
                            name="productSize"
                            onInput={handleInputValue}
                            value={product.productSize}
                          >
                            <option value="0" key="0">
                              Select a Product Size
                            </option>
                            {productSizeData.map((productSize) => (
                              <option
                                value={productSize.id}
                                key={productSize.id}
                              >
                                {productSize.size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                    <div className="row center mt-3">
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Category:
                          </label>
                          <select
                            className="select-css"
                            name="category"
                            onInput={handleInputValue}
                            value={product.category}
                          >
                            <option value="0" key="0">
                              Select a Category
                            </option>
                            {categoryData.map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form12">
                            Description:
                          </label>
                          <textarea
                            onInput={handleInputValue}
                            name="description"
                            type="text"
                            id="form12"
                            value={product.description}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row center mt-3">
                      <div className="col-8">
                        <button className="btn btn-danger float-end">
                          Reset
                        </button>
                      </div>
                      <div className="col-3">
                        {select.uploading ? (
                          <button
                            onClick={doEditProduct}
                            className="btn btn-success float-end"
                            disabled
                          >
                            Edit Product
                          </button>
                        ) : (
                          <button
                            onClick={doEditProduct}
                            className="btn btn-success float-end"
                          >
                            Edit Product
                          </button>
                        )}
                      </div>
                      <div className="col-1"></div>
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

export default EditProduct;
