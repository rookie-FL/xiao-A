<template>
  <div class="set">
    <!-- 其他 Set 父组件内容 -->
    <programShow></programShow>
    <team></team> <!-- 嵌套 Team 子组件 -->
  
    <!-- 其他 Set 父组件内容 -->
  </div>
</template>

<script>
import Team from './team.vue';
import programShow from './programShow.vue'// 使用相对路径引入

export default {
  components: {
    Team,
    programShow, // 注册子组件
  },

  // 其他 Set 父组件逻辑
};
</script>

<style>
.parent-component {
  /* 其他样式属性 */
  overflow: hidden; /* 隐藏父组件的滚动条 */
}
</style>
