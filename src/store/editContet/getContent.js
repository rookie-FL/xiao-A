// import { defineStore } from "pinia";
// import { getContent } from "@/service/editContent/getContent";

// export const contentStore = defineStore("content", {
//     state: () => ({
//       content: [],
//       pages: 0,
//       current: 0,
//     }),
//     actions: {
//       async getContentAction(id, assessGroup) {
//         let results = await getAnnouce(
//           page,
//           pageSize,
//           localStorage.getItem("token")
//         );
//         this.annouce = results.data.records;
//         this.pages = results.data.pages;
//         this.current = results.data.current;
//         console.log("执行力action", this.pages);
//       },
//     },
//   });
  
import { getAnnouce } from "@/service/annouce/getAnnouce";
import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import router from "@/router";

export const annouceStore = defineStore("annouce", {
  state: () => ({
    annouce: [],
    pages: 0,
    current: 0,
  }),
  actions: {
    async getAnnouceAction(page, pageSize) {
      let results = await getAnnouce(
        page,
        pageSize,
        localStorage.getItem("token")
      );
      this.annouce = results.data.records;
      this.pages = results.data.pages;
      this.current = results.data.current;
      console.log("执行力action", this.pages);
    },
  },
});
