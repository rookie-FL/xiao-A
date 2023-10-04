import { defineStore } from "pinia";
import { useLoginStore } from "@/store/login/login";
import { anyToken } from '@/utils/anyToken'
import { requests } from "@/service/request";

export const getprogress = defineStore("getprogresss", {
  state: () => ({
    add: '555',
    length:'999',
    progress:[],
    progressx:[{name:233}],
    code:400
  }),
  actions: {

    async add(name, startTime,endTime,id) {
      const result = await requests.post({
        url: "/assess/add",
        data: {
          id: id,
          assessGroup: anyToken().userGroup,
          name: name,
          startTime: startTime+' 00:00:00',
          endTime: endTime+' 00:00:00',
          contentUrl: '',
          creatorUsername: anyToken().username
        },
      },
        useLoginStore().token,
      )
      this.code=result.code
      console.log(this.code);
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
      console.log(result.data);

      this.length=result.data.data.length/6
      for (let i = 0; i < result.data.data.length;i++) {
        let startdate=result.data.data[i].startTime
        let enddate=result.data.data[i].endTime
        if(startdate&&enddate!=null){ 
         startdate=result.data.data[i].startTime.slice(0,11)
         enddate=result.data.data[i].endTime.slice(0,11)}


        const newTime = new Date().getTime()
        let startdata = new Date(startdate).getTime()
        let enddata = new Date(enddate).getTime()

        let status = ''
        let changeable = ''
        if (enddata < newTime) { status = '已完成'; changeable = false }
        if (enddata >= newTime && startdata <= newTime) { status = '正在进行'; changeable = true }
        if (startdata > newTime) { status = '未开始'; changeable = true }
        //处理对象数组
        this.progress[i] = {
          'id': result.data.data[i].id,
          'name': result.data.data[i].name,
          'time': startdate+ '- '+enddate,
          'status': status,
          'changeable': changeable,
          'contentUrl':result.data.data[i].contentUrl
        }

  
      }


      
    },
  },



});
