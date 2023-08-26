<template>
  <h1>考核内容编辑</h1>
  <div class="edit-page">
    <h4>标题</h4>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <h4>附件</h4>
    <el-upload
      :action="uploadUrl"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess">
      <el-button>点击上传附件</el-button>
    </el-upload>

    <div v-if="uploadedFile">已上传的文件：{{ uploadedFile.name }}</div>
    <el-button type="primary" @click="leave">返回</el-button>
    <el-button type="primary" @click="save">发布</el-button>
  </div>
</template>


// Your component script setup
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; 
import uploadService from '@/service/editContent/uploadService'; 

const router = useRouter();
const store = useStore(); 

const title = ref('');

const handleBeforeUpload = (file) => {
  const fileType = file.type;
  if (fileType !== 'application/pdf') {
    return false;
  }
  return true;
};

const handleUploadSuccess = async (response) => {
  try {
    const uploadedFile = await uploadService.uploadFile(response.file); 
    store.dispatch('setUploadedFile', uploadedFile);
  } catch (error) {
    console.error(error);
  }
};

const save = () => {
  router.push('/main/contentEdit'); 
};

const leave = ()=>{
  router.push('/main/contentEdit')
}
</script>


<style>

</style>
