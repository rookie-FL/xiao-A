<template>
    <div style="width:100%;height:100%">
        <li>考核管理页</li>
        <span>考核流程</span>
        <span>考核内容</span>
        <ShowExamine1></ShowExamine1>
        <span>考核情况</span>
        <ShowExamine2></ShowExamine2>
        <ShowExamine3></ShowExamine3>
    </div>


</template>


<script setup>
import ShowExamine1 from "./ShowExamine1.vue";
import ShowExamine2 from "./ShowExamine2.vue";
import ShowExamine3 from "./ShowExamine3.vue";


</script>

<style scoped>
li{
    height: 5%;
    width: 100%;

    font-size: 18px;
}
span{
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    width: 50%;
    height: 5%;
    line-height: 200%;
}

</style>