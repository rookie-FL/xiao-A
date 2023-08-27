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

    <div v-if="uploadedFile">已上传的文件：{{ uploadedFile }}</div>
    <el-button type="primary" @click="leave">返回</el-button>
    <el-button type="primary" @click="save">发布</el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAssessmentStore } from '@/store/editContent/assessment';

export default {
  setup() {
    const router = useRouter();
    const store = useAssessmentStore();

    const title = ref('');
    const uploadedFile = ref(null);

    const handleUploadSuccess = async (response) => {
      try {
        const uploadedFileData = await uploadFile(response.file);
        uploadedFile.value = uploadedFileData;

        store.setUploadedFile(uploadedFileData);
        store.setTitle(title.value);
      } catch (error) {
        console.error(error);
      }
    };

    const save = () => {
      router.push('/main/contentEdit');
    };

    const leave = () => {
      router.push('/main/contentEdit');
    };

    return {
      title,
      uploadedFile,
      handleUploadSuccess,
      save,
      leave,
    };
  },
};
</script>




<style>

</style>
