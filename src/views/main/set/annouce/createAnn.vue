<template>
    <div class="box">
        <div>公告设置/通知公告管理/通知公告编辑</div>
        <div>
            <span class="title">标题</span>
            <input type="text" placeholder="输入标题" v-model="title">
        </div>
        <div class="container">
            <span class="title">内容</span>
            <textarea name="" id="" cols="120" rows="30" placeholder="输入内容" v-model="content"></textarea>
        </div>
        <div class="buttons">
            <el-button class="back" @click="back">返回</el-button>
            <el-button class="save" @click="save">暂存</el-button>
            <el-button class="public" @click="release">发布</el-button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { releaseAnnStore } from '@/store/annouce/releaseAnn';
import jwtDecode from "jwt-decode";

const code = jwtDecode(localStorage.getItem("token"));
let info = JSON.parse(code.sub);
console.log("打印解析后的token", info);
let title;
let content;
let releaseAnn = releaseAnnStore()

function release() {
    if (title && content) {
        console.log("点击发送");
        releaseAnn.releaseAnns({
            title,
            content,
            publisherUsername: info.username,
            isPublish: true,
            noGroup: info.userGroup
        })
    }
}

function back() {
    router.push("/main/annouce")
}

function save() {
    console.log("点击暂存");
    releaseAnn.releaseAnns({
        title,
        content,
        publisherUsername: info.username,
        isPublish: false,
        noGroup: info.userGroup
    })
}
</script>

<style scoped>
.box {
    position: relative;
}

.title {
    font-weight: 700;
}

input,
textarea {
    margin: 18px;
    border-radius: 0;
    padding: 4px;
    border: 1px solid rgb(156, 155, 155);
}

textarea {
    resize: none;
    margin-left: 50px;
}

.container {
    position: relative;
}

.container>span {
    position: absolute;
    top: 18px;
    left: 0;
}

.buttons {
    position: absolute;
    right: 150px;
}

.buttons>button {
    width: 82px;
    margin: 15px;
}
</style>