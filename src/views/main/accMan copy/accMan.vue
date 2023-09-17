<template>
    <div class="container">
        <el-table :data="tableData" :style="{ width: '100%' }">
            <el-table-column label="序号" width="80" type="index" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="nickname" label="用户昵称" width="180" header-align="center" align="center" />
            <el-table-column prop="userGroup" label="组别" header-align="center" align="center" />
            <el-table-column prop="name" label="姓名" header-align="center" align="center" />
            <el-table-column prop="phone" label="手机号码" header-align="center" align="center" />
            <el-table-column prop="updateTime" label="创建时间" header-align="center" align="center" />
            <el-table-column align="center" label="操作">

                <template #default="scope">
                    <el-button size="small" type="primary" @click="deleteAcc(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination small background layout="prev, pager, next" :total="pages" class="mt-4"
            @current-change="handleCurrentChange" :current-page="currentPage" />
    </div>
</template>

<script setup>
import { accountStore } from "@/store/accMan/accMan"
import { storeToRefs } from "pinia";

let accountS = accountStore()
let currentPage = 1

accountS.getAccAction(1, 5)
const results = storeToRefs(accountS)
console.log("页面数据", results);
let tableData = results.accounts
let pages = results.pages

function handleCurrentChange(newPage) {
    currentPage = newPage
    annouces.getAnnouceAction(newPage, 5)
}

function deleteAcc(row) {
    console.log("删除的这一行数据", row);
}
</script>

<style scoped>
.container {
    position: relative;
}

.mt-4 {
    position: absolute;
    top: 300px;
    right: 50px;
}
</style>