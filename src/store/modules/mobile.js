import { SET_IS_MOBILE } from "../mutation-types";
import { enquireScreen } from "enquire-js";

const state = {
  isMobile: false,
};

const mutations = {
  [SET_IS_MOBILE](state, b) {
    state.isMobile = b;
  },
};

const actions = {
  isMobile({ commit }) {
    enquireScreen(b => {
      commit(SET_IS_MOBILE, !!b);
    });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
