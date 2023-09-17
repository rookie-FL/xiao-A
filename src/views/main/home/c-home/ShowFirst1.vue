<template>
  <div class="progress1">
    <ul style="margin-left: 0px">
      <li class="picture" style="border-color: rgba(103, 180, 230, 100)"><img src="../../../../assets/img/first1.png">
      </li>
      <li class="word">已注册</li>
      <li class="number">{{count}}</li>
    </ul>
    <ul>
      <li class="picture" style="border-color: rgba(247, 175, 98, 100)"><img src="../../../../assets/img/first2.png"></li>
      <li class="word">已报名</li>
      <li class="number">{{ signupCount }}</li>
    </ul>
    <ul>
      <li class="picture" style="border-color: rgba(168, 232, 249, 100)"><img src="../../../../assets/img/first3.png">
      </li>
      <li class="word">面试</li>
      <li class="number">{{ statusCount[0] }}</li>
    </ul>
    <ul>
      <li class="picture" style="border-color: rgba(232, 80, 20, 100)"><img src="../../../../assets/img/first4.png"></li>
      <li class="word">一轮考核</li>
      <li class="number">{{ statusCount[1] }}</li>
    </ul>
    <ul style="margin-right: 0px">
      <li class="picture" style="border-color: rgba(19, 233, 240, 100)"><img src="../../../../assets/img/first5.png"></li>
      <li class="word">二轮考核</li>
      <li class="number">{{ statusCount[2] }}</li>
    </ul>
  </div>
</template>

<script >
import {reactive, ref} from 'vue'
import { useLoginStore } from '../../../../store/login/login'
import { requests } from '@/service/request'
import { getprogress } from '@/store/home/home'
import { storeToRefs } from "pinia";
export default{
name: "ShowFirst1",


setup(){
  let get=getprogress()
  let gets=storeToRefs(get)
  get.sign()
  get.getcount()
  get.status()
  let signupCount=gets.signupCount
  let count=gets.counts
  let statusCount=gets.statusCount

 return {

  signupCount,
  count,
  statusCount,
 }

}

}
</script>

<style scoped>

.progress1 {
  width: 45%;
  height: 25%;
  border-radius: 10px;
}


.progress1 ul {
  margin: 0 1.25%;
  padding: 0;
  float: left;
  width: 18%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}

.progress1 .picture {
  margin: 10% auto;
  width: 46%;
  height: 30%;
  margin-top: 30px;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
}

.picture img {
  margin: 0 auto;
  transform: translate(-50%,-50%);
  position: absolute;
  top: 50%;
  left: 50%;
}

.progress1 .word {
  margin: auto;
  width: 80%;
  height: 30px;
  color: rgba(140, 137, 137, 100);
  text-align: center;
  font-weight: 600;
  line-height: 30px;
  font-family: Microsoft YaHei!important;
}

.progress1 .number {
  margin: auto;
  width: 80%;
  height: 20%;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  font-family: Microsoft YaHei!important;
}
</style>