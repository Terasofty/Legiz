import LawyerService from "@/user-profile/services/lawyer.service";
import LegalAdviceService from "@/law-bc/services/legal-advice.service";
import CustomCaseService from "@/law-bc/services/custom-case.service";
import { useStore } from "vuex";

const store = useStore();

const SET_LAWYERS = "SET_LAWYERS";
const SET_LEGAL_ADVICES = "SET_LEGAL_ADVICES";
const SET_CUSTOM_CASES = "SET_CUSTOM_CASES";
const SET_MESSAGE_LEGAL_ADVICE = "SET_MESSAGE_LEGAL_ADVICE";

const state = {
  all: [],
  legalAdvices: [],
  customCases: [],
};
const mutations = {
  [SET_LAWYERS](state, payload) {
    state.all = payload;
  },
  [SET_LEGAL_ADVICES](state, payload) {
    state.legalAdvices = payload;
  },
  [SET_CUSTOM_CASES](state, payload) {
    state.customCases = payload;
  },
  [SET_MESSAGE_LEGAL_ADVICE](state, payload) {
    let index = state.customCases.indexOf(payload);
  },
};

const actions = {
  register({ commit }, lawyer) {
    return LawyerService.register(lawyer);
  },
  getLawyers({ commit }) {
    return LawyerService.getAll().then(
      (response) => {
        commit(SET_LAWYERS, response.data);
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  getLegalAdvices({ commit }, id) {
    return LegalAdviceService.getAll().then(
      (response) => {
        commit(
          SET_LEGAL_ADVICES,
          response.data.filter((x) => x.lawyer.id === id)
        );
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
        commit(
          SET_CUSTOM_CASES,
          response.data.filter((x) => x.lawyer.id === id)
        );
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
  },
  setMessageLegalAdvice({ commit }, legalAdvice) {
    return LegalAdviceService.update(legalAdvice);
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
