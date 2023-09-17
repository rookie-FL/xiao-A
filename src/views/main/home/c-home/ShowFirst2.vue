<template>
  <div class="member" @click="leave">
    <div class="headword" style="float: left;">人员管理</div>
    <div class="more"></div>
    <div class="M_data">
      <ul class="headtitle">
        <li>序号</li>
        <li>姓名</li>
        <li>组别</li>
        <li>考核分数</li>
      </ul>
      <ul v-for="(n, index) in member" :key="index">
        <li style="font-size: 15px">{{ index + 1 }}</li>
        <li style="font-size: 15px">{{ n.name }}</li>
        <li style="font-size: 15px">{{ n.group_option }}</li>
        <li style="font-size: 15px">{{ n.scores[0].score }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getList } from '@/store/personnelMan/personal';
import { getprogress } from '@/store/home/home';
import { storeToRefs } from 'pinia';
import router from "@/router";
export default {

  name: "ShowFirst2",
  setup() {
    const get = getList()
    const gets = storeToRefs(get)
    let assessIndex = ''
    let name = ''
    let college = ''
    let major = ''
    let assessld = ''

    let groups = getprogress().base

    get.getList(1, 5, getprogress().base, assessIndex, name, college, major, assessld)
    let member = gets.list
    console.log(member);

    const leave = function () {
      let item = document.querySelectorAll('.item')
      for (let i = 0; i < item.length; i++) { item[i].style.backgroundColor = '#4E99CA' }
      item[1].style.backgroundColor = 'rgba(187, 187, 187, 100)'
      router.push(`/main/personnelMan/${groups}`)
    }

    return {
      get,
      gets,
      member,
      leave
    }

  },
}
</script>

<style scoped>
@font-face {
  font-family: 'icomoon';
  src: url('fonts/icomoon.eot?s83tok');
  src: url('fonts/icomoon.eot?s83tok#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?s83tok') format('truetype'),
    url('fonts/icomoon.woff?s83tok') format('woff'),
    url('fonts/icomoon.svg?s83tok#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.more {
  float: right;
  font-family: "icomoon";
  width: 10%;
  font-size: 18px;
  padding-top: 10px;
  text-align: center;
}

.headword {
  width: 25%;
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
  text-align: center;
  margin-bottom: 20px;
  font-family: Microsoft yahei!important;
}

.member {
  cursor: pointer;
  margin-top: 10px;
  width: 46%;
  height:35%;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  font-family: Microsoft yahei!important;
}
.headtitle {
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}
.M_data {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.M_data ul {
  overflow: hidden;
  width: 100%;
  height: 12%;
  padding-inline-start: 0px;
  font-weight: 600!important;
}


.M_data li {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  float: left;
  width: 25%;
  font-family: Microsoft yahei!important;
}

</style>