<template>
    <div>
        <img src="./后台背景图.png" alt="" class="backimg">
        <loginPanel></loginPanel>
    </div>
</template>


<script setup>
import loginPanel from './c-cpns/login-panel.vue';
</script>

<style scoped>
.backimg {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -1;
}
</style>