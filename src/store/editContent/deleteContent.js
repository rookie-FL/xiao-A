import { deleteAssessment } from '@/service/deleteContent';

const actions = {
  async deleteAssessment({ dispatch }, id) {
    try {
    //   const token = 'your_token'; 
      const response = await deleteAssessment(id, token);

      if (response.ok) {
        console.log('考核流程删除成功');
        dispatch('fetchAssessments'); 
      } else {
        console.error('删除失败');
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  },
};

export default {
  actions,
};
