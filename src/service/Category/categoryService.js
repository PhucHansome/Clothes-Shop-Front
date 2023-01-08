import axios from "axios";
const Page = require("../common");

class categoryService {
  static getCategory() {
    return axios.get(Page.urls.category);
  }

  static getCategoryById(id) {
    return axios.get(Page.urls.category + "/" + id);
  }
}

export default categoryService;
