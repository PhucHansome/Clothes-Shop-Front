import axios from 'axios';
const Page = require('../common')

class productColorService {
  static getproductColor(){
    return axios.get(Page.urls.product_color)
  }
  
}

export default productColorService;