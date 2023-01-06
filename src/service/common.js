const App = require("./API-Url");

const Page = {
  urls: {
    login: App.BASE_URL_AUTH + "/login",
    register: App.BASE_URL_AUTH + "/register",
    getUser : App.BASE_URL_AUTH + "/token/user",
    postToken : App.BASE_URL_AUTH + "/token" ,
    category : App.BASE_URL_CATEGORY,
    product : App.BASE_URL_PRODUCT,
    product_size: App.BASE_URL_PRODUCTSIZE,
    product_color : App.BASE_URL_PRODUCTCOLOR,
    product_image : App.BASE_URL_PRODUCTIMAGE
  },
  elements: {},
  loadData: {},
  commands: {},
  dialogs: {
    elements: {},
    loadData: {},
    commands: {},
    close: {},
    alertDanger: {},
    inputError: {},
  },
};

module.exports = Page;
