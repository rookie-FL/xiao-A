<template>
    
  <div class="condition">
    <div class="M_data">
      <ul class="headtitle">
        <li>考核</li>
        <li>通过人数</li>
        <li>通过率</li>
        <li>通过人员名单</li>
      </ul>
      <div style=" overflow: auto;height: 75%; cursor: ns-resize;">
      <ul v-for="(n, index) in progress" :key="index" style="margin-top: 15px;">
        <li style="font-size: 18px">{{ n.name }}</li>
        <li style="font-size: 18px">{{ n.passCount +'人'}}</li>
        <li style="font-size: 18px">{{ n.passCount +'%'}}</li>
        <li style="color: rgba(11, 147, 234, 100); font-size: 15px;cursor: pointer;" @click="toPersonalMan(n.id)">查看</li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>


import { getprogress } from '@/store/appraisalMan/appraisalMan';
import { anyToken } from '@/utils/anyToken';
import router from "@/router";
import { requests } from "@/service/request";
import { useLoginStore } from "@/store/login/login";
export default {
  name: "ShowExamine2",
  setup() {
getprogress().getinformation()
let progress=getprogress().progress
let base= anyToken().userGroup
let group

setTimeout(() => {
console.log(progress)
}, 2000);


(()=>{
      if (base == 0) { group = '后台组' }
      if (base == 1) { group = '前端组' }
      if (base == 2) { group = 'ai组' }
      if (base == 3) { group = '运维组' }
      if (base == 4) { group = '机械组' }
      if (base == 5) { group = '电控组' }
})()

const toPersonalMan=function(process){
  router.push(`/main/personnelMan/${group}/${process}`)
}

return {
      progress,
      base,
      group,
      toPersonalMan,
};
  },
};
</script>

<style scoped>
.condition {
  width: 47.5%;
  height: 42.5%;
  background-color: rgb(240, 240, 240);
  border-radius: 15px;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.M_data {

  margin: 0px auto;
  width: 90%;
  height: 80%;
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

::-webkit-scrollbar {
  display: none;
}

.M_data ul {
  overflow: hidden;
  width: 100%;
  padding-inline-start: 0px;
}


.headtitle {
  display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
    border-width: 0px 0px 2px 0px;
    border-color: rgba(187, 187, 187, 100);
    border-style: solid;
   font-weight: 800;
   font-size: 20px;
}


.M_data li {
  margin-top: 10px;
  float: left;
  width: 20%;
  text-align: center;
  font-weight: 800;
}

.condition .M_data li {
  width: 25%;
}
</style>