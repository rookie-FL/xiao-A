import axios from 'axios'; 

const handleUploadSuccess = async (response) => {
  try {
    const uploadedFileData = await uploadFile(response.file);
    store.setUploadedFile(uploadedFileData);

    // 显示上传成功消息
    ElMessage.success('文件上传成功');
  } catch (error) {
    console.error(error);
  }
};


const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('/web/assess/uploadfile', formData, {
      headers: {
        "Content-Type": "application/json",
        'token': token,
      },
    });
    

    return response.data; 
  } catch (error) {
    throw error;
  }
};
export const assessmentService = {
  uploadFile,
};
