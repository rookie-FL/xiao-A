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
  let item = document.querySelectorAll('.item')
      for (let i = 0; i < item.length; i++) { item[i].style.backgroundColor = '#4E99CA' }
      item[5].style.backgroundColor = 'rgba(187, 187, 187, 100)'
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
  position: relative;
  float: right;
  margin-top: 3%;

  width: 45%;
  height: 40%;

  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
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
  /* width: 15%; */

  font-size: 20px;
  padding-top: 15px;
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