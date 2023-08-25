<template>
  <div class="content">
    <div
      class="fileline"
      v-for="(n, index) in progress.slice((page - 1) * 5, 6)"
      :key="index"
    >
      <div class="e_picture">
        <img src="../../../assets/img/pdfPicture.png" />
        <li>{{ n.name }}</li>
      </div>
      <a class="see" v-bind:href="n.contentUrl" target=_blank>查看</a>
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
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";
export default {
  name: "ShowExamine3",
  setup() {
    const store = storeToRefs(getprogress());
    let progressx = store.progress;
    let progress = progressx.value;
    let page = ref(1);

    let pages = ref(store.length);

    const leave = function () {
      let item = document.querySelectorAll(".item");
      for (let i = 0; i < item.length; i++) {
        item[i].style.backgroundColor = "#4E99CA";
      }
      item[5].style.backgroundColor = "rgba(187, 187, 187, 100)";
      router.push("/main/annouce");
    };

    const handleCurrentChange = function (newPage) {
      page.value = newPage;
    };

    return {
      progressx,
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
  background-color: rgb(232, 232, 229);
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
  float: left;
  width: 30%;
  height: 100%;
}
.e_picture li {
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
  font-size: 15px;
}

.download {
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
  position: absolute;
  top: 80%;
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
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;

}
.mt-4 {
  /* position: absolute;
  top: 75%;
  left: 40%; */
}
</style>