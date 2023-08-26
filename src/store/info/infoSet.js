import { defineStore } from "pinia";
import { requests } from "@/service/request";
import { useLoginStore } from "@/store/login/login";

export const infoSet = defineStore("set", {
  state: () => ({
    data:'1',
    code:'400'
  }),
  actions: {
    async getinfo(id) {
      let result = await requests.get({
        url: `/introduce/get?id=${id}`,
      },
      useLoginStore().token
      )
      if(result.data!=null){
      this.data=result.data
      }
      else{
        this.data={
          content:"没有内容",
          required:"没有内容",
          harvest:"没有内容"
        }
      }
    },
    async setinfo(id) {
      let result = await requests.post({
        url: `/introduce/saveOrUpdate`,
        data:{
            id:id,
            content:this.data.content,
            required:this.data.required,
            harvest:this.data.harvest
        }
      },
      useLoginStore().token
      )
    this.code=result.code
    },
  },
});
