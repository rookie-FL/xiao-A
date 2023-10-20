<template>
    <div class="common-layout" >
        <el-container>
            <el-header class="header">
                <img src="./logo.png" alt="" class="logo">
                <div class="title">小A招新后台管理系统</div>
                <div class="welcome">
                    <span>您好，</span>
                    <span>{{ info.nickname }}</span>
                </div>
                <el-popconfirm title="是否退出登录?" hide-icon="true" confirm-button-text="确定" cancel-button-text="取消"  @confirm="confirmEvent">
                    <template #reference>
                        <el-button class="quit">退出登录</el-button>
                    </template>
                </el-popconfirm>
            </el-header>
            <el-container class="container">
                <el-aside width="190px" class="side">
                    <div @click="handleItemClick" data-url="/main/home" class="item" style="background-color:rgb(111, 209, 243) ;"> 首页</div>
                    <div @click="handleItemClick" data-url="/main/personnelMan" class="item"> 人员管理</div>
                    <div @click="handleItemClick" data-url="/main/appraisalMan" class="item"> 考核管理</div>
                    <div class="set-item">
                        <div @click="handleItemClick" data-url="/main/set" style=" font-family: 'icomoon';padding-left: 35px;" class="item"> 设置</div>
                        <div @click="handleItemClick" data-url="/main/show" class="item children close"> 展示设置</div>
                        <div @click="handleItemClick" data-url="/main/annouce" class="item children close"> 公告设置</div>
                    </div>
                    <div @click="handleItemClick" data-url="/main/accMan" class="item" > 账号管理</div>
                </el-aside>
                <!-- 动态展示右侧页面 -->
                <el-main class="hidden" style="overflow:initial;">
                    <transition name="el-fade-in-linear">
                        <router-view v-loading="loading" ></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>

import router from '@/router';
import jwtDecode from "jwt-decode";
import { useRouter } from 'vue-router';
import {watch ,onMounted,onBeforeMount,ref} from 'vue'
import { ElLoading } from 'element-plus'

const routers = useRouter()
const code = jwtDecode(localStorage.getItem("token"));
let info = JSON.parse(code.sub);

function handleItemClick(event) {
    const url = event.target.dataset.url;
    router.push(url)
    if(url=='/main/set'){
       document.querySelectorAll('.children').forEach(element => {
            element.classList.toggle('close')
       });
    }
    
}
// 退出登录
let confirmEvent=()=>{
    router.replace('/login')
    localStorage.removeItem('name')
    localStorage.removeItem('password')
}
// 监听当前路由
watch(
  () => routers.currentRoute.value,
  (newValue) => {
    let item=document.querySelectorAll('.item')
    for(let i=0;i<item.length;i++){
        if(newValue.fullPath==item[i].getAttribute('data-url'))
        {
            for(let j=0;j<item.length;j++)
            {   
                item[j].style.backgroundColor='#4E99CA'
                if(i!=j){
                    item[j].onmouseover = function () {
                    this.style.backgroundColor = "rgb(70, 125, 201)";
                    };
                    item[j].onmouseout = function () {
                    this.style.backgroundColor = "#4E99CA";
                    }
                }else{
                    item[j].onmouseover = function () {
                    this.style.backgroundColor = "rgb(131, 210, 244)";
                    };
                    item[j].onmouseout = function () {
                    this.style.backgroundColor = "rgb(131, 210, 244)";
                    }
                }
            };
            item[i].style.backgroundColor='rgb(111, 209, 243)'
        }
    }
  },
  { immediate: true }
)
let loading=ref(true)
setTimeout(() => {
  // 关闭全局Loading
  loading.value=false
}, 1000)
onMounted(()=>{
    let main=document.querySelector('.el-main')
    main.style.padding=0
})
</script>



<style scoped>
/* 退出按钮 */
@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?bt2g0o');
  src:  url('fonts/icomoon.eot?bt2g0o#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?bt2g0o') format('truetype'),
    url('fonts/icomoon.woff?bt2g0o') format('woff'),
    url('fonts/icomoon.svg?bt2g0o#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.common-layout{
    width: 100%;
    height: 100%;
}
.quit{
    position: absolute;
    right: 40px;
    top: 25px;
}
.welcome {
    position: absolute;
    right: 150px;
    top: 30px;
    font-weight: 600!important;
    font-family:Microsoft YaHei !important;
}

/* 你好语句 */

.quit:hover {
    cursor: pointer;
}

.close{
    height: 0!important;
    opacity: 0;
    overflow: hidden;
}

.header {
    display: flex;
    flex-direction: row;
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom: 1px solid rgb(210, 210, 211);
    z-index: 10;
}

.header img {
    display: inline-block;
    position: absolute;
    top: px;
    left: 50px;
    height: 110px;
    width: 110px;
    border-radius: 50%;
}

.header .title {
    position: absolute;
    margin-left: 150px;
    line-height: 80px;
    font-weight: 500;
    font-size: 30px;
    font-family:Microsoft YaHei !important;
}

.container {
    height: 90vh;
    margin-bottom: 0;
}

.side {
    height: 100%;
    padding-top: 40px;
    font-size: 20px;
    background-color: #4E99CA;
    color: white;
    font-weight: 800;
}

.set-item div{
    padding-left: 70px;
    transition: all 0.4s;
}
.item:hover,.set-item div:hover{
    background-color: rgb(70, 125, 201);
}

.item {
    cursor: pointer;
    font-family: "icomoon";
    height: 50px;
    line-height: 50px;
    padding-left: 35px;
    transition: all 0.4s;
}
</style>
