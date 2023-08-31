<template>
    <div>公告设置/公告详情</div>
    <div class="container clearfix">
        <div class="title">{{ data.title }}</div>
        <div class="content">{{ data.content }}</div>
        <div class="writer">发布人：{{ data.publisherUsername }}</div>
        <div class="time">发布时间：{{ time }}</div>
    </div>


    <el-button class="back" @click="back">返回</el-button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { detailAnnStore } from "@/store/annouce/detailAnn"
import { storeToRefs } from "pinia";

let data = ref({
    title: "",
    content: "",
    publisherUsername: "",


})
let time = ref("")
onMounted(() => {

})

const route = useRoute()
let id = route.params.id
const detailAnn = detailAnnStore()
detailAnn.getDetailAction(id)

const results = storeToRefs(detailAnn)

data.value = results.detailMess.value
console.log("打印获取公告详情的结果s", results.detailMess.value);
let updatetime = data.updateTime
time.value = updatetime

function back() {
    window.history.back();
}
</script>

<style scoped>
.container {
    position: relative;
    background-color: #EFEFEF;
    width: 70%;
    height: 90%;
    margin: 0 auto;
}

.title {
    font-size: 23px;
    text-align: center;
    padding-top: 20px;
    font-weight: 800;
}

.content {
    padding-top: 20px;
    text-align: center;
    font-weight: 600;
}

.writer {
    position: absolute;
    bottom: 60px;
    right: 20px;
}

.time {
    position: absolute;
    bottom: 30px;
    right: 20px;
}

.back {
    position: absolute;
    right: 50px;
}
</style>