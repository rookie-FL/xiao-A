<template>
    
  <div class="condition">
    <div class="M_data">
      <ul class="headtitle">
        <li>考核</li>
        <li>通过人数</li>
        <li>通过率</li>
        <li>通过人员名单</li>
      </ul>
      <ul v-for="(n, index) in condition" :key="index">
        <li style="font-size: 15px">{{ n.exam }}</li>
        <li style="font-size: 15px">{{ n.person }}</li>
        <li style="font-size: 15px">{{ n.ratio }}</li>
        <li style="color: rgba(11, 147, 234, 100); font-size: 15px">查看</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowExamine2",
  data() {
    return {
      condition: [
        { exam: "笔试", person: "15", ratio: "20%" },
        { exam: "一轮面试", person: "0", ratio: "0%" },
        { exam: "一轮考核", person: "0", ratio: "0%" },
        { exam: "二轮考核", person: "0", ratio: "0%" },
        { exam: "最终答辩", person: "0", ratio: "0%" },
      ],
    };
  },
};
</script>

<style scoped>
.condition {
  width: 47.5%;
  height: 42.5%;
  background-color: rgb(232, 232, 229);
  border-radius: 15px;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(187, 187, 187, 100);
}

.M_data {
  margin: 0px auto;
  width: 90%;
  height: 80%;
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

.M_data ul {
  overflow: hidden;
  width: 100%;
  padding-inline-start: 0px;
}

.headtitle {
  height: 15%;
  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}


.M_data li {
  margin-top: 1%;
  float: left;
  width: 20%;
  text-align: center;
}

.condition .M_data li {
  width: 25%;
}
</style>