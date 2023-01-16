import axios from "axios";
const Page = require("../common");

class customerInfoService {
  static getCustomerInfo() {
    return axios.get(Page.urls.customer_info);
  }

  static getCustomerInfoById(id) {
    return axios.get(Page.urls.customer_info`/${id}`);
  }

  static doCreateCustomerInfo(customerInfo) {
    return axios.post(Page.urls.customer_info, customerInfo);
  }

  static doEditCustomerInfo(customerInfo) {
    return axios.put(Page.urls.customer_info, customerInfo);
  }

  static doRemoveCustomerInfo(id) {
    return axios.delete(Page.urls.customer_info`/${id}`);
  }
}

export default customerInfoService;
