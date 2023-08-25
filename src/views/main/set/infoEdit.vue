<template>
   <div class="headline"></div>
    <ul>
        <li>工作内容</li>
        <textarea cols="30" rows="10" placeholder="输入内容"></textarea>
       <!-- <input type="text" placeholder="输入内容"> -->
    </ul>
    <ul>
        <li>招新需求</li>
        <textarea cols="30" rows="10" placeholder="输入内容"></textarea>
    </ul>
    <ul>
        <li>未来收获</li>
        <textarea cols="30" rows="10" placeholder="输入内容"></textarea>
    </ul>
    <div class="butbox">
        <div class="but" @click="leave">返回</div>
        <div class="but">确定</div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import router from '@/router';
const leave=function(){
    router.push("/main/set")
}

</script >

<style scoped>
.headline{
    width: 100%;
    height: 5%;
    color: black;
}

ul{
    width: 100%;
    height: 25%;
    margin-top: 2%;
}

li{
   float: left;
    text-align: center;
    width: 10%;
    height: 100%;
    font-size: 20px;
    font-weight: 800;
}

.butbox{
margin-top: 2%;
width: 90%;
}
.but{
    cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
float: right;
margin-left: 10%;
width: 80px;
height: 30px;
border: #ccc;
box-shadow: 2px 2px 5px rgb(0 0 0 / 50%);
border-radius: 5px;
}

textarea{
    float: left;
    width: 80%;
    height: 100%;
    line-height: 20px;
    resize: none;
}



</style>