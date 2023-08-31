<template>
  <h1>考核管理/考核内容编辑</h1>
  <div class="content">
    <button class="add-button">
      <router-link to="/main/contentEdit1" class="link" >+添加</router-link>
    </button>
    <el-table style="width: 100%" class="el-table">
      <el-table-column label="标题" align="center">
        <template #default="scope">{{scope.row.group }}</template>
      </el-table-column>
      <el-table-column label="组别" align="center">
        <template #default="scope">{{ scope.row.group }}</template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template #default="scope">{{ scope.row.publishTime }}</template>
      </el-table-column>
      <el-table-column label="发布人" align="center">
        <template #default="scope">{{ scope.row.publisher }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

</script>

<style>
.add-button{
  background-color: rgba(55, 127, 127);
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  border: 0px;
  float: right;
}

.link{
  color: #fff;
}

</style>
