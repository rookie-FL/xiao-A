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
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getList } from '@/store/personnelMan/personal';

export default {
  setup() {
    const note = ref('');
    const route = useRoute();
    const index = route.params.index;

    const get = getList();
    const gets = storeToRefs(get);
    const List = gets.list;
    
    const info = ref(List.value[index]);

    const addRemark = async () => {
  const remark = note.value;

  try {
    const token = localStorage.getItem('token');
    const openid = info.value.openid;
    const url = `/web/user/remark?token=${token}&openid=${openid}&remark=${remark}`;


    axios.post(url)
      .then((response) => {
        console.log('添加备注成功', response.data);
      })
      .catch((error) => {
        console.error('添加备注失败', error);
      });
  } catch (error) {
    console.error('添加备注失败', error);
  }
};


    return {
      note,
      addRemark,
    };
  },
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
