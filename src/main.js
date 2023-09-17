import { createApp } from "vue";
import ElementPlus from 'element-plus';
import App from "./App.vue";
import router from "./router";
import "element-plus/theme-chalk/el-message.css";
import { createPinia } from "pinia";
import axios from 'axios'
const pinia = createPinia();
const app=createApp(App)
app.use(router).use(pinia).mount("#app");
app.config.globalProperties.$axios = axios