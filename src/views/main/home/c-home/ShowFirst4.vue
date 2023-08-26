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
        <div class="real" >
       <li v-bind:style="{width:long[index]*100+'%'}"></li>
        </div>
      </div>
    </div>
    <div class="schedule">
      <li v-for="(n, index) in 6" :key="index">{{ index*20+'%' }}</li>
    </div>
  </div>
</template>

<script>
import { getprogress } from '@/store/home/home';
import { storeToRefs } from "pinia";
import {reactive, ref} from 'vue'
import router from "@/router";
export default {
  name: "ShowFirst4",
  setup() {
    const get=getprogress()
    const gets=storeToRefs(get)

     get.getinformation()

    let progress=gets.progress.value
    console.log(progress);

    let long=reactive([])

    const leave=function(){
router.push("/main/appraisalMan")
}


setTimeout(()=>{
  for(let i=0;i<progress.length;i++)
  {
  let n=0
    for(let j=0;j<progress[i].length;j++)
    {
      if(progress[i][j].status=='已完成'){n++}
      long[i]=n/(j+1)
    }
    
  }

},200)


    return {
      progress,
      long,
      leave,


    }
  },
  onmounted() {

    for (var i = 0; i < this.progresss.length; i++) {
      if (i == 0) { this.longer = this.progresss[0] }
      else if (this.progresss[i].length > this.longer.length) { this.longer = this.progresss[i] }
    }

    setTimeout(() => {
      this.justify()
    }, 200)

  }











};
</script>

<style scoped>
.chart {
  position: relative;
  float: right;
  width: 45%;
  height: 54.5%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.category {
  float: left;
  margin-top: 5%;
  width: 10%;
  height: 75%;


  font-size: 10px;
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
  background-color: rgb(33, 99, 223);

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
}
</style>