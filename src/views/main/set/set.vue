<template>
  <div class="set">
    <!-- 其他 Set 父组件内容 -->
    <infoSet></infoSet>
    <programShow></programShow>
    <team></team> <!-- 嵌套 Team 子组件 -->
  
    <!-- 其他 Set 父组件内容 -->
  </div>
</template>

<script>
import Team from './team.vue';
import programShow from './programShow.vue'// 使用相对路径引入
import infoSet from './infoSet.vue';

export default {
  components: {
    Team,
    programShow, // 注册子组件
    infoSet,
  },

  // 其他 Set 父组件逻辑
};
</script>

<style scoped>
.parent-component {
  /* 其他样式属性 */
  overflow: hidden; /* 隐藏父组件的滚动条 */
}

.set{
  width: 100%;
  height: 100%;
}
</style>
