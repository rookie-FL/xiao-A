<template>
  <el-row class="row1" :gutter="100">
    <el-col :span="8">
      <div class="sign_info">
        <div class="sign_info_title">报名信息</div>
        <div class="sign_info_detial_container">
            <ul class="sign_info_detial">
              <li><span>姓名</span><span>{{ info.name }}</span></li>
              <li><span>学院</span><span>{{ info.college }}</span></li>
              <li><span>年级</span><span>{{ info.grade }}</span></li>
              <li><span>专业班级</span><span>{{ info.major }}</span></li>
              <li><span>学号</span><span>{{ info.stu_id }}</span></li>
              <li><span>选择方向</span><span>{{ info.group_option }}</span></li>
              <li><span>联系方式</span><span>{{ info.phone }}</span></li>
            </ul>
        </div>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="progress_info">
        <div class="progress_info_title">报名信息</div>
        <div class="progress_info_detial_container">
          <div class="progress_header">目前进度:  {{ info.currentAssess }}</div>
          <div class="progress_status"></div>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row class="row2" :gutter="50">
    <el-col :span="9">
      <div class="remark_info">
        <div class="remark_info_title">备注</div>
        <div class="remark_info_detial_container">
          <el-input
            v-model="remark"
            :rows="10"
            type="textarea"
            placeholder="备注"
            resize="none"
          />
        </div>
      </div>
    </el-col>
    <el-col :span="15">
      <div class="scores_info">
        <div class="scores_info_title">进度设置</div>
        <div class="scores_info_detial_container">
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row class="row3">
    <el-button type="primary" class="back" @click="back">返回</el-button>
    <el-button type="primary" class="commit" @click="addRemark">确定</el-button>
  </el-row>
</template>
  
  <script setup>
  import router from '@/router';
  import { ElMessage } from 'element-plus';
  import { inject, reactive ,ref} from 'vue';
  import axios from 'axios';
  let info=reactive(inject('info'))
  console.log(inject('info'))
  //格式转换
  if(info.group_option==0){
    info.group_option='后台组'
  }else if(info.group_option==1){
    info.group_option='前端组'
  }else if(info.group_option==2){
    info.group_option='AI组'
  }else if(info.group_option==3){
    info.group_option='运维组'
  }else if(info.group_option==4){
    info.group_option='机械组'
  }else if(info.group_option==5){
    info.group_option='电控组'
  }
  // 备注部分
  let remark=ref(info.remark)
  let addRemark =  () => {
      let token = localStorage.getItem('token');
      let openid = info.openid;
      let url = `https://la.hiles.cn/web/user/remark?openid=${openid}`;
      axios.put(url,{
        params:{
          remark:remark.value
        },
        headers:{
          token:token
        }
      })
        .then((response) => {
          ElMessage.success('添加备注成功')
        })
        .catch((error) => {
          ElMessage.error('添加备注失败')
        });
    } 
  // 返回按钮
  const back = () =>{
    router.replace({path:'/main/personnelMan'})
  }
  </script>

<style scoped>
  .row1{
    height: 300px;
    margin-bottom: 1%;
  }
  .row2{
    height: 40%;
  }
  .sign_info,.progress_info,.remark_info,.scores_info{
    width: 100%;
    height: 100%;
    display: inline-flex;
    background-color: transparent;
    box-sizing: border-box;
    flex-direction: column;
  }
  .sign_info_title,.progress_info_title,.remark_info_title,.scores_info_title{
    width: 100%;
    height: 10%;
    font-weight: 600;
    font-family: Microsoft yahei;
    color: rgb(96, 98, 102);
  }
  .sign_info_detial_container,.progress_info_detial_container,.remark_info_detial_container,.scores_info_detial_container{
    display: inline-flex;
    width: 100%;
    height: 90%;
    border-radius: 10px;
    background-color: rgba(238, 245, 255, 0.5);
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px;
    transition: all 0.4s;
  }
  .sign_info_detial_container:hover,.progress_info_detial_container:hover,.remark_info_detial_container:hover,.scores_info_detial_container:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .sign_info_detial li{
    width: 100%;
    height: 27px;
    line-height:27px ;
    border-bottom: 3px dotted rgb(145, 147, 153,0.5);
  }
  .sign_info_detial li span:first-child{
    display: inline-block;
    width: 30%;
    text-align: center;
    font-family: Microsoft yahei;
    border-right: 1px solid rgb(145, 147, 153,0.5);
    color: rgb(135, 188, 255);
  }
  .sign_info_detial li span:last-child{
    display: inline-block;
    width: 68%;
    text-align: center;
    font-family: Microsoft yahei;
  }
  .progress_info{
    width: 100%;
    height: 100%;
  }
  .progress_header{
    font-size: 18px;
    font-family: Microsoft yahei;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(224, 224, 224);
    color: rgb(135, 188, 255);
  }
  .scores{
    width: 100%;
    height: 100%;
    background-color: beige;
  }
  .row3{
    margin-top: 40px;
    height: 50px;
    flex-direction: row;
    justify-content: end;
  }
  .commit{
    margin-left: 20px;
  }
</style>
