<template>
  <div class="swiper">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" alt="">
        <div>{{ slide.caption }}</div>
        <div>{{ isHomeContent(slide) ? '首页内容' : slide.content }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import { requests } from '@/service/request';
import { anyToken } from '@/utils/anyToken';

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
      slides: [],
      responseData: null,
    };
  },
  created() {
    this.fetchSwiperData();
  },
  methods: {
    fetchSwiperData() {
      // requests.get({
      //   url: '/web/swiper?publish=true'
      // },
      // token=localStorage.getItem('token'),
      // )
    
      axios.get('https://la.hiles.cn/web/swiper?publish=true', { 
        // params: {
        //   publish: true,
        // },
        headers: {
          token: localStorage.getItem('token'),
          // "Content-Type": "application/json",
        },
      })
      .then(response => {
        this.slides = response.data;
        this.responseData = response.data;
        console.log('获取轮播图数据成功：', this.responseData);
      })
      .catch(error => {
        console.error('获取轮播图数据失败：', error);
      });
    },
    isHomeContent(slide) {
      return slide.title === '首页内容';
    },
  },
  mounted(){
  setTimeout(() => {
    console.log(this.slides);
  }, 500);
}
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
  