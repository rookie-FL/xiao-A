<template>
  <div class="announceShow">
    <h1>通知公告</h1>
    <button class="buttonss"><router-link to="/main/annouce">编辑</router-link></button>
    <hr>
    <div>
      <el-table :data="notifications" style="width: 100%" class="tables">
        <el-table-column prop="title" class="tables"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const store = useStore();
const notifications = ref([]);

onMounted(async () => {
  try {
    const token = "your_token"; 
    const page = 1;
    const pageSize = 10; 

    await store.dispatch("notifications/fetchNotifications", { token, page, pageSize });
    notifications.value = store.state.notifications.notifications;
  } catch (error) {
    console.error("获取通知公告失败", error);
  }
});
</script>

  
<style>
.buttonss{
    width: 80px;
    height: 30px;
    position: relative;
    bottom: 10px;
    left: 470px;
    font-size: 18px;
    background-color: rgba(127, 184, 238);
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tables{
  font-size: 18px;
}
</style>