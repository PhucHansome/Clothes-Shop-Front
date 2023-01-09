import axios from "axios";
const Page = require("../common");

class productService {
  static getProduct() {
    return axios.get(Page.urls.product);
  }

  static getProductById(id) {
    return axios.get(Page.urls.product + "/" + id);
  }

  static getProductBySlug(slug) {
    return axios.get(Page.urls.product + "/slug/" + slug);
  }

  static doCreateProduct(product) {
    return axios.post(Page.urls.product, product);
  }

  static removeProduct(id) {
    return axios.delete(Page.urls.product + '/' + id);
  }

  static editProduct(product){
    return axios.put(Page.urls.product, product)
  }
}

export default productService;
