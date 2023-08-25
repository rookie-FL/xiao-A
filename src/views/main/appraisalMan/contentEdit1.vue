<template>
  <div class="edit-page">
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <el-upload
  :action="uploadUrl"
  :before-upload="handleBeforeUpload"
  :on-success="handleUploadSuccess">
  <el-button>点击上传附件</el-button>
</el-upload>


    <el-button type="primary" @click="save">发布</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref('');
const uploadUrl = '/web/assess/uploadfile'; // 替换为实际的上传接口地址

const handleBeforeUpload = (file) => {
  const fileType = file.type;
  if (fileType !== 'application/pdf') {
    // 不是 PDF 文件，阻止上传
    return false;
  }
  return true;
};

const save = () => {
  // 保存逻辑，包括标题和上传的附件
  // 保存完成后跳转回列表页面
  router.push('/main/contentEdit'); // 替换为您的列表页面路径
};
</script>

<style>
/* 添加样式以适应您的需求 */
</style>
