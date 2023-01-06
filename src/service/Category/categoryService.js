import axios from 'axios';
const Page = require('../common')

class categoryService {
  static getCategory(){
    return axios.get(Page.urls.category)
  }
  
}

export default categoryService;