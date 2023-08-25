import { getNotifications } from "@/service/setShow/storeShow";

const state = {
  notifications: [],
};

const mutations = {
  setNotifications(state, data) {
    state.notifications = data;
  },
};

const actions = {
  async fetchNotifications({ commit }, { token, page, pageSize }) {
    try {
      const data = await getNotifications(token, page, pageSize);
      commit("setNotifications", data);
    } catch (error) {
      console.error("获取通知公告失败", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
