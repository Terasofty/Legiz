import CustomerService from "@/user-profile/services/customer.service";
import LegalAdviceService from "@/law-bc/services/legal-advice.service";
import CustomCaseService from "@/law-bc/services/custom-case.service";
import { useStore } from "vuex";

const store = useStore();

const SET_LEGAL_ADVICES = "SET_LEGAL_ADVICES";
const SET_LEGAL_ADVICE = "SET_LEGAL_ADVICE";
const SET_CUSTOM_CASES = "SET_CUSTOM_CASES";
const SET_CUSTOM_CASE = "SET_CUSTOM_CASE";

const state = {
  legalAdvices: [],
  customCases: [],
};

const mutations = {
  [SET_LEGAL_ADVICES](state, payload) {
    state.legalAdvices = payload;
  },
  [SET_LEGAL_ADVICE](state, payload) {
    state.legalAdvices.push(payload);
  },
  [SET_CUSTOM_CASES](state, payload) {
    state.customCases = payload;
  },
  [SET_CUSTOM_CASE](state, payload) {
    state.customCases.push(payload);
  },
};

const actions = {
  register({ commit }, customer) {
    return CustomerService.register(customer);
  },
  getLegalAdvices({ commit }, id) {
    return LegalAdviceService.getAll().then(
      (response) => {
        commit(
          SET_LEGAL_ADVICES,
          response.data.filter((x) => x.customer.id === id)
        );
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  },
  createLegalAdvice({ commit }, legalAdvice) {
    return LegalAdviceService.create(legalAdvice).then(
      (response) => {
        commit(SET_LEGAL_ADVICE, response.data);
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  },
  getCustomCases({ commit }, id) {
    return CustomCaseService.getAll().then(
      (response) => {
        console.log(response);
        commit(SET_CUSTOM_CASES, response.data);
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  },
  createCustomCase({ commit }, customCase) {
    return CustomCaseService.create(customCase).then(
      (response) => {
        commit(SET_CUSTOM_CASE, response.data);
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
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
