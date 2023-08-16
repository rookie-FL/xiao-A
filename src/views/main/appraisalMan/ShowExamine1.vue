<template>
  <div class="progress">
    <div class="M_data" ref="data" style="overflow: auto">
      <ul class="headtitle">
        <li>考核</li>
        <li style="width: 40%">时间</li>
        <li>状态</li>
        <li>操作</li>
      </ul>
      <ul v-for="(n, index) in progress" :key="index" class="line" v-bind:id='n.id'>
        <li style="font-size: 15px">{{ n.name }}</li>
        <li style="font-size: 15px; width: 40%">{{ n.time }}</li>
        <li style="font-size: 15px">{{ n.status }}</li>
        <li @click="change(n.id,n.name,n.time)" class="change" style="
            width: 7.5%;
            margin-left: 5%;
            color: rgba(11, 147, 234, 100);
            font-size: 8px;
          " v-if="n.changeable">
          修改
        </li>
        <li style="width: 7.5%; color: rgba(11, 147, 234, 100); font-size: 8px" @click=remove(n.id) v-if="n.changeable">
          删除
        </li>
      </ul>
      <div v-if="addstatus">
        <li class='check' style='float:right;color:rgb(11, 147, 234); font-size:12px;margin: 0;width:7.5%'
          @click="addcancel">取消</li>
        <input  style="width:20%" v-model="add.name" >
        <input style="width:40%;" v-model="add.time">
      </div>
    </div>
    <div class="func">
      <li class="add" @click="addprogress" ref="add">添加</li>
      <li class="sure" @click="addsure">确定</li>
    </div>

  </div>

  <teleport to="body" v-if="isShow">
    <div class="background">
    </div>
    <div class="changepage">
      <h1>考核流程修改</h1>
      <ul>
        <li>考核</li><input type="text" placeholder="请输入" v-model="changes.name">
      </ul>
      <ul>
        <li>时间</li><input type="text" placeholder="请输入" v-model="changes.time">
      </ul>

      <div @click="changecancel">取消</div>
      <div style="background-color: rgba(11, 147, 234, 100); " @click="changesure">确认</div>
    </div>
  </teleport>
</template>

<script>
import { getprogress } from '@/store/appraisalMan/appraisalMan';
import { Teleport } from 'vue'

export default {
  name: "ShowExamine1",
  data() {
    return {
      progress: getprogress().progress,
      get: getprogress(),
      isShow: false,
      addstatus: false,
      changetarget: '',
      add: {
        'name': '',
        'time': ''
      },
      changes: {
        'name': '',
        'time': ''
      },
    };
  },
  methods: {
    // 删除功能
    remove(id) {
      getprogress().deletes(id)
    },
    //添加功能
    addprogress() {
      this.addstatus = true
    },
    //确认按钮
    addsure() {
      if(this.addstatus == true){
      if (this.add.name != "" && this.add.time != "") {
       this.get.add(this.add.name, this.add.time)
        this.addstatus = false
        this.$refs.add.style.display = "block";
        this.add.name = ''
        this.add.time = ''
      }else{
        alert('内容不能为空')
      }
    }
    },
    addcancel() {
      this.addstatus = false
      this.$refs.add.style.display = "block";
      this.add.name = ''
      this.add.time = ''
    },


    //修改功能
    change(id,name,time) {
      this.isShow = true;
      this.changetarget = id
      this.changes.name = name
      this.changes.time = time
    },
    changecancel() {
      this.isShow = false;
      this.changes.name = ''
      this.changes.time = ''
    },
    changesure() {
      if (this.changes.name != "" && this.changes.time != ""){
      this.get.add(this.changes.name, this.changes.time, this.changetarget)
      this.isShow = false;
      this.changes.name = ''
      this.changes.time = ''
      }else{
        alert('内容不能为空')
      }
    }


  },

  mounted() {
    this.get.getinformation()
  },
  updated() {
    this.progress = getprogress().progress
  },
}
</script>

<style scoped>
.progress {
  width: 47.5%;
  height: 42.5%;
  background-color: rgb(232, 232, 229);
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
  height: 25%;
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

.headtitle li {
  line-height: 300%;
}

.M_data li {
  margin-top: 10px;
  float: left;
  width: 20%;
  text-align: center;
}

.condition .M_data li {
  width: 25%;
}

.func {
  margin: 0 auto;
  width: 90%;
  overflow: hidden;
  height: 20%;
}

.add {
  float: left;
  margin-top: 5px;
  color: rgba(11, 147, 234, 100);
}

.sure {
  float: right;
  margin-top: 10px;
  width: 20%;
  height: 50%;

  text-align: center;
  line-height: 200%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(187, 187, 187, 100);
}

.background {
  position: absolute;
  top: 0%;

  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
}


.changepage {
  position: absolute;
  left: 30%;
  top: 30%;

  width: 40%;
  height: 40%;
  background-color: white;
}


.changepage h1 {
  margin-top: 5%;
  text-align: center;
}

.changepage ul {
  width: 50%;
  height: 10%;
  margin: 5% 0 0 10%;
}

.changepage ul li {
  font-size: 25px;
  float: left;
}

.changepage ul input {
  margin-left: 10%;
  height: 70%;
  width: 60%;
}

.changepage div {
  display: inline-block;
  margin-top: 10%;
  margin-left: 24%;

  border-style: solid;
  border-width: 1px;
  border-radius: 50px;

  text-align: center;
  line-height: 30px;
  width: 15%;
  height: 30px;

}

input{
  
}
</style>