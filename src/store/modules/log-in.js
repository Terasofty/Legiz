import axios from "axios";

const state = {
  token: localStorage.getItem("access_token") || null,
  isLogin: false,
};

const mutations = {
  retrieveToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = null;
  },
  getIsLogin(state) {
    state.isLogin = true;
  },
  getIsLogOut(state) {
    state.isLogin = false;
  },
};

const actions = {
  retrieveToken({ commit }) {
    const token = "login";
    localStorage.setItem("access_token", token);
    commit("retrieveToken", token);
  },

  destroyToken({ commit, getters, state }) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;

    if (getters.loggedIn) {
      localStorage.removeItem("access_token");
      commit("destroyToken");
    }
  },

  getIsLogin({ commit }) {
    commit("getIsLogin");
  },
  getIsLogOut({ commit }) {
    commit("getIsLogOut");
  },
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
