import axios from 'axios'; 

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

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('/web/assess/uploadfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': 'your_token_here', 
      },
    });

    return response.data; 
  } catch (error) {
    throw error;
  }
};

