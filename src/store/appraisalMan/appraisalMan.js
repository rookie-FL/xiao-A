import { defineStore } from "pinia";
import axios from 'axios';
import { useLoginStore } from "@/store/login/login";
import { get } from "@/service/appraisalMan/appraisalMan";
import { anyToken } from '@/utils/anyToken'
import { requests } from "@/service/request";

export const getprogress = defineStore("getprogresss", {
  state: () => ({
    add: '555',
    progress: [],
  }),
  actions: {



    async add(name, time, id) {
      let times = time.split('-')
      let startTime = times[0].split('.').map(Number)
      let endTime = times[1].split('.').map(Number)

      for (let i = 0; i < 3; i++) {
        startTime.push(0)
        endTime.push(0)
      }
      const result = await requests.post({
        url: "/web/assess/add",
        data: {
          id: id,
          assessGroup: anyToken().userGroup,
          name: name,
          startTime: startTime,
          endTime: endTime,
          contentUrl: '',
          creatorUsername: '123'
        },
      },
        useLoginStore().token,
      )
      this.getinformation()
    },



    async deletes(id) {
      const result = await requests.post({
        url: "/assess/delete",
        data: {
          id: id,
          assessGroup: anyToken().userGroup,
        },
      }, useLoginStore().token)
      for (let i = 0; i < this.progress.length; i++) {
        if (this.progress[i].id == id) { this.progress.splice(i, 1) }
      }
    },



    async getinformation() {
      let result={
        data:{}
      }
      result.data = await requests.post({
        url: "/assess/getByGroup",
        data: {
          assessGroup: anyToken().userGroup,
        },
      }, useLoginStore().token)
      for (let i = 0; i < result.data.data.length; i++) {
        //处理时间戳
        result.data.data[i].startTime.splice(3, 3)
        result.data.data[i].endTime.splice(3, 3)
        const newTime = new Date().getTime()
        let startdata = new Date(result.data.data[i].startTime.join('.')).getTime()
        let enddata = new Date(result.data.data[i].endTime.join('.')).getTime()

        let status = ''
        let changeable = ''
        if (enddata < newTime) { status = '已完成'; changeable = false }
        if (enddata >= newTime && startdata <= newTime) { status = '正在进行'; changeable = true }
        if (startdata > newTime) { status = '未开始'; changeable = true }
        //处理对象数组
        this.progress[i] = {
          'id': result.data.data[i].id,
          'name': result.data.data[i].name,
          'time': result.data.data[i].startTime.join('.') + '-' + result.data.data[i].endTime.join('.'),
          'status': status,
          'changeable': changeable,
          'contentUrl':result.data.data[i].contentUrl
        }

      }
    }
  },

});
