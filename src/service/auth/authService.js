import axios from 'axios';
import Cookies from 'js-cookie';
const Page = require('../common')

class authService {
  static login(user){
    return axios.post(Page.urls.login,user)
  }
  static register(user){
    return axios.post(Page.urls.register,user)
  }
  static getUser() {
    return axios.post(Page.urls.postToken)
  }

  static getUserByUserName(userName){
    return axios.get(Page.urls.getUser+ "/" + userName)
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static getToken() {
    let tokenJWT = Cookies.get('JWT')
    if (tokenJWT) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenJWT}`;
      return axios.post(Page.urls.postToken);
    }
  }
}

export default authService;