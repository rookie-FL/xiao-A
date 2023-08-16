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
export default{
name: "ShowFirst1",


setup(){
  const counter = useLoginStore()

 let signupCount=ref(0)
 let count=ref(0)
 let statusCount=reactive([])
 let id=reactive([1,2,3])

  var sign = new XMLHttpRequest();
  sign.open('get', 'http://119.29.250.245:8080/wx/user/signupCount', true);
  sign.setRequestHeader("Content-Type", "application/json")
  sign.setRequestHeader('token', counter.token)
  sign.send();
  sign.onreadystatechange = function () {
    if (sign.readyState == 4 && sign.status == 200) {
      signupCount.value=JSON.parse(sign.responseText).data
    }

  }

  var enroll= new XMLHttpRequest();
  enroll.open('get', 'http://119.29.250.245:8080/wx/user/count', true);
  enroll.setRequestHeader("Content-Type", "application/json")
  enroll.setRequestHeader('token', counter.token)
  enroll.send();
  enroll.onreadystatechange = function () {
    if (enroll.readyState == 4 && enroll.status == 200) {
      count.value=JSON.parse(this.responseText).data
    }

  }

for(let i=0;i<3;i++){
  let status = new XMLHttpRequest();
  status.open('get', 'http://119.29.250.245:8080/wx/user/assessCount?id='+id[i]+'', true);
  status.setRequestHeader("Content-Type", "application/json")
  status.setRequestHeader('token', counter.token)
  status.send();
  status.onreadystatechange = function () {
    if (status.readyState == 4 && status.status == 200) {
      console.log(this.responseText);
      statusCount[i]=JSON.parse(this.responseText).data
    }

  }
}


 return {
  signupCount,
  count,
  statusCount
 }

}

}


</script>

<style scoped>


.progress1 {
  width: 50%;
  height: 20%;
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
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.progress1 .picture {
  margin: 10% auto;
  width: 45%;
  height: 30%;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
}

.picture img {
  position: relative;
  margin: 0 auto;
  top: 15%;

}

.progress1 .word {
  margin: 10% auto;
  width: 80%;
  height: 20%;
  color: rgba(140, 137, 137, 100);
  text-align: center;
}

.progress1 .number {
  margin: 10% auto;
  width: 80%;
  height: 20%;
  text-align: center;
}
</style>