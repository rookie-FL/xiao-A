<template>
  <div class="announceShow">
    <h1>通知公告</h1>
    <el-button type="primary" class="buttonss" @click="redirectToEdit">编辑</el-button>
    <div class="separator"></div>
    <div class="line" v-for="(n, index) in notifications.data.records" :key="index">
      <div class="content">
        <h2>{{ n.title }}</h2>
        <p>{{ n.content }}</p>
        <div class="separator"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      notifications: { data: { records: [] } }
    };
  },
  methods: {   
    redirectToEdit() {
      this.$router.push(`/main/annouce`);
    },
    fetchNotifications() {
      axios.get('http://119.29.250.245:8080/web/notification/page', {
        params: {
          page: 1, 
          pageSize: 3,
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.notifications = response.data;
      })
      .catch(error => {
        console.error('获取通知数据失败：', error);
      });
    }
  },
  mounted() {
    this.fetchNotifications();
  }
};
</script>

<style scoped>
.announceShow{
  height: 55%;
}
.announceShow h1{
  display: block;
  position: relative;
  top: 15px;
}
.buttonss {
  width: 80px;
  height: 30px;
  position: relative;
  border-radius: 8px;
  bottom: 10px;
  left: 89%;
}
.buttonss p {
  color: #fff;
  font-size: 16px;
}
.tables {
  font-size: 18px;
}
.separator {
  width: 100%;
  height: 1px; 
  background-color: rgba(218, 218, 218); 
  margin: 0 2.5%;
  margin-left: 2.5%; 
  margin-bottom: 10px; 
}
.content h2 {
  margin-left: 9%;
  margin-bottom: 5px; 
  font-size: 20px;
}
.content p {
  margin-left: 7%;
  margin-top: 5px;
  margin-bottom: 5px; 
}
</style>
