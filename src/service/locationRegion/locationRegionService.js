import axios from "axios";
const Page = require("../common");

class locationRegionService {
  static getAllProvinces() {
    return axios.get(Page.urls.locationRegion);
  }

  static getAllDistricts(provinceId) {
    return axios.get(Page.urls.locationRegion + "/district/" + provinceId);
  }
}

export default locationRegionService;
