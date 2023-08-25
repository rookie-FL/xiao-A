const state = {
    uploadedFile: null,
  };
  
  const mutations = {
    setUploadedFile(state, file) {
      state.uploadedFile = file;
    },
    clearUploadedFile(state) {
      state.uploadedFile = null;
    },
  };
  
  const actions = {
    setUploadedFile({ commit }, file) {
      commit('setUploadedFile', file);
    },
    clearUploadedFile({ commit }) {
      commit('clearUploadedFile');
    },
  };
  
  const getters = {
    uploadedFile: (state) => state.uploadedFile,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  