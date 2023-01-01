const App = require("./API-Url");

const Page = {
  urls: {
    login: App.BASE_URL_AUTH + "/login",
    register: App.BASE_URL_AUTH + "/register",
    getUser : App.BASE_URL_AUTH + "/token/user",
    postToken : App.BASE_URL_AUTH + "/token"
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
