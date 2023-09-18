<template>
  <div class="infoBox">
    <Breadcrumb></Breadcrumb>
    <assess :info="info"/>
  </div>
</template>
  
  <script>
  import PersonnelManComponent from './infoRegister.vue';
  import NoteInput from "./remark.vue";
  import assess from "./assess.vue";
  import { useRoute } from 'vue-router';
  import Breadcrumb from '../../Breadcrumb.vue';
import { provide } from 'vue';
  
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
  