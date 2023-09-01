<template>
  <div>
    <h1 class="apply">报名信息</h1>
    <div class="infoRegister">
      <div class="M_data">
        <ul class="headtitle" v-if="info!=null">
          <li>序号 : {{parseInt(index)+1}}</li>
          <li>姓名 : {{info.name}}</li>
          <li>学院 : {{info.college}}</li>
          <li>年级 : {{info.major}}</li>
          <li>专业班级 : {{info.grade}}</li>
          <li>组别 : {{info.group_option}}</li>
          <li>目前进度 : {{info.currentAssess}}</li>
          <li>电话号码 : {{info.phone}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getList } from '@/store/personnelMan/personal';

export default {
  name: 'InfoView',
  props: ['index'], 
  setup(props) {
    const index=useRoute().params.index

    const get = getList();
    const gets = storeToRefs(get);
    const List = gets.list;

    const info= ref(List.value[index]);
    console.log(List)
    console.log(info._rawValue.openid)
    return {
      info,
      index,
    };
  },
};
</script>

<style scoped>
.infoRegister {
  width: 20%;
  background-color: rgba(239, 239, 239); 
  padding: 20px; 
  margin-left: 20px;
  border-radius: 10px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.apply{
  color: rgba(89, 87, 87);
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}

li{
  text-align: 18px;
  font-weight: 700;
  margin-top: 10px ;
}
</style>
