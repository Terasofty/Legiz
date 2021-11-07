import { SET_IS_LAWYERS } from "../mutation-types";
import LawyerService from "@/user-profile/lawyer/services/lawyer.service";

const state = {
  all: [],
};

const mutations = {
  [SET_IS_LAWYERS](state, lawyers) {
    state.all = lawyers;
  },
};

const actions = {
  async getLawyers({ commit }) {
    try {
      let response = await LawyerService.getAll();
      commit(SET_IS_LAWYERS, response.data);
    } catch (error) {
      console.log(error);
    }
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
