import { accMan } from "/src/service/accMan/accMan";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import router from "@/router";

export const accountStore = defineStore("account", {
  state: () => ({
    accounts: [],
    pages: 1,
  }),
  actions: {
    async getAccAction(page, pageSize) {
      let results = await accMan(page, pageSize, localStorage.getItem("token"));
      this.accounts = results.data.records;
      this.pages = results.data.pages;
    },
  },
});
