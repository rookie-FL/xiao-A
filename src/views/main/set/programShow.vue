<template>
  <div class="swiper">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" alt="">
        <div>{{ slide.caption }}</div>
      </swiper-slide>
    </swiper>
  </div>
  <div>
    <button @click="fetchSwiperData">获取轮播图数据</button>
    <div v-if="responseData">
      <h2>接口返回的数据：</h2>
      <pre>{{ responseData }}</pre>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css'; 
import { ref } from 'vue';
import axios from 'axios';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
      },
      slides: [
        {
          image: '',
          caption: '第一张',
        },
        {
          image: '',
          caption: '第二张',
        },
      ],
      responseData: null,
    };
  },
  methods: {
  async fetchSwiperData() {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = '/web/swiper';

      // 定义Query参数
      const queryParams = {
        publish: false, // 你可以根据需要设置为true或false
      };

      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: queryParams, // 将Query参数添加到请求中
      });

      this.responseData = response.data;
      console.log('接口返回的数据：', response.data);
    } catch (error) {
      console.error('请求失败：', error);
    }
  },
},


};
</script>

 
  
  <style scoped>
 .swiper{
    height: 200px;
    width: 28%;
    margin-left: 110px;
 }
 img{
    display: block;
    width: 100%;
    height: auto;
 }
  </style>
  