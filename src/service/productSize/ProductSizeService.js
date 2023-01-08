import axios from "axios";
const Page = require("../common");

class ProductSizeService {
  static getProductSize() {
    return axios.get(Page.urls.product_size);
  }

  static getProductSizeById(id) {
    return axios.get(Page.urls.product_size + "/" + id);
  }
}

export default ProductSizeService;
