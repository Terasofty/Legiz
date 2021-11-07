import Vue from "vue";
import Vuex from "vuex";
import navBars from "./modules/nav-bar";
import lawyers from "./modules/lawyers";
import customers from "./modules/customers";
import logIn from "./modules/log-in";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    navBars,
    lawyers,
    customers,
    logIn,
  },
  strict: debug,
});
