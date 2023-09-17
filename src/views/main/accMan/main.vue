<template>
    <div class="common-layout" >
        <el-container>
            <el-header class="header">
                <img src="./logo.png" alt="">
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
                    <div @click="handleItemClick" data-url="/main/home" class="item" style="background-color:rgb(187, 187, 187) ;"> 首页</div>
                    <div @click="handleItemClick" data-url="/main/personnelMan" class="item"> 人员管理</div>
                    <div @click="handleItemClick" data-url="/main/appraisalMan" class="item"> 考核管理</div>
                    <div class="set-item">
                        <div @click="handleItemClick" data-url="/main/set" style=" font-family: 'icomoon';padding-left: 35px;" class="item" > 设置</div>
                        <div @click="handleItemClick" data-url="/main/show" class="item" > 展示设置</div>
                        <div @click="handleItemClick" data-url="/main/annouce" class="item"> 公告设置</div>
                    </div>
                    <div @click="handleItemClick" data-url="/main/accMan" class="item"> 账号管理</div>
                </el-aside>
                <!-- 动态展示右侧页面 -->
                <el-main class="hidden">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>

import router from '@/router';
import jwtDecode from "jwt-decode";
import { useRouter } from 'vue-router';
import {watch} from 'vue'

const routers = useRouter()
const code = jwtDecode(localStorage.getItem("token"));
let info = JSON.parse(code.sub);
console.log("打印解析后的token", info);

function handleItemClick(event) {
    const url = event.target.dataset.url;
    router.push(url)
    
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
            }
            item[i].style.backgroundColor='rgb(187, 187, 187)'
        }
    }
  },
  { immediate: true }
)


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
    top: 40px;
}
.welcome {
    position: absolute;
    right: 150px;
    top: 45px;
}

/* 你好语句 */

.quit:hover {
    cursor: pointer;
}

.header {
    position: relative;
    height: 15vh;
    border-bottom: 1px #C1C1C1 solid;
}

.header img {
    position: absolute;
    left: 30px;
    width: 23vh;
}

.header .title {
    position: absolute;
    margin-left: 15%;
    line-height: 15vh;
    font-weight: 800;
    font-size: 30px;
}

.container {
    height: 85vh;
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
}

.item {
    cursor: pointer;
    font-family: "icomoon";
    height: 50px;
    line-height: 50px;
    padding-left: 35px;
}
</style>
