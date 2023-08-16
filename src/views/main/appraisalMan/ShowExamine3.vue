<template>
  <div class="content">

    <div class="fileline" v-for="(n,index) in progress" :key="index">
      <div class="e_picture">
        <img src="../../../assets/img/pdfPicture.png" >
        <li>{{ n.name }}</li>
      </div>
      <a class="see" v-bind:href="n.contentUrl">查看</a>
      <a class="download" v-bind:href="n.contentUrl" :download="n.name+'.pdf'">下载</a>
    </div>
   

    <div class="pageslist">

      <li style='font-family:"icomoon"'></li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li style='font-family: "icomoon"'></li>

    </div>

    <div class="edit">编辑</div>




  </div>
</template>

<script>
import { getprogress } from '@/store/appraisalMan/appraisalMan';
import {ref} from 'vue'
export default {
  name: "ShowExamine3",
  setup(){
const progress=ref(getprogress().progress)
return {
  progress
}
  }
}
</script>

<style scoped>
.content {
  position: relative;
  float: right;
  top: -90%;
  width: 50%;
  height: 90%;
  background-color: rgb(232, 232, 229);
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.fileline {
  margin: 15px auto;
  width: 90%;
  height: 10%;
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

.e_picture {
  float: left;
  width: 70%;
  height: 90%;
  background-color: white
}

.e_picture img{
  float: left;
  width: 30%;
  height: 100%;
}
.e_picture li{
  display: flex;
  align-items: center;
  float: left;
  width: 70%;
  height: 100%;
}

.see {
  display: flex;
  float: left;
  margin-left: 5%;
  align-items: center;

  width: 10%;
  height: 90%;
  color: rgba(11, 147, 234, 100);
  font-size: 15px
}

.download {
  display: flex;
  float: left;
  margin-left: 5%;

  align-items: center;
  width: 10%;
  height: 90%;
  color: rgba(11, 147, 234, 100);
  font-size: 15px
}

.pageslist{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 95%;
  height: 10%;

  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;

}

.pageslist li{
  display: flex;
  align-items: center;
  justify-content: center;
  margin:3% 5px;

  width: 6%;
  height: 50%;
  background-color: white;
}

.edit{
  position: relative;
top:5%;
left: 70%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 18%;
  height: 5%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);;

}


</style>