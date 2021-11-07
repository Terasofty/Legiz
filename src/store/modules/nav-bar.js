import { SET_IS_PROFILE } from "../mutation-types";

const state = {
  isProfile: false,
};

const mutations = {
  [SET_IS_PROFILE](state, isProfile) {
    state.isProfile = isProfile;
  },
};

const actions = {
  isProfile({ commit }, payload) {
    commit(SET_IS_PROFILE, payload);
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
