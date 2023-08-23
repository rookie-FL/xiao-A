<template>
  <div>
    <h1 class="apply">报名信息</h1>
    <div class="infoRegister">
      <div class="M_data">
        <ul class="headtitle">
          <li>序号</li>
          <li>姓名</li>
          <li>学院</li>
          <li>年级</li>
          <li>专业班级</li>
          <li>组别</li>
          <li>目前进度</li>
          <li>电话号码</li>
        </ul>
        <ul v-for="(n, index) in filteredList" :key="index">
          <li>{{ index + 1 }}</li>
          <li>{{ n.name }}</li>
          <li>{{ n.college }}</li>
          <li>{{ n.grade }}</li>
          <li>{{ n.major }}</li>
          <li>{{ n.group_option }}</li>
          <li>{{ n.currentAssess }}</li>
          <li>{{ n.phone }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { getList } from '@/store/personnelMan/personal';

export default {
  name: 'InfoView',
  props: ['index'], // 接收父组件传递的 index
  setup(props) {
    // 从 props.index 中获取索引
    const index = parseInt(props.index);

    // 获取信息列表
    const get = getList();
    const gets = storeToRefs(get);
    const List = gets.list;

    // 使用信息索引提取特定信息
    const info = List[index];

    // 返回需要的数据和方法
    return {
      info
    };
  },
};
</script>

<style>
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
