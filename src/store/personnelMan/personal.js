import { defineStore } from "pinia";
import { useLoginStore } from "@/store/login/login";
import { requests } from "../../service/request/index";



export const getList = defineStore("getList", {
  state: () => ({
    gethref: '',
    list: '',
    length: '8',
    trade:''
  }),
  actions: {


    async excel() {
      const result = await requests.get({
        responseType: 'blob',
        url: "/assess/download",
      },
        useLoginStore().token
      )

      console.log(result);
      var blob = new Blob([result], { type: 'application/vnd.ms-excel' });
      this.gethref = URL.createObjectURL(blob);

      // let ws = []
      // const reader = new FileReader();
      // reader.readAsBinaryString(blob);
      // reader.onload = function () {
      //   const workbook = XLSX.read(reader.result, { type: 'binary' })
      //   for (let i = 0; i < workbook.SheetNames.length; i++) {

      //     ws.push(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]))
      //   }

      // }
      // console.log(ws);
    },

    async getList(page, size, groupOption, assessIndex, name, college, major, assessld, sort) {
      const result = await requests.get({
        url: `/user/info?page=${page}&pageSize=${size}&assessIndex=${assessIndex}&name=${name}&college=${college}&major=${major}&groupOption=${groupOption}&assessld=${assessld}`

      }, useLoginStore().token)
      this.list = result.data.records


      //总分排序
      if (sort === '1') {
        for (let i = 0; i < this.list.length; i++) {
          for (let j = i; j < this.list.length; j++) {
            if (this.list[i].scores[0].score < this.list[j].scores[0].score) {
              this.trade = this.list[i]
              this.list[i] = this.list[j]
              this.list[j] = this.trade
            }

          }
        }
      }
      
      if(sort === '0'){
        for (let i = 0; i < this.list.length; i++) {
          for (let j = i; j < this.list.length; j++) {
            if (this.list[i].scores[0].score > this.list[j].scores[0].score) {
              this.trade = this.list[i]
              this.list[i] = this.list[j]
              this.list[j] = this.trade
            }

          }
        }
      }


      //组别识别
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].group_option == 0) { this.list[i].group_option = '后台组' }
        if (this.list[i].group_option == 1) { this.list[i].group_option = '前端组' }
        if (this.list[i].group_option == 2) { this.list[i].group_option = 'ai组' }
        if (this.list[i].group_option == 3) { this.list[i].group_option = '传媒组' }
        if (this.list[i].group_option == 4) { this.list[i].group_option = '机械组' }
        if (this.list[i].group_option == 5) { this.list[i].group_option = '电控组' }
        if (this.list[i].group_option == 6) { this.list[i].group_option = '管理组' }
      }


    },
    async getlength() {
      let results = await requests.get({
        url: `/user/info?page=${1}&pageSize=${999}`
      }, useLoginStore().token)

      this.length = results.data.records.length
    }

  }

});
