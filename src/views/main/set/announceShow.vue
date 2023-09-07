<template>
  <div class="announceShow">
    <h1>通知公告</h1>
    <button class="buttonss"><router-link to="/main/annouce">编辑</router-link></button>
    <hr>
    <div class="line" v-for="(n, index) in notifications.data.records" :key="index">
      <div class="content">
        <h2>{{ n.title }}</h2>
        <p>{{ n.content }}</p>
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
  mounted() {

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
};
</script>

 
<style>
.buttonss{
    width: 80px;
    height: 30px;
    position: relative;
    bottom: 10px;
    left: 380px;
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