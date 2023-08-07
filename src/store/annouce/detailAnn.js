import { queryAnn } from "@/service/annouce/queryAnn";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import router from "@/router";

export const detailAnnStore = defineStore("detailAnn", {
  state: () => ({
    detailMess: {},
  }),
  actions: {
    async getDetailAction(id) {
      let results = await queryAnn(id);
      this.detailMess = results.data;
    },
  },
});
