import { SET_IS_LEGAL_ADVICES } from "../mutation-types";
import legalAdvicesService from "@/law/legal-advices/services/legal-advices.service";

const state = {
  all: [],
};

const mutations = {
  [SET_IS_LEGAL_ADVICES](state, legalAdvices) {
    state.all = legalAdvices;
  },
};

const actions = {
  async getLegalAdvices({ commit }, customerId) {
    try {
      let response = await legalAdvicesService.getByCustomerId(customerId);
      commit(SET_IS_LEGAL_ADVICES, response.data);
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
