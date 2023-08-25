<template>
    <div class="bigbox">
        <div class="above">
            <li class="line">组别介绍</li>
            <el-button type="primary" class="but" @click="edit">编辑</el-button>
        </div>
        <div class="smallbox">
            <ul class="head">
                <li class="title">项目管理</li>
                <select class="group" v-model="group" ref="sel" >
                <option value="0">后台组</option>
                <option value="1">前端组</option>
                <option value="2">Al组</option>
                <option value="3">传媒组</option>
                <option value="4">机械组</option>
                <option value="5">电控组</option>
                <option value="6">管理组</option>
            </select>
            </ul>
            <div class="content">
                <ul>
                    <li class="round"></li>
                    <li>工作内容</li>
                </ul>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>
                <ul>
                    <li class="round"></li>
                    <li>工作需求</li>
                </ul>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>
                <ul>
                    <li class="round"></li>
                    <li>未来收获</li>
                </ul>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>
            </div>
        </div>

        
    </div>
</template>

<script setup>
import router from '@/router';
import { getprogress } from '@/store/home/home';

const gets=getprogress()

let group = ref(gets.base)

watch(group, (newValue) => {
    })

const edit = function () {
router.push('/main/set/infoEdit')
}

</script>

<style scoped>
.bigbox {
    float: right;
    width: 50%;
    height: 35%;
}

.above {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 15%;
}

.line {
    float: left;
    font-size: 18px;
    font-weight: 800;
    height: 40px;
    line-height: 40px;
}

.but {
    float: right;
    width: 80px;
    border-radius: 8px;
}

.smallbox {
    margin: 2.5% auto;
    width: 90%;
    height: 85%;
    background-color: rgba(239,239,239,100);
    border-radius: 15px;
    box-shadow: 5px 5px 5px rgb(187 187 187);
}

.head{
    position: relative;
}

.title {
    width: 100%;
    height: 5%;
    text-align: center;
    font-weight: 800;
    font-size: 18px;
}

.group {
position: absolute;
left: 100%;
margin-left: -105px;
top: 5px;

width: 100px;
height: 30px;
border-radius: 5px;

outline: none;
}

.content{
    margin: 0 auto;
    overflow: auto;
    width: 90%;
    height: 85%;
}
::-webkit-scrollbar {
  display: none;
}
.content ul{
    display: flex;
    align-items: center;
    margin:10px auto;
   width: 80%;
    height: 10%;
}
.content li{
    font-weight: 600;
    float: left;
}
.content .round{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgb(147, 210, 243)
}

.content div{
    margin:0 auto;
   width: 80%;
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
}

</style>