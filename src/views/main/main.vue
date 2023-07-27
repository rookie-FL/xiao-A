<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <h1>小A招新后台管理系统</h1>
                <button @click="exit" class="quit">退出</button>
            </el-header>
            <el-container class="container">
                <el-aside width="170px" class="side">
                    <div @click="handleItemClick" data-url="/main/home">首页</div>
                    <div @click="handleItemClick" data-url="/main/personnelMan">人员管理</div>
                    <div @click="handleItemClick" data-url="/main/appraisalMan">考核管理</div>
                    <div @click="handleItemClick" data-url="/main/home">设置</div>
                    <div @click="handleItemClick" data-url="/main/accMan">账号管理</div>
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
import router from '@/router';

function exit(params) {
    console.log("点击退出登录");
}

function handleItemClick(event) {
    const url = event.target.dataset.url;
    console.log("监听一下点击", url);
    router.push(url)
}
</script>

<style scoped>
.quit {
    position: absolute;
    top: 50%;
    right: 40px;
    border: none;
    transform: translateY(-50%);
    background-color: white;

}

.header {
    position: relative;
    height: 15vh;
}

.header h1 {
    line-height: 15vh;
}

.container {
    height: 85vh;
}

.side {
    height: 100%;
    font-size: 20px;
    background-color: #4E99CA;
    color: white;
    font-weight: 800;
}

.side>div {
    height: 50px;
    line-height: 50px;
    padding-left: 25px;
}
</style>
