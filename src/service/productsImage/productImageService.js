import axios from "axios";
const Page = require("../common");

class productImageService {
  static getProductImage(productId) {
    return axios.get(Page.urls.product_image+ '/' + productId);
  }

  static postProductImage(product_image){
    return axios.post(Page.urls.product_image , product_image)
  }
  
  static removeImage(product_image){
    return axios.delete(Page.urls.product_image, product_image);
  }
}

export default productImageService;
