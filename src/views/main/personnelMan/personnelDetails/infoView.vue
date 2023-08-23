<template>
  <h1>人员管理/人员详情</h1>
  <PersonnelManComponent />
  <NoteInput/>
  <assess/>

</template>
  
  <script>
  import PersonnelManComponent from './infoRegister.vue';
  import NoteInput from "./remark.vue";
  import assess from "./assess.vue";
  import { useRoute } from 'vue-router';
  
  export default {
  name: 'InfoView',
  setup() {
    const route = useRoute();
    const index = route.query.index; // 获取查询参数 index

    // 在这里可以使用获取到的 index 值进行操作
  },
  components:{
    PersonnelManComponent,
    NoteInput,
    assess
  }
};


  </script>
  
  <style scoped>
  
  </style>
  