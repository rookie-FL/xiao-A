<template>
  <div class="carousel-container">
    <p v-if="slides.length === 0">正在加载轮播图数据...</p>
    <el-carousel :interval="5000" class="carousel">
      <el-carousel-item v-for="(slide, index) in slides" :key="index">
        <img :src="slide.url" alt="" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      slides: [],
    };
  },
  methods: {
    fetchSwiperData() {
      axios.get('https://la.hiles.cn/web/swiper?publish=false', { 
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(response => {
        this.slides = response.data.data;
        console.log(this.slides);
      });
    },
  },
  mounted() {
    this.fetchSwiperData();
  },
};
</script>

<style scoped>
.carousel-container {
  width: 60%;
  height: 30%; 
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: -20px;
}
.carousel {
  position: relative;
  width: 70%;
  margin: 0 auto;
}
.carousel-button {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
  border-radius: 50%;
  margin: 0 10px;
}
img.carousel-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

</style>
