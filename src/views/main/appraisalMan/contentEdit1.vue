<template>
  <div>
    <div class="title-container">
      <h1>标题</h1>
      <input type="text" class="upinput">
    </div>
    <h1>附件</h1>
    <div :class="['drag', { 'drag-active': active }]" @click="openFileInput">
      <p class="drag-title">上传附件</p>
      <input type="file" @change="handleFileInput" style="display: none" ref="fileInput" multiple />
    </div>
    <div v-if="uploadedFiles.length > 0">
      <h2>上传附件</h2>
      <ul>
        <li v-for="file in uploadedFiles" :key="file.name">{{ file.name }}</li>
      </ul>
    </div>
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <h2>文件上传成功</h2>
        <p>恭喜！文件上传成功。</p>
      </div>
    </div>
    
  </div>
  <el-button type="primary" class="action-button1" @click="leave">返回</el-button>
    <el-button type="primary" class="action-button" @click="save">发布</el-button>
</template>

<script setup>
import { ref } from 'vue';
import { requests } from "@/service/request/index";
import router from "@/router";

const active = ref(false);
const fileInput = ref(null);
const uploadedFiles = ref([]);
const showSuccessModal = ref(false);

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileInput = (e) => {
  const files = Array.from(e.target.files);
  uploadFiles(files);
};

const uploadFiles = (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('file', file);
  });

  const token = localStorage.getItem('token');

  requests.post({
    url: '/web/assess/uploadfile', 
    data: formData,
    headers: {
      'token': token,
    },
  })
    .then(() => {
      showSuccessModal.value = true;
      setTimeout(() => {
        showSuccessModal.value = false; 
      }, 2000); 
    })
    .catch((error) => {
      console.error('文件上传失败:', error);
    });
};

const save = () => {
      router.push('/main/contentEdit');
    };

    const leave = () => {
      router.push('/main/contentEdit');
    };

</script>

<style lang="scss" scoped>
h1 {
  margin-left: 50px;

}

.upinput {
  width: 80%;
  height: 50px;
  margin-right: 100px;
  padding: 20px;
  border: 1px solid rgba(218, 218, 218);
  border-radius: 4px;
  float: right;
  cursor: pointer;
  margin-bottom: 20px; 
}
.drag {
  width: 80%;
  height: 100px;
  margin-right: 100px;
  padding: 20px;
  border: 1px solid rgba(218, 218, 218);
  border-radius: 4px;
  float: right;
  cursor: pointer;

  &-active {
    border: 1px dashed #2260FF;
  }

  &-title {
    font-size: 14px;
  }
}
.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
}

.title-container h1 {
  margin-right: 10px; 
  margin-top: -90px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
    }
  }
}
.action-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.action-button1 {
  position: fixed;
  bottom: 20px;
  right: 100px;
}
</style>
