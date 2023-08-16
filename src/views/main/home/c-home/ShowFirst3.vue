<template>
  <div class="progress2" style="overflow: hidden" ref="bigbox">
    <select class="group" style="float: right;z-index: 1;margin:2% 4% 0 0 ;" v-model="group" ref="sel">
    <!-- <option value="">选择组别</option> -->
    <option value="0">后台组</option>
    <option value="1">前端组</option>
    <option value="2">Al组</option>
    <option value="3">传媒组</option>
    <option value="4">机械组</option>
    <option value="5">电控组</option>
    <option value="6">管理组</option>
  </select>
    <!-- <ShowFirst0 ></ShowFirst0> -->
    <div class="headword">考核管理</div>

    <ul class="lunbo">
      <ul class="piece" v-for="(n, index) in progress" :key="index" v-bind:style="{width:pagesize_x+'px',height:pagesize_y+'px'}">
        <li class="arrow"></li>
        <li class="picture2" v-bind:style="{width:pagesize_x*0.8+'px'}">{{ n.name }}</li>
        <li class="status">{{ n.status }}</li>
        <li class="time">{{ n.time }}</li>
      </ul>
    </ul>
  </div>
</template>

<script>
import { getprogress } from '@/store/home/home';
// import ShowFirst0 from '../c-home/ShowFirst0.vue';
import { storeToRefs } from "pinia";
import {ref, watch,reactive} from 'vue'

export default {
  name: "ShowFirst3",

  setup() {
    const get=getprogress()
    const gets=storeToRefs(get)
    let pagesize_x=ref(0)
      let pagesize_y=ref(0)
      let page=ref(0)

     get.getinformation()
     let group=ref(gets.base.value)
    let progress=ref(gets.progress.value[0])

    watch(group,(newValue)=>{
       progress.value=gets.progress.value[newValue]
       console.log(progress);
    })

  
   
//轮播图动画
    const makeanimation=function(x,y){
      let n = 0;
      var lunbo = document.querySelector(".lunbo");
      lunbo.parentNode.onwheel = function () {
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
    return {
     gets,
      progress,
      page,
      pagesize_x, 
      pagesize_y,
      makeanimation,
     group,
    };
  },

  methods: {
//轮播图动画

  
  },


mounted() {
this.pagesize_x=parseInt(this.$refs.bigbox.getBoundingClientRect().width*0.2475)
this.pagesize_y=parseInt(this.$refs.bigbox.getBoundingClientRect().height)

setTimeout(()=>{
  this.page=this.progress.length
  this.makeanimation(this.pagesize_x,this.page)
},100)
this.makeanimation(this.pagesize_x,this.page)

},

updated(){
  this.makeanimation(this.pagesize_x,this.page)
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
  width: 20%;
  height: 10%;
  border-radius: 10px;
  outline: none;
}
.headword{
font-size: 25px;

}
.progress2 {
  position: relative;
  margin-top: 3%;
  width: 50%;
  height: 40%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

ul {
  padding-inline-start: 0px;
}

li.arrow {
  position: relative;
  right: -93%;
  top: 25%;
  font-family: "icomoon";
  color: rgba(11, 147, 234, 100);
}

.lunbo {
  position: absolute;
  margin-top:1%;
}

.piece {
  float: left;

   width: 24.5%;
  height: 100%;
  padding-inline-start: 0px;
}

.picture2 {
  margin: 10% auto;
  width: 80%;
  height: 40%;

  background-size: 60% 60%;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  border-radius: 10px;

  text-align: center;
  line-height: 500%;
  font-size: 18px;
  font-weight: 600;
  background-color: rgb(183, 244, 241);
}

.status {
  margin: 10% auto;
  width: 70%;
  height: 10%;
  color: rgba(140, 137, 137, 100);
  text-align: center;
}

.time {
  margin: 10% auto;
  width: 80%;
  height: 20%;
  text-align: center;
}
</style>