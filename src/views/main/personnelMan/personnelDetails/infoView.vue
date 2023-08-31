<template>
<Breadcrumb></Breadcrumb>
  <!-- <h1>人员管理/人员详情</h1> -->
  <assess/>
  <PersonnelManComponent />
  <NoteInput/>


</template>
  
  <script>
  import PersonnelManComponent from './infoRegister.vue';
  import NoteInput from "./remark.vue";
  import assess from "./assess.vue";
  import { useRoute } from 'vue-router';
  import Breadcrumb from '../../Breadcrumb.vue';
  
  export default {
  name: 'InfoView',
  setup() {
    const route = useRoute();
    const index = route.query.index; 

   
  },
  components:{
    PersonnelManComponent,
    NoteInput,
    assess,
    Breadcrumb
  }
};


  </script>
  
  <style scoped>
  
  </style>
  