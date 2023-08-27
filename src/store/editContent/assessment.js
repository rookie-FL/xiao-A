import { defineStore } from 'pinia';

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    uploadedFile: null,
    title: '',
  }),
  actions: {
    setUploadedFile(fileData) {
      this.uploadedFile = fileData;
    },
    setTitle(title) {
      this.title = title;
    },
  },
});
