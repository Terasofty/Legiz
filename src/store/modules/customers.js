import {
  SET_IS_LEGAL_ADVICES_BY_CUSTOMER_ID,
  SET_IS_ADD_LEGAL_ADVICE,
  SET_IS_ADD_CUSTOM_CASE, SET_IS_CUSTOM_CASES_BY_CUSTOMER_ID
} from "../mutation-types";
import customerService from "@/user-profile/customer/services/customersservice";
import legalAdviceService from "@/law/legal-advices/services/legal-advices.service";
import customCaseService from "@/law/custom-cases/services/custom-cases.service";

const state = {
  legalAdvices: [],
  customCases: [],
  id: 1,
};

const mutations = {
  [SET_IS_LEGAL_ADVICES_BY_CUSTOMER_ID](state, legalAdvices) {
    state.legalAdvices = legalAdvices;
  },
  [SET_IS_CUSTOM_CASES_BY_CUSTOMER_ID](state, customCases) {
    state.customCases = customCases;
  },
  [SET_IS_ADD_LEGAL_ADVICE](state, legalAdviceDto) {
    state.legalAdvices = [...state.legalAdvices, legalAdviceDto];
  },
  [SET_IS_ADD_CUSTOM_CASE](state, customCaseDto) {
    state.customCases = [...state.customCases, customCaseDto];
  },
};

const actions = {
  async getLegalAdvicesById({ commit }, customerId) {
    try {
      let response = await customerService.getLegalAdvicesById(customerId);
      commit(SET_IS_LEGAL_ADVICES_BY_CUSTOMER_ID, response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getCustomCasesById({ commit }, customerId) {
    try {
      let response = await customerService.getCustomCasesById(customerId);
      commit(SET_IS_CUSTOM_CASES_BY_CUSTOMER_ID, response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async addLegalAdvice({ commit }, legalAdviceDto) {
    try {
      let response = await legalAdviceService.create(legalAdviceDto);
      commit(SET_IS_ADD_LEGAL_ADVICE, response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async AddCustomCase({ commit }, customCaseDto) {
    try {
      let response = await customCaseService.create(customCaseDto);
      commit(SET_IS_ADD_CUSTOM_CASE, response.data);
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
