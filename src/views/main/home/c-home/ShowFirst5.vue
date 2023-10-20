<template>
  <div class="information" @click="leave">
    <div class="head">
      <li class="headword" style="float: left; text-align: left">通知公告</li>
      <li class="more"></li>
    </div>
    <div class="line" v-for="(n,index) in getss" :key=index>
      <li class="content">{{group}} | {{ n.title}}</li>
      <li class="detail"></li>
    </div>
   
  </div>

</template>

<script >
import { getprogress } from '@/store/home/home';
import { storeToRefs } from 'pinia';
import router from "@/router";

export default {
  name: "ShowFirst5",
  setup() {
    const get= getprogress()
   const gets=storeToRefs(get)
   get.getnotification()
   get.getgroup()
   
const getss=gets.noification
const group=get.group

const leave=function(){
      router.push("/main/annouce")
}

    return {
      get,
     gets,
     getss,
     group,
     leave
    }
  },


};
</script>

<style scoped>
.information {
  cursor: pointer;
  position: relative;
  float: right;
  margin-top: 20px;
  width: 50%;
  height: 36%;
  background-color: white;
  border-radius: 10px;
}
.headword{
  width: 160px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  font-family: Microsoft yahei!important;
}
.head {
  overflow: hidden;
  margin: 0 auto;
  margin-top: 10px;
  width: 90%;
  height: 15%;

}

.more {
  float: right;
  font-family: "icomoon";
  font-size: 20px;
  text-align: right;
}

.content {
  float: left;
}

.detail {
  float: right;
  font-family: "icomoon";
  font-size: 25px;
}

.line {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  width: 90%;
  height: 10%;
}

div {
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}
</style>