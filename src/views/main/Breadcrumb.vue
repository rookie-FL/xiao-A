<template>
  <ul>
    <li v-for="(n,index) in breadList" :key="index" @click="leave(JSON.parse(JSON.stringify(breadList[index])),index)">{{ breadList[index].meta.title }} / </li>
  </ul>
</template>

<script>
import router from '@/router';
import { toRaw } from'@vue/reactivity';

export default {
  data() {
    return {
      breadList:this.$route.matched
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    isHome(route) {
      return route.name === "home";
    },
    getBreadcrumb() {
       this.breadList = this.$route.matched;
    },
    leave(route,index){
      if(index!=this.breadList.length-1)
      router.push(route.path)
    }
  },
  created() {
    this.getBreadcrumb();
  },
  mounted() {
    console.log(this.breadList);
  },
};
</script>

<style scoped>
ul{
    width: 100%;
    height: 40px;
}
li{
    cursor: pointer;
    float: left;
    font-size: 16px;
}

li:hover{
    color: rgba(11, 147, 234, 100)
}

</style>