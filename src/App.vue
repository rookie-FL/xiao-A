<template>
  <div class="app" ref="app">
      <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 防止用户缩放屏幕pc端
window.addEventListener('mousewheel', function (e) {
      if ((e.wheelDelta ) || e.detail) {
        e.preventDefault();
      }
    }, { capture: false, passive: false});


window.addEventListener('keydown', function (event) {
      if ((event.ctrlKey === true || event.metaKey === true)
        && (event.key === 61 || event.key === 107
          || event.key === 173 || event.key === 109
          || event.key === 187 || event.key === 189)) {
        event.preventDefault();
      }
    }, false)
// 获取屏幕宽高，固定页面
let screenwith=window.screen.availWidth-50
let screenhight=window.screen.availHeight-80
let bodyStyle = document.body.style
bodyStyle.width=screenwith+'px'
bodyStyle.height=screenhight+'px'
const app=ref(null)
onMounted(()=>{
  app.value.style.width=bodyStyle.width
  app.value.style.height=bodyStyle.height
})
</script>


<style>
@import url("element-plus/theme-chalk/el-message.css");
@import url(./style/reset.css);
html,
body {
	height: 100%;
	width: 100%;
  min-height: 800px;
}
*{
  user-select: none;
}
</style>