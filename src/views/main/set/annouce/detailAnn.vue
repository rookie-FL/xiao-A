<template>
    <div>公告设置/公告详情</div>
    <div>
        <div class="title"></div>
        <div class="content"></div>
        <div class="writer"></div>
        <div class="time"></div>
    </div>
    <el-button>返回</el-button>
</template>

<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';
import { queryAnn } from "@/service/annouce/queryAnn"

const route = useRoute()
function queryID() {
    let id = route.params.id
    console.log(id);
    let results = queryAnn(id)
    console.log("打印结果", results.data);
}

queryID()
</script>