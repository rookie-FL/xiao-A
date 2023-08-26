import { createStore } from 'vuex';
import assessmentModule from './getContent';

export default createStore({
  modules: {
    assessment: assessmentModule,
  },
});
