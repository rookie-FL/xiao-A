<template>
  <div class="content">
    <div
      class="fileline"
      v-for="(n, index) in progress.slice(0+(page-1)*7,6+(page-1)*6)"
      :key="index"
    >
      <div class="e_picture">
        <img src="../../../assets/img/pdfPicture.png" />
        <li>{{ n.name }}</li>
      </div>
      <a class="see" v-bind:href="n.contentUrl" target=_blank style="{color:}">查看</a>
      <a class="download" v-bind:href="n.contentUrl" :download="n.name + '.pdf'"
      target=_blank>下载</a
      >
    </div>
<div class="page">
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="Math.ceil(pages) * 10"
      class="mt-4"
      @current-change="handleCurrentChange"
      :current-page="page"
    />
    </div>

    <div class="edit" @click="leave">编辑</div>
  </div>
</template>

<script>
import { getprogress } from "@/store/appraisalMan/appraisalMan";
import { reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";

export default {
  name: "ShowExamine3",
  setup() {
  const store = storeToRefs(getprogress());
  let progress = store.progress.value
    let page = ref(1);
    let pages = ref(store.length);


    const leave = function () {
      router.push("/main/contentEdit");
    };

    const  handleCurrentChange = function (newPage) {
      page.value = newPage;

    };

    return {
      progress,
      pages,
      page,
      handleCurrentChange,
      leave,
    };
  },
};


</script>

<style scoped>
.content {
  position: relative;
  float: right;
  top: -90%;
  width: 50%;
  height: 90%;
  background-color: rgb(240, 240, 240);
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.fileline {
  margin: 10px auto;
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
  background-color: white;
}

.e_picture img {
margin-left: 50px;
  float: left;
  width: 20%;
  height: 100%;
}
.e_picture li {
  display: flex;
  align-items: center;
  height: 100%;
}

a{
  display: flex;
  float: left;
  margin-left: 5%;
  align-items: center;
  width: 10%;
  height: 90%;
  color: rgba(11, 147, 234, 100);
  font-size: 15px;

}

.edit {
  cursor: pointer;
  position: absolute;
  top: 90%;
  left: 70%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 18%;
  height: 5%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.page{
  position: absolute;
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  top: 80%;

}
.mt-4 {
  /* position: absolute;
  top: 75%;
  left: 40%; */
}
</style>