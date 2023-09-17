<template>
<<<<<<< HEAD
<Breadcrumb></Breadcrumb>
  <!-- <h1>人员管理/人员详情</h1> -->
  <assess/>
  <PersonnelManComponent />
  <NoteInput/>


=======
  <div class="infoBox">
    <Breadcrumb></Breadcrumb>
    <assess :info="info"/>
  </div>
>>>>>>> b6cdb5a (2023.9.17)
</template>
  
  <script>
  import PersonnelManComponent from './infoRegister.vue';
  import NoteInput from "./remark.vue";
  import assess from "./assess.vue";
  import { useRoute } from 'vue-router';
  import Breadcrumb from '../../Breadcrumb.vue';
<<<<<<< HEAD
=======
import { provide } from 'vue';
>>>>>>> b6cdb5a (2023.9.17)
  
  export default {
  name: 'InfoView',
  setup() {
    const route = useRoute();
    const index = route.query.index;
    let info=JSON.parse(route.query.stringInfo);
    provide('info',info)
    return{
      info,
      route,
      index
    }
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
    .infoBox{
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  </style>
  