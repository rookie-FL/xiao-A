<template>
  <div class="assess">
    <h1>考核信息</h1>
    <div class="progress">
      <h1 class="now">目前进度：</h1>
      <hr>
      <div class="all">
        <ul class="round">
          <li v-for="(item, index) in progressItems" :style="{ 'background-color': item.color }" :key="index"></li>
        </ul>
        <ul class="progress-text">
          <li v-for="(item, index) in progressItems" :key="index">{{ item.label }}: {{ item.score }}</li>
        </ul>
        <div class="pie-chart">
          <div class="inner-circle"></div>
        </div>
      </div>
    </div>
    <h1 class="set">进度设置</h1>

    <div class="progressSet">
      <ul>
        <li v-for="(item, index) in progressItems" :key="index">
  {{ item.label }}:
  <input
    type="number"
    v-model="item.score"
    :readonly="item.pass || item.fail"
    :max="100"
    placeholder="输入分数(0-100)"
    class="input"
  >
  <button @click="setChoice(item, 'fail')" :class="{ 'pass': !item.fail }" v-if="!item.fail && !item.pass">不通过</button>
  <button @click="setChoice(item, 'pass')" :class="{ 'pass': !item.pass }" v-if="!item.fail && !item.pass">通过</button>
  <span v-if="item.pass" class="span pass">已通过</span>
  <span v-if="item.fail" class="span fail">不通过</span>
</li>

        <hr>
      </ul>
    </div>
    <router-link :to="`/main/personnelMan`">
      <span class="return">返回</span>
    </router-link>
    <span class="sure" @click="submitAssessment">确定</span>
  </div>
</template>

<script>
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'; 
import { getList } from '@/store/personnelMan/personal';

export default {
  setup() {
        const index = useRoute().params.index;
        console.log(index)
        const get = getList();
        const gets = storeToRefs(get);
        const List = gets.list;
        const info = ref(List.value[index]);
        const openid = info._rawValue.openid;
        console.log(List._object.list[index + 1]);
    const progressItems = ref([
      { label: '一轮面试', key: 'interview1', color: 'rgba(15, 64, 245)', score: null, pass: false, fail: false },
      { label: '一轮考核', key: 'assessment1', color: 'rgba(15, 64, 245)', score: null, pass: false, fail: false },
      { label: '二轮考核', key: 'assessment2', color: 'rgba(147, 210, 243)', score: null, pass: false, fail: false },
      { label: '最终答辩', key: 'finalPresentation', color: 'rgba(147, 210, 243)', score: null, pass: false, fail: false }
    ]);

    const setChoice = (item, choice) => {
  
      item.pass = choice === 'pass';
      item.fail = choice === 'fail';
    };

    const submitAssessment = async () => {
      try {
    
        const token = localStorage.getItem('token');
        const scores = {};
    
        progressItems.value.forEach(item => {
          scores[item.key] = item.score !== null ? parseInt(item.score) : 0;
        });

       
        const requestBody = {
          openid: openid, 
          score: scores,
          pass: progressItems.value.every(item => item.pass),
          currentAssessId: info._rawValue.assess_id,
          NextAssessId:info._rawValue.assess_id,
        };

        
        const response = await axios.post(
          'http://119.29.250.245:8080/web/assess/pass',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': token,
            },
          }
        );

        if (response.status === 200) {
          console.log('考核信息成功上传');
        } else {
          console.error('考核信息上传失败');
        }
      } catch (error) {
        console.error('发生错误', error);
      }
    };

    return {
      progressItems,
      setChoice,
      submitAssessment,
    };
  },
};
</script>


<style scoped>
.return{
    display: block;
    color: #fff;
    background-color: rgba(64, 149, 229);
    width: 80px;
    height: 40px;
    position: relative;
    left: 500px;
    top:20px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
}

.sure{
    display: block;
    color: #fff;
    background-color: rgba(64, 149, 229);
    width: 80px;
    height: 40px;
    position: relative;
    left: 600px;
    top:-20px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
}

.assess {
    margin-left: 38%;
   
}

h1{
    color: rgba(89, 87, 87);
}

hr{
    color: rgba(207, 207, 207);
}

.progress {
    width: 90%;
    height: 230px;
    background-color: rgba(239, 239, 239);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.now{
    color: #111;
    margin-bottom: 10px;
}

.round li {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 18px;
    margin-bottom: 10px;
}

.round{
    display: flex;
    flex-direction: column;
    margin-top: 5px;
}

.progress-text {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.progress-text li {
  margin-top: 10px;
    margin-right: 20px;
    color: rgba(89, 87, 87);
}

.all{
    display: flex;
}

.pie-chart {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            position: relative;
            top: 20px;
            left: 300px;
            background: conic-gradient(
                from 0deg,
                rgba(22, 132, 252) 240deg,
                rgba(147, 210, 243) 240deg 360deg
            );
        }

        .inner-circle {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            position: absolute;
            background-color: rgba(239, 239, 239);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

.progressSet{
    width: 70%;
    height: 200px;
    background-color: rgba(239, 239, 239);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-left: 100px;
    margin-top: 10px;
    padding: 20px;
}

.progressSet ul li{
    margin-bottom: 10px;
    
}

.set{
    position: relative;
    left: 100px;
}

.input{
    background-color: #fff;
    height: 26px;
    padding-left: 10px;
    margin-right: 80px;
}

.pass{
    margin-left: 10px;
    width: 60px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.span{
    margin-left: 10px;
}
</style>
