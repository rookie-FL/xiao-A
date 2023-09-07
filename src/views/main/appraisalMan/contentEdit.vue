<template>
  <div>
    <h1 class="page-title">考核管理/考核内容编辑</h1>
    <button class="add-button">
      <router-link to="/main/contentEdit1" class="link">+添加</router-link>
    </button>

    <table class="custom-table">
      <thead>
        <tr>
          <th class="header-cell">标题</th>
          <th class="header-cell">组别</th>
          <th class="header-cell">发布时间</th>
          <th class="header-cell">发布人</th>
          <th class="header-cell">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(n, index) in progress.slice((page - 1) * 5, 6)" :key="index">
          <td>{{ n.name }}</td>
          <td>{{ info.userGroup }}</td>
          <td>{{ n.time }}</td>
          <td>{{ info.username }}</td>

          <td>
            <button class="delete-button" @click="remove(n.id)">删除</button>
            <button class="edit-button" @click="handleEdit(n)">编辑</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" :disabled="page * itemsPerPage >= progress.length">下一页</button>
    </div>
  </div>
  <button class="return-btn" @click="handleEdit(n)">返回</button>
</template>
<script>
import { ref } from "vue";
import jwtDecode from "jwt-decode";
import router from "@/router";
import { computed } from "vue";
import { getprogress } from "@/store/appraisalMan/appraisalMan";
import { storeToRefs } from "pinia";
import axios from "axios"; 

export default {
  name: "ShowExamine3",
  setup() {
    const itemsPerPage = 5;

    const code = jwtDecode(localStorage.getItem("token"));
    const info = JSON.parse(code.sub);

    const store = storeToRefs(getprogress());
    let progressx = store.progress;
    let progress = progressx.value;
    let page = ref(1);
    console.log(progress)
    let pages = ref(store.length);

    const leave = function () {
      router.push("/main/contentEdit");
    };

    const handleEdit = function (row) {
      router.push("/main/appraisalMan");
    };

    const remove = function (id) {
      getprogress().deletes(id);
    };
    
    const paginatedProgress = computed(() => {
      const startIndex = (page.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return progress.slice(startIndex, endIndex);
    });

    const prevPage = function () {
      if (page.value > 1) {
        page.value--;
      }
    }
    const nextPage = function () {
      if (page.value * itemsPerPage < progress.length) {
        page.value++;
      }
    };
    return {
      progress, 
      page,
      info,
      paginatedProgress,
      leave,
      handleEdit,
      remove
    };
  },
};
</script>



<style>
.add-button{
  background-color: rgba(55, 127, 127);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  border: 0px;
  float: right;
}

.return-btn{
  cursor: pointer;
  position: fixed;
  bottom: 20px; 
  right: 20px;
  color: #000;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-right: 5px;
}

.link{
  color: #fff;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.header-cell {
  background-color: #347caf;
  color: #fff;
  padding: 12px;
  text-align: center;
  font-size: 16px;
}

.custom-table th, .custom-table td {
  padding: 10px;
  text-align: center;
  font-size: 14px;
}

.edit-button, .delete-button {
  background-color: #54bcbd;
  color: #000;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-right: 5px;
}
.edit-button{
  background-color: #fff;
}


.pagination {
  display: flex;
  justify-content: flex-end; 
  align-items: center; 
  margin-top: 20px;
}

.pagination button {
  background-color: rgba(78, 153, 202);
  color: #000;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
  cursor: pointer;
  margin-right: 5px;
}

.pagination span {
  margin: 0 10px; 
  font-weight: bold; 
}

</style>
