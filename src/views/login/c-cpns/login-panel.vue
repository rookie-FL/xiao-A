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
import { ref } from "vue"
import { ElMessage } from "element-plus";

const isRemPwd = ref(false)
let formLabelName = ref("")
let formLabelPwd = ref("")

function loginAction() {
    console.log("点击登录");
    if (formLabelName.value && formLabelPwd.value) {
        console.log("登录成功");
    } else {
        ElMessage.error("请重新输入账户和密码")
    }
}
</script>


<style scoped>
@import url("element-plus/theme-chalk/el-message.css");
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