import { SET_IS_CUSTOM_CASES_BY_ID, SET_IS_LAWYERS, SET_IS_LEGAL_ADVICES_BY_ID } from "../mutation-types";
import lawyerService from "@/user-profile/lawyer/services/lawyer.service";

const state = {
  all: [],
  legalAdvices: [],
  customCases: [],
  id: 1,
};

const mutations = {
  [SET_IS_LAWYERS](state, lawyers) {
    state.all = lawyers;
  },
  [SET_IS_LEGAL_ADVICES_BY_ID](state, legalAdvices) {
    state.legalAdvices = legalAdvices;
  },
  [SET_IS_CUSTOM_CASES_BY_ID](state, customCases) {
    state.customCases = customCases;
  },
};

const actions = {
  async getLawyers({ commit }) {
    try {
      let response = await lawyerService.getAll();
      commit(SET_IS_LAWYERS, response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getLegalAdvicesById({ commit }, lawyerId) {
    try {
      let response = await lawyerService.getLegalAdvicesById(lawyerId);
      commit(SET_IS_LEGAL_ADVICES_BY_ID, response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getCustomCasesById({ commit }, lawyerId) {
    try {
      let response = await lawyerService.getCustomCasesById(lawyerId);
      commit(SET_IS_CUSTOM_CASES_BY_ID, response.data);
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
