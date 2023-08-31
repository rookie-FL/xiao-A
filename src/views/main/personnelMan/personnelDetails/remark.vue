<template>
  <div>
    <h1 class="remark">备注</h1>
    <div class="note-input">
      <textarea v-model="note" placeholder="备注"></textarea>
      <button @click="addRemark">添加备注</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      note: '' 
    };
  },
  methods: {
    async addRemark() {
  const requestData = {
    remark: this.note
  };

  try {
    const token = localStorage.getItem('token');
    // const id = this.$route.params.index; 
 console.log(id)
    const response = await axios.get('/web/user/remark', {
      // params: {
      //   id: id, 
      // },
      headers: {
        token: token,
      }
    });

    console.log('获取备注成功', response.data);
  } catch (error) {
    console.error('获取备注失败', error);
  }
}

    
  }
};
</script>
 
<style scoped>
.note-input {
  width: 40%;
  height: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgba(239, 239, 239); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.remark{
  color: rgba(89, 87, 87);
  margin-top: 10px;
  margin-bottom: 10px;
}

textarea {
  width: 98.5%;
  height: 96%;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 14px;
}
</style>
