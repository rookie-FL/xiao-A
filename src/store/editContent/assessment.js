import { defineStore } from 'pinia';
import { assessmentService } from '@/service/editContent/assessment';

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    uploadedFile: null,
    title: '',
  }),
  actions: {
    async setUploadedFile(fileData) {
      try {
        const response = await assessmentService.uploadFile(fileData);

      
        this.uploadedFile = response.uploadedFile;
        this.title = response.title;

      } catch (error) {
        console.error(error);
      }
    },
    setTitle(title) {
      this.title = title;
    },
  },
});
