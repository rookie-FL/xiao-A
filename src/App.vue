<template>
  <div class="app">
    <img src="./assets/img/后台背景图.png" alt="" class="backimg">
  </div>
  <loginPanel></loginPanel>
</template>

<script setup>
import loginPanel from "./views/login/c-cpns/login-panel"
</script>


<style scoped>
@import url(./style/reset.css);

.backimg {
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: -1;
}

</style>