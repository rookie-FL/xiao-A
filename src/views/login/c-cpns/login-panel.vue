<template>
    <div class="login-panel">
        <h1 class="title">小A招新后台管理系统</h1>

        <!-- 表单 -->
        <form>
            <div class="account">
                <input v-model="formLabelName" class="single-line-input" placeholder="请输入账号" />
            </div>
            <div class="pwd">
                <input v-model="formLabelPwd" class="single-line-input" placeholder="请输入密码" type="password" />
            </div>
        </form>

        <div class="wrapper">
            <el-checkbox v-model="isRemPwd" label="记住密码" size="large" class="controls"></el-checkbox>
            <el-button type="primary" class="login-btn" @click="loginAction">登录</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { ElMessage } from "element-plus";
import { useLoginStore } from "@/store/login/login";

// 记住密码框是否勾选
const isRemPwd = ref(localStorage.getItem("isRemPwd" ?? false))
watch(isRemPwd, (newvalue) => {
    localStorage.setItem("isRemPwd", newvalue)
})

// 对账号密码进行初始化
let formLabelName = ref(localStorage.getItem("name") ?? "")
let formLabelPwd = ref(localStorage.getItem("password") ?? "")
const loginStore = useLoginStore()

function loginAction() {
    console.log("点击登录", formLabelName.value);
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
    } else {
        ElMessage.error("请重新输入账号和密码")
    }
}
</script>


<style scoped>
@import url("/src/style/reset.css");
@import url("/src/style/common.css");

.title {
    color: #509EE8;
    padding-top: 30px;
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
    border: 2px white solid;
    border-radius: 18px;
    text-align: center;
}

.controls {
    margin-top: 12px;
}

.pwd {
    margin-top: 15px;
}

.login-btn {
    position: absolute;
    width: 80px;
    height: 36px;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 18px;
    font-size: 17px;
}

.wrapper {
    position: relative;
    width: 300px;
    margin: 10px auto;
    text-align: left;
}
</style>