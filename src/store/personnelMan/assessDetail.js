// store/assessment.js

import { passAssessment } from "@/service/assessmentService"; // 根据实际路径调整

const state = {
  // ...其他状态...
};

const mutations = {
  // ...其他mutations...
};

const actions = {
  async submitAssessment({ commit, state }, { openid, scores, currentAssessId, nextAssessId }) {
    const token = "your_token_here"; // 替换成实际的 token

    try {
      await passAssessment(token, openid, scores, currentAssessId, nextAssessId);
      console.log("考核通过成功");
      // 在这里可以进行一些逻辑处理，例如跳转页面
    } catch (error) {
      console.error("考核通过失败");
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
