<template>
    <div class="swiper">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <!-- 这里是每个轮播项的内容 -->
          <img :src="slide.image" alt="">
          <div>{{ slide.caption }}</div>
        </swiper-slide>
      </swiper>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/swiper-bundle.css'; // 引入 Swiper 样式
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        swiperOptions: {
          // Swiper 的配置选项
          loop: true,
          pagination: {
            el: '',
          },
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
      };
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
  