<template>
    <div class="headline"></div>
    <ul>
        <li>工作内容</li>
        <textarea cols="30" rows="10" placeholder="输入内容" v-model="data.content"></textarea>
        <!-- <input type="text" placeholder="输入内容"> -->
    </ul>
    <ul>
        <li>招新需求</li>
        <textarea cols="30" rows="10" placeholder="输入内容" v-model="data.required"></textarea>
    </ul>
    <ul>
        <li>未来收获</li>
        <textarea cols="30" rows="10" placeholder="输入内容" v-model="data.harvest"></textarea>
    </ul>
    <div class="butbox">
        <el-button text @click="open" class="but">确认</el-button>
        <div class="but" @click="leave">返回</div>

    </div>


</template>
<!-- tip -->
<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue'
import { infoSet } from '@/store/info/infoSet'
import { storeToRefs } from 'pinia';


const info = storeToRefs(infoSet())
let data = ref(info.data)
let group = useRoute().params.group


const leave = function () {
    router.push("/main/set")
}

const open = () => {
    infoSet().setinfo(group)
    console.log(info.code);
   if(info.code.value==200){
    ElMessageBox.alert('修改成功', '确认操作', {confirmButtonText: '确认',})
}
else{
    ElMessageBox.alert('修改失败', '确认操作', {
    confirmButtonText: '确认',
  })
}

}


</script >

<style scoped>
.headline {
    width: 100%;
    height: 5%;
    color: black;
}

ul {
    width: 100%;
    height: 25%;
    margin-top: 2%;
}

li {
    float: left;
    text-align: center;
    width: 10%;
    height: 100%;
    font-size: 20px;
    font-weight: 800;
}

.butbox {
    margin-top: 2%;
    width: 90%;
}

.but {
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

textarea {
    float: left;
    width: 80%;
    height: 100%;
    line-height: 20px;
    resize: none;
}

</style>