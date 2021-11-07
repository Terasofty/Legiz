import { SET_IS_LEGAL_ADVICES, SET_IS_ADD_LEGAL_ADVICE } from "../mutation-types";
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
  async addLegalAdvice(legalAdviceDto) {
    let response = await legalAdvicesService.create(legalAdviceDto);
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
