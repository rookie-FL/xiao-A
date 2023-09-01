<template>
    <router-view></router-view>
    <div v-if="route.matched[route.matched.length-1].meta.show">
        <Breadcrumb></Breadcrumb>
        <el-button type="primary" class="add">
            <router-link to="/main/annouce/create" class="link">+添加</router-link>
        </el-button>

        <div class="container">
            <!--  -->
            <el-table :data="filterTableData" style="width: 100%" class="table" @row-click="handleRowClick">
                <el-table-column label="标题" prop="title" align="center" />
                <el-table-column label="组别" prop="noGroup" align="center" />
                <el-table-column label="发布时间" prop="time" align="center" />
                <el-table-column label="发布人" prop="publisherUsername" align="center" />

                <el-table-column align="center" label="操作">

                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleDelete(scope.$index, scope.row)"
                            class="delete button" style="position: relative; z-index: 100;">删除</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)" class="edit button">
                编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination small background layout="prev, pager, next" :total="pages" class="mt-4"
                @current-change="handleCurrentChange" :current-page="currentPage" />

        </div>

    </div>
</template>

<script setup>
import { annouceStore } from "/src/store/annouce/getAnnouce.js"
import { deleteAnn } from "@/service/annouce/deleteAnn"
import { storeToRefs } from "pinia";
import router from '@/router';
import { useRoute } from "vue-router";
import Breadcrumb from "../../Breadcrumb.vue";
const route = useRoute();



let currentPage = 1


const annouces = annouceStore()
annouces.getAnnouceAction(1, 5)
const results = storeToRefs(annouces)


let filterTableData = results.annouce
let pages = Number(results.pages.value) * 10

console.log("打印一些a", filterTableData);

const handleEdit = (index, row) => {
    console.log(index, row, "点击编辑")

}
const handleDelete = (index, row) => {
    console.log(row, "点击删除", row.id)
    deleteAnn(row.id)

}

function handleCurrentChange(newPage) {
    currentPage = newPage
    annouces.getAnnouceAction(newPage, 5)
}

function handleRowClick(row) {
    console.log("点击这一行", row);
    router.push({
        name: "deatilAnn",
        params: {
            id: row.id
        }
    })
}


</script>

<style scoped>
.table {
    margin-top: 35px;
}

.link {
    color: white;
    font-size: 16px;
}

.add {
    position: absolute;
    right: 80px;
    width: 100px;
    border: none;
    background-color: #377F7F;
    color: white
}

.delete {
    color: black;
    border: none;
    background-color: #54BCBD;
}

.button {
    color: black;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
}

.container {
    position: relative;
}

.mt-4 {
    position: absolute;
    top: 300px;
    right: 50px;
}
</style>