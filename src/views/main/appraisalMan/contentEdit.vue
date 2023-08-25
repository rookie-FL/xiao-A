<template>
    <h1>考核管理/考核内容编辑</h1>
    <div class="content">
        <div class="add-button">
          <router-link to="/main/contentEdit1" class="link">+添加</router-link>
        </div>
      <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="标题"  align="center" />
        <el-table-column label="组别"  align="center" />
        <el-table-column label="发布时间"  align="center" />
        <el-table-column label="发布人"  align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
import { contentStore } from "/src/store/editContet/getContent.js"
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import router from '@/router';
const contents = contentStore()
const results = storeToRefs(contents)
let filterTableData = results.content

  </script>
  
  <style>
 .link {
    color: white;
    font-size: 16px;
}
  </style>
