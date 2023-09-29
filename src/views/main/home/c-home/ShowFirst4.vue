<template>
  <div class="chart" @click="leave">
    <div class="headword">各组考核进度</div>
    <div class="category">
      <li>后台组</li>
      <li>前端组</li>
      <li>Al组</li>
      <li>传媒组</li>
      <li>机械组</li>
      <li>电控组</li>
      <li>管理组</li>
    </div>
    <div class="back">
      <div class="backchart"></div>
      <div class="backchart"></div>
      <div class="backchart"></div>
      <div class="backchart"></div>
      <div class="backchart"></div>
    </div>
    <div class="front" v-on:mouseover="mouse">
      <div class="line" v-for="(n, index) in progress" :key="index" @click="touch">
        <div class="real">
          <li v-if="progress[index] == null">没有数据</li>
          <li v-bind:style="{ width: long[index] * 100 + '%' }"></li>
        </div>
      </div>
    </div>
    <div class="schedule">
      <li v-for="(n, index) in 6" :key="index">{{ index * 20 + '%' }}</li>
    </div>
  </div>
</template>

<script>
import { getprogress } from '@/store/home/home';
import { storeToRefs } from "pinia";
import { reactive, ref } from 'vue'
import router from "@/router";

export default {
  name: "ShowFirst4",
  setup() {
    const get = getprogress()
    const gets = storeToRefs(get)
    let progress = gets.progress.value
    let long= gets.long


    const leave = function () {
      router.push("/main/appraisalMan")
    }


    return {
      progress,
      long,
      leave,
    }
  },

};
</script>

<style scoped>
.chart {
  position: relative;
  float: right;
  width: 50%;
  height: 60%;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
}

.headword {
  width: 160px;
  font-size: 18px;
  font-weight: 600;
  padding-top: 20px;
  text-align: center;
  margin-bottom: 10px;
  font-family: Microsoft yahei !important;
}

.category {
  float: left;
  margin-top: 2%;
  width: 10%;
  height: 75%;
  font-size: 10px;
  font-weight: 600 !important;
  font-family: Microsoft yahei !important;
  box-sizing: border-box;
  border-width: 0px 2px 0px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

.category li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 14.3%;
  font-family: Microsoft yahei !important;
  ;
}

.category li::after {
  position: absolute;
  display: block;
  left: 8%;
  content: '';
  width: 2%;
  height: 11%;
  box-sizing: border-box;
  border-width: 1.5px 0px 1.5px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;

}

.back {
  margin-top: 5%;
  margin-left: 10%;
  width: 85%;
  height: 75%;
  background-color: white;
}

.backchart {
  float: left;
  width: 20%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  border-width: 0px 2px 0px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

.front {
  position: relative;
  margin-left: 10%;
  top: -75%;
  width: 85%;
  height: 75%;
  background-color: white;
  opacity: 1;
  background-color: transparent;
}

.line {
  display: flex;
  flex-flow: column;
  justify-content: center;

  position: relative;
  height: 14.3%;
}

.real {
  height: 60%;
  width: 100%;
}

.real li {
  float: left;
  height: 100%;
  width: 0%;
  background-color: rgb(33, 99, 223);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 0.5s ease 0s;
}


.schedule {
  position: absolute;
  top: 95%;
  left: 2%;
  width: 102%;
}

.schedule li {
  float: left;
  width: 16.666%;
  font-size: 8px;
  text-align: center;
  font-weight: 500;
}

.none {

  margin-top: 10%;
  text-align: center;
  color: rgb(201, 207, 212);
  font-size: 30px;
}
</style>