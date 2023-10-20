<template>
  <div class="progress2" style="overflow: hidden" ref="bigbox">
    <select class="group" style="float: right;z-index: 1;margin:2% 3% 0 0 ;" v-model="group" ref="sel" @click=stop>
      <option value="0">后台组</option>
      <option value="1">前端组</option>
      <option value="2">Al组</option>
      <option value="3">运维组</option>
      <option value="4">机械组</option>
      <option value="5">电控组</option>
    </select>
    <div class="headword" @click="leave">考核管理(滚动鼠标查看进度)</div>
    <ul v-if="progress.length==0" class="none">没有数据</ul>
    <ul class="lunbo">
     
      <ul class="piece" v-for="(n, index) in progress" :key="index"
        v-bind:style="{ width: pagesize_x + 'px', height: pagesize_y + 'px' }">
        <li class="arrow" v-if="index<progress.length-1"></li>
        <li class="picture2" v-bind:style="{ width: pagesize_x * 0.8 + 'px', backgroundColor:color(n.status)}">{{ n.name }}</li>
        <li class="status">{{ n.status }}</li>
        <li class="time">{{ n.time }}</li>
      </ul>
    </ul>
  </div>
</template>

<script>
import { getprogress } from '@/store/home/home';
import router from "@/router";
import { storeToRefs } from "pinia";
import { ref, watch, reactive } from 'vue'

export default {
  name: "ShowFirst3",

  setup() {
    const get = getprogress()
    const gets = storeToRefs(get)
    let pagesize_x = ref(0)
    let pagesize_y = ref(0)
    let page = ref(0)

    //获取信息
    get.getinformation()
 
    let group = ref(gets.base.value)
    let progress = ref(gets.progress.value[0])
    console.log(progress);
    //监视组别
    watch(group, (newValue) => {
      progress.value = gets.progress.value[newValue]
    })
    //更改颜色
    const color=function(status){
    if(status=='已完成'){return 'rgba(75,135,250,100)'}
        }
    //轮播图动画
    const makeanimation = function (x, y) {
      let n = 0;
      var lunbo = document.querySelector(".lunbo");
      lunbo.parentNode.onwheel = function (event) {
        event.preventDefault();
        if (event.wheelDelta > 0) {
          if (n < 0) {
            n++;
          }
        } else {
          if (n > -(y - 4)) {
            n--;
          }
        }
        move(lunbo, x * n);
      };
    }



    const leave = function () {
      router.push("/main/appraisalMan")
    }

    const stop = function (event) {
      event.stopPropagation();
    }



    return {
      gets,
      progress,
      page,
      pagesize_x,
      pagesize_y,
      makeanimation,
      group,
      leave,
      stop,
      color
    };
  },


  mounted() {
    this.pagesize_x = parseInt(this.$refs.bigbox.getBoundingClientRect().width * 0.2475)
    this.pagesize_y = parseInt(this.$refs.bigbox.getBoundingClientRect().height)
   
    setTimeout(() => {
      this.page = this.progress.length
      this.makeanimation(this.pagesize_x, this.page)
    }, 100)
    this.makeanimation(this.pagesize_x, this.page)

  },

  updated() {
    this.makeanimation(this.pagesize_x, this.page)
  }

};

//动画函数
function move(obj, distance) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    if (obj.offsetLeft == distance) {
      clearInterval(obj.timer);
    } else if (obj.offsetLeft < distance) {
      obj.style.left =
        obj.offsetLeft + Math.ceil((distance - obj.offsetLeft) / 10) + "px";
    } else if (obj.offsetLeft > distance) {
      obj.style.left =
        obj.offsetLeft + Math.floor((distance - obj.offsetLeft) / 10) + "px";
    }
  }, 5);
}
</script>


<style scoped>
.group {
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border-width: 1.5px;
  outline: none;
  border-color: rgb(218, 218, 218);
  transition: all 1s;
}
.group:hover{
  border-color: #4E99CA;
}


.group option{
  width: 200px;
  height: 35px;
}

.headword {
  width: 300px;
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
  text-align: center;
  margin-bottom: 10px;
  font-family: Microsoft yahei!important;
}

.progress2 {
  position: relative;
  margin-top: 20px;
  width: 45%;
  height: 36%;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  cursor:ew-resize;
}

ul {
  padding-inline-start: 0px;
}

li.arrow {
  position: relative;
  top:75px;
  right: -93%;
  font-family: "icomoon";
  color: rgba(11, 147, 234, 100);
}

.piece:last-child{
  position: relative;
  top: 18px;
}
.lunbo {
  display: flex;
  flex-direction: row;
  position: absolute;
}

.piece {
  position: relative;
  padding-inline-start: 0px;
}

.picture2 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 60%;
  height: 45%;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  background-color: rgb(147, 233, 229);
  font-family: Microsoft yahei!important;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0% auto;
  width: 70%;
  height: 10%;
  color: rgba(140, 137, 137, 100);
  font-weight: 500!important;
  font-family: Microsoft yahei!important;
}

.time {
  margin: 0% auto;
  width: 70%;
  height: 20%;
  text-align: center;
  font-size: 14px;
}

select:hover{
  border-color: rgb(238, 174, 93);
}

.none{

margin-top: 10%;
 text-align: center;
 color: rgb(201, 207, 212);
 font-size: 30px;
}
</style>