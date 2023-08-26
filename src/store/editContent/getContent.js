import { getUserInfo } from '@/service/editContent/getContent'; 

const state = {
  assessments: [],
};

const mutations = {
  setAssessments(state, data) {
    state.assessments = data;
  },
};

const actions = {
  async fetchAssessments({ commit }, token) {
    try {
      const data = await getUserInfo({ token });
      commit('setAssessments', data);
    } catch (error) {
      console.error('获取考核信息失败', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
