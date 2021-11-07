import axios from "axios";

const state = {
  token: localStorage.getItem("access_token") || null,
  isCustomer: false,
};

const mutations = {
  retrieveToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = null;
  },
  setIsCustomer(state) {
    state.isCustomer = true;
  },
  setIsLawyer(state) {
    state.isCustomer = false;
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
  getIsCustomer({ commit }) {
    commit("setIsCustomer");
  },
  getIsLawyer({ commit }) {
    commit("setIsLawyer");
  },
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  getColorNavMain(state) {
    if (state.isCustomer) return "primary";
    else return "secondary";
  },
  getProfile(state) {
    if (state.isCustomer) return "Profile";
    else return "LawyerProfile";
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
