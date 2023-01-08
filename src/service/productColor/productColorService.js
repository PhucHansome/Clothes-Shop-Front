import axios from "axios";
const Page = require("../common");

class productColorService {
  static getproductColor() {
    return axios.get(Page.urls.product_color);
  }

  static getproductColorById(id) {
    return axios.get(Page.urls.product_color + "/" + id);
  }
}

export default productColorService;
