<template>
  <div class="progress">
    <div class="M_data" ref="data" >
      <ul class="headtitle">
        <li>考核</li>
        <li style="width: 40%">时间</li>
        <li>状态</li>
        <li>操作</li>
      </ul>
   <div class="view" style="cursor:ns-resize">
      <ul v-if="progress.length == 0" class="none">没有数据</ul>
      <ul v-for="(n, index) in progress" :key="index" class="line" v-bind:id='n.id'>
        <li style="font-size: 18px;font-weight: 600;">{{ n.name }}</li>
        <li style="font-size: 15px; width: 40%;font-weight: 600;">{{ n.time }}</li>
        <li style="font-size: 18px;font-weight: 600;">{{ n.status }}</li>
        <li @click="change(n.id, n.name, n.time.slice(0, 11), n.time.slice(13, 24),n.changeable)" class="change" :style="{color:(()=>{return n.changeable==true?'rgba(11, 147, 234, 100)':'rgba(160, 160, 160, 100)'})()}
          " >
          修改
        </li>
        <li style="width: 7.5%; font-size: 15px; cursor: pointer;" :style="{color:(()=>{return n.changeable==true?'rgba(11, 147, 234, 100)':'rgba(160, 160, 160, 100)'})()}
          " @click=remove(n.id,n.changeable) >
          删除
        </li>
      </ul>
   
      <transition name="fade">
      <div v-if="addstatus" style="height: 30px;display: flex;align-items: center;">

        <input style="width:20%" v-model="add.name">
        <input style="width:20%;" v-model="add.startTime" type="date">
        <input style="width:20%;" v-model="add.endTime" type="date">
        <input type="file" @change="handleFileInput" ref="fileInput" multiple style="width: 30%;"/>
        <li class='check' style='float:right;color:rgb(11, 147, 234); font-size:15px;margin: 0;width:10%; cursor: pointer;'
          @click="addcancel">取消</li>
      </div>
          
    </transition>
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
        <li>考核&nbsp;&nbsp;</li><el-input type="text" placeholder="请输入" v-model="changes.name"></el-input>
      </ul>

      <ul>
        <li>开始时间</li><el-input type="date" v-model="changes.startTime"></el-input>
      </ul>

      <ul>
        <li>结束时间</li><el-input type="date" v-model="changes.endTime" style="float: left;"></el-input>
      </ul>

      <ul>
        <el-button type="primary" @click="changesure()">确定</el-button>
        <el-button style="margin-left:57%;" @click="changecancel">取消</el-button>
      </ul>
    </div>
  </teleport>
</template>

<script>
import { getprogress } from '@/store/appraisalMan/appraisalMan';
import { Teleport } from 'vue'
import { requests } from '@/service/request';
import { ElMessage } from "element-plus";

export default {
  name: "ShowExamine1",
  data() {
    return {
      progress: getprogress().progress,
      get: getprogress(),
      isShow: false,
      addstatus: false,
      formData:'',
      changetarget: '',
      add: {
        'name': '',
        'startTime': '',
        'endTime': ''
      },
      changes: {
        'name': '',
        'startTime': '',
        'endTime': ''
      },
    };
  },
  methods: {
// 处理文件
    uploadFiles(files) {
     this.formData = new FormData();
      files.forEach((file) => {
        this.formData.append('file', file);
      })
    },

    handleFileInput(e) {
      const files = Array.from(e.target.files);
      console.log(files);
      this.uploadFiles(files);
    },

    // 删除功能
    remove(id,status) {
      if(status==true){
      getprogress().deletes(id)
      }else{ ElMessage.error("已完成的流程不能删除");}
    },
    //添加功能
    addprogress() {
      this.addstatus = true
const view=document.querySelector('.view')
      let n=0;
     view.timer=setInterval(()=>{
         if(n==111){clearInterval(view.timer)}
          n++;
          view.scrollTop = 8*n;
     },5)
  
    },
    //确认按钮
    addsure() {
      if (this.addstatus == true) {
        if (this.add.name != "") {
          this.get.add(this.add.name, this.add.startTime, this.add.endTime)
          this.addstatus = false
          this.$refs.add.style.display = "block";
          this.add.name = ''
          this.add.startTime = ''
          this.add.endTime = ''
        } else {
          ElMessage.error('不能为空')
        }
      }

      //添加文件
      requests.post({
        url: 'https://la.hiles.cn/web/assess/uploadfile',
        data: {file:this.formData}
      },localStorage.getItem('token'),)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error('文件上传失败:', error);
        });
    },

    // 取消按钮
    addcancel() {
      this.addstatus = false
      this.$refs.add.style.display = "block";
      this.add.name = ''
      this.add.startTime = ''
      this.add.endTime = ''
    },


    //修改功能
    change(id, name, startTime, endTime,status) {
      if(status==true){
      this.isShow = true;
      this.changetarget = id
      this.changes.name = name
      this.changes.startTime = startTime
      this.changes.endTime = endTime
      }else{ ElMessage.error("已完成的流程不能修改");}
    },

    // 修改取消
    changecancel() {
      this.isShow = false;
      this.changes.startTime = ''
      this.changes.endTime = ''
    },

    //修改确定
    async changesure() {
      await this.get.add(this.changes.name, this.changes.startTime, this.changes.endTime, this.changetarget)
      if (this.get.code == 200) {
        this.isShow = false;
        ElMessageBox.alert('修改成功', '确认操作')
        this.changes.startTime = ''
        this.changes.endTime = ''
      }
      else {
        ElMessageBox.alert('修改失败', '确认操作')
      }
    },


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
  background-color: rgb(240, 240, 240);
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

.M_data ul li{

}
.M_data div{
  height: 75%;
  overflow: auto;
}

.headtitle {
  display: flex;
justify-content: center;
align-items: center;

  height: 25%;
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}
.headtitle li{
font-size: 20px;
font-weight: 800;
}

.M_data li {
  margin-top: 10px;
  float: left;
  width: 20%;
  text-align: center;
}

.line{
  margin-top: 15px;
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
  cursor: pointer;
}

.sure {
  float: right;
  margin-top: 10px;
  width: 70px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;

  text-align: center;
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
  min-width: 500px;
  min-height: 350px;
  width: 35%;
  height: 40%;
  background-color: white;
}


.changepage h1 {
  margin-top: 5%;
  text-align: center;
}

.changepage ul {
  width: 100%;
  height: 10%;
  margin: 5% 0 0 10%;
}

.changepage ul li {
  font-size: 25px;
  float: left;
}

.changepage ul input {
  float: left;
  margin-left: 10%;
  height: 70%;
  width: 30%;
}

:deep(.el-input) {
  width: 50%;
  margin-left: 10%;
}


input {
  background-color: white;
}

.none {
  margin-top: 10%;
  text-align: center;
  color: rgb(185, 194, 202);
  font-size: 30px;
}

.change{
  width: 7.5%!important;
 margin-left: 5%;
 color: rgba(11, 147, 234, 100);
 font-size: 15px;
 cursor: pointer;
}





</style>