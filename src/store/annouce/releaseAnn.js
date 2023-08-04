import { releaseAnn } from "@/service/annouce/releaseAnn";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import router from "@/router";

export const releaseAnnStore = defineStore("releaseAnn", {
  state: () => ({
    annouce: [],
  }),
  actions: {
    async releaseAnns(data) {
      releaseAnn(data);
    },
  },
});
