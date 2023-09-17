<template>
    <div class="container">
        <img src="./后台背景图.png" alt="" class="backimg">
        <img src="./logo.jpg" alt="" class="logo">
        <div class="login-panel">
            <h1 class="title">小A招新后台管理系统</h1>
            <!-- 表单 -->
            <form>
                <div class="account">
                    <span class="iconfont icon-geren"></span>
                    <input v-model="formLabelName" class="input" placeholder="请输入账号" />
                </div>
                <div class="pwd">
                    <span class="iconfont icon-lock"></span>
                    <input v-model="formLabelPwd" class="input" placeholder="请输入密码" type="password" />
                </div>
            </form>
            <div class="wrapper">
                <el-checkbox v-model="isRemPwd" label="记住密码" size="large" class="controls" ></el-checkbox>
                <el-button type="primary" class="login-btn" @click="loginAction">登录</el-button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, watch,onBeforeMount } from "vue"
import { ElMessage } from "element-plus";
import { useLoginStore } from "@/store/login/login";

// 记住密码框是否勾选
const isRemPwd = ref(localStorage.getItem("isRemPwd" ?? false))
watch(isRemPwd, (newvalue) => {
    localStorage.setItem("isRemPwd", newvalue)
})
let formLabelName=''
let formLabelPwd=''
onBeforeMount(()=>{
    // 对账号密码进行初始化
formLabelName = ref(localStorage.getItem("name") ?? "")
formLabelPwd = ref(localStorage.getItem("password") ?? "")
})

const loginStore = useLoginStore()

function loginAction() {
    if (formLabelName.value && formLabelPwd.value) {
        // 判断是否要记住密码
        if (isRemPwd) {
            localStorage.setItem("name", formLabelName.value)
            localStorage.setItem("password", formLabelPwd.value)
        } else {
            localStorage.removeItem("name")
            localStorage.removeItem("password")
        }
        // 向服务器发送请求
        loginStore.loginAccountAction(formLabelName.value, formLabelPwd.value)
        ElMessage.success("登录成功")
    } else {
        ElMessage.error("请重新输入账号和密码")
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    position: relative;
}
.backimg {
    width: 100%;
    height: 100%;
    z-index: -1;
}
.logo{
    display: inline-block;
    widows: 400px;
    height: 400px;
    border-radius: 50%;
    position: absolute;
    left: 20%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.6;
}
@import url("/src/style/reset.css");
@import url('//at.alicdn.com/t/c/font_4230108_z3i9osq344.css');
.title {
    color: #509EE8;
    padding-top: 25px;
    font-size: 30px;
}

form {
    margin-top: 20px;
}

.login-panel {
    position: absolute;
    top: 50%;
    right: 150px;
    transform: translateY(-50%);
    width: 450px;
    height: 290px;
    border: 1px white solid;
    border-radius: 18px;
    text-align: center;
    background-color: rgb(219, 245, 253,0.3);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
input::-webkit-input-placeholder{   /* 使用webkit内核的浏览器*/
	font-weight: 600;
}
/* 自动填充背景色更改 */
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: rgb(99, 159, 234) !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

.controls {
    margin-top: 12px;
    
}
.icon-geren,.icon-lock{
    color: rgb(18, 150, 219);
    font-size: 30px;
}

.pwd,.account {
    margin-top: 15px;
    border-bottom: 1px solid rgb(190, 188, 188); 
    height: 50px;
    width: 350px;
    margin-left: 50px;
    text-align: left;
}
.input{
    margin-left: 60px;
    height: 100%;
    border: none; /* Remove the default border */
    outline: none; /* Remove the outline when focused (optional, for better visual) */
    font-size: 18px;
    font-weight: 500;
    background-color: transparent;
}
.login-btn {
    position: absolute;
    width: 80px;
    height: 36px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 18px;
    font-size: 17px;
    transition: all 0.5s;
}

.wrapper {
    position: relative;
    width: 300px;
    margin: 10px auto;
    text-align: left;
}
</style>