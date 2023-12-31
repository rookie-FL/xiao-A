import { defineStore } from "pinia";
import axios from 'axios';
import { useLoginStore } from "@/store/login/login";
import { anyToken } from "@/utils/anyToken";
import { requests } from "@/service/request";

export const getprogress = defineStore("getprogressz", {
  state: () => ({
    base: anyToken().userGroup,
    group: '',
    noification: {},
    progress: [[], [], [], [], [], [], []],
    pages: [],
    signupCount: '',
    counts: '',
    statusCount: [],
    long:[]


  }),
  actions: {
    async getgroup() {
      if (this.base == 0) { this.group = '后台组' }
      if (this.base == 1) { this.group = '前端组' }
      if (this.base == 2) { this.group = 'ai组' }
      if (this.base == 3) { this.group = '运维组' }
      if (this.base == 4) { this.group = '机械组' }
      if (this.base == 5) { this.group = '电控组' }
    },

    async sign() {
      let result = await requests.get({
        url: '/user/signupCount'
      },
        useLoginStore().token)
      this.signupCount = result.data
    },

    async getcount() {
      let result = await requests.get({
        url: '/user/count'
      },
        useLoginStore().token)
      this.counts = result.data
    },


    async status() {
      for (let i = 0; i < 3; i++) {
        let result = await requests.get({
          url: `/user/signupCount?id=${i}`
        },
          useLoginStore().token)
        this.statusCount[i] = result.data
      }
    },

    async getinformation() {
      let result = { data: {} }
      for (let j = 0; j < 7; j++) {
        result.data = await requests.post({
          url: "/assess/getByGroup",
          data: {
            assessGroup: j,
          }
        }, useLoginStore().token)
        this.pages.push(result.data.data.length)
        for (let i = 0; i < result.data.data.length; i++) {

          const newTime = new Date().getTime()
          let startdata = new Date(result.data.data[i].startTime).getTime()
          let enddata = new Date(result.data.data[i].endTime).getTime()

          let status = ''
          if (enddata < newTime) { status = '已完成' }
          if (enddata >= newTime && startdata <= newTime) { status = '正在进行' }
          if (startdata > newTime) { status = '未开始' }
          //处理对象数组
          this.progress[j][i] = {
            'id': result.data.data[i].id,
            'name': result.data.data[i].name,
            'time': result.data.data[i].startTime.slice(0, 11) + ' - ' + result.data.data[i].endTime.slice(0, 11),
            'status': status,
          }
        }
      }

         for (let i = 0; i < this.progress.length; i++) {
            let n = 0
            for (let j = 0; j < this.progress[i].length; j++) {
              if (this.progress[i][j].status == '已完成') { n++ }
              this.long[i] = n / (j + 1)
            }
          }


    },

    async getnotification() {

      const result = await requests.get({
        url: "/notification/page?page=1&pageSize=6",
      }, useLoginStore().token)
      this.noification = result.data.records
    },
  },
});


