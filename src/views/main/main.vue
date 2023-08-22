<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <img src="./logo.png" alt="">
                <div class="title">小A招新后台管理系统</div>
                <div class="welcome">
                    <span>您好，</span>
                    <span>{{ info.nickname }}</span>
                </div>
                <div @click="exit" class="quit">退出</div>
            </el-header>
            <el-container class="container">
                <el-aside width="190px" class="side">
                    <div @click="handleItemClick" data-url="/main/home" class="item" style="background-color:rgb(187, 187, 187) ;"> 首页</div>
                    <div @click="handleItemClick" data-url="/main/personnelMan" class="item"> 人员管理</div>
                    <div @click="handleItemClick" data-url="/main/appraisalMan" class="item"> 考核管理</div>
                    <div class="set-item">
                        <div @click="handleItemClick" data-url="/main/show" style=" font-family: 'icomoon';padding-left: 35px;" class="item" > 设置</div>
                        <div @click="handleItemClick" data-url="/main/show" class="item" > 展示设置</div>
                        <div @click="handleItemClick" data-url="/main/annouce" class="item"> 公告设置</div>
                    </div>
                    <div @click="handleItemClick" data-url="/main/accMan" class="item"> 账号管理</div>
                </el-aside>
                <!-- 动态展示右侧页面 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
let group=''

import router from '@/router';
import jwtDecode from "jwt-decode";

const code = jwtDecode(localStorage.getItem("token"));
let info = JSON.parse(code.sub);
console.log("打印解析后的token", info);

function exit(params) {
    console.log("点击退出登录");
}

function handleItemClick(event) {
    let item=document.querySelectorAll('.item')
    for(let i=0;i<item.length;i++){item[i].style.backgroundColor='#4E99CA'}
    event.target.style.backgroundColor='rgba(187, 187, 187, 100)'
    const url = event.target.dataset.url;
    console.log("监听一下点击", url);
    router.push(url)
}




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
.quit,
.welcome {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    font-weight: 700;
}

/* 你好语句 */
.welcome {
    right: 110px;
}

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
    font-family: "icomoon";
    height: 50px;
    line-height: 50px;
    padding-left: 35px;
}
</style>
