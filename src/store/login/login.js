import { accountLogin } from "@/service/login/login";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import router from "@/router";

export const useLoginStore = defineStore("login", {
  state: () => ({
    account: "",
    token: localStorage.getItem("token") ?? "",
    password: "",
  }),
  actions: {
    async loginAccountAction(account, pwd) {
      const loginResult = await accountLogin(account, pwd);

      if (loginResult.code === 200) {
        this.token = loginResult.data.token;
        this.id = account;
        this.password = pwd;
        // 保存token

        localStorage.setItem("token", loginResult.data.token);
        console.log("登录成功", loginResult);
        // 跳转页面
        router.replace("/main");
      } else {
        ElMessage.error("账号或密码错误，请重新输入");
      }
    },
  },
});
