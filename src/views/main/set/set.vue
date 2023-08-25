<template>
  <div class="set">
<<<<<<< HEAD
    <div class="left">
=======
    <!-- 其他 Set 父组件内容 -->
    <infoSet></infoSet>
>>>>>>> ba39cf98fb10fef9ce4143a25573dc005c0734ed
    <programShow></programShow>
    <team></team> 
    </div>
    <div class="right">
    <announceShow></announceShow>
    </div>
    
    
  
  </div>
</template>

<script>
import Team from './team.vue';
<<<<<<< HEAD
import programShow from './programShow.vue'
import announceShow from './announceShow.vue';
=======
import programShow from './programShow.vue'// 使用相对路径引入
import infoSet from './infoSet.vue';
>>>>>>> ba39cf98fb10fef9ce4143a25573dc005c0734ed

export default {
  components: {
    Team,
<<<<<<< HEAD
    programShow, 
    announceShow
=======
    programShow, // 注册子组件
    infoSet,
>>>>>>> ba39cf98fb10fef9ce4143a25573dc005c0734ed
  },


};
</script>

<<<<<<< HEAD
<style>
.set{
  height: 100%;
  display: flex;
  overflow: hidden; 
}

.left{
  width: 54%;
}
.right{
  width: 45%;
=======
<style scoped>
.parent-component {
  /* 其他样式属性 */
  overflow: hidden; /* 隐藏父组件的滚动条 */
>>>>>>> ba39cf98fb10fef9ce4143a25573dc005c0734ed
}

.set{
  width: 100%;
  height: 100%;
}
</style>
