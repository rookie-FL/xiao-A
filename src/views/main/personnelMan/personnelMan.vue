<template>
   <router-view></router-view>
  <div class="c_member" style="width: 100%;height: 90%;" v-if="$route.matched[$route.matched.length-1].meta.show">
    <Breadcrumb></Breadcrumb>
    <div class="SelectMember">
      <ul>
        <li>姓名</li>
        <input type="text" placeholder="输入姓名" v-model="spot.name" />
      </ul>
      <ul>
        <li>学院</li>
        <input type="text" placeholder="输入学院" v-model="spot.college" />
      </ul>
      <ul>
        <li>年级</li>
        <input type="text" placeholder="输入年级" v-model="spot.grade" />
      </ul>
      <ul>
        <li>专业</li>
        <input type="text" placeholder="输入专业" v-model="spot.major" />
      </ul>
      <ul>
        <li>组别</li>
        <select name="" id="" v-model="spot.groupOption">
          <option value="">选择组别</option>
          <option value="0">后台组</option>
          <option value="1">前端组</option>
          <option value="2">Al组</option>
          <option value="3">运维组</option>
          <option value="4">机械组</option>
          <option value="5">电控组</option>
        </select>
      </ul>
      <ul>
        <li>进度</li>
        <select name="" id="" v-model="spot.assessIndex" :disabled="disabled">
          <option value="">选择进度</option>
          <option value="笔试">笔试</option>
          <option value="面试">面试</option>
          <option value="一轮">一轮</option>
          <option value="二轮">二轮</option>
          <option value="三轮">三轮</option>
          <option value="通过">通过</option>
        </select>
      </ul>
      <ul>
        <li>排序</li>
        <select name="" id="" v-model="spot.sort" :disabled="disabled">
          <option value="">选择排序</option>
          <option value="0">按总分降序</option>
          <option value="1">按总分升序</option>

        </select>
      </ul>
    </div>

    <div class="datafun">
      <a class="output" @click="output" v-bind:href="href" download="2023年小A工作室考核信息.xlsx">数据导出</a>
      <div class="clean">数据清空</div>
    </div>

    <div class="M_data">
      <ul class="headtitle">
        <li>序号</li>
        <li>姓名</li>
        <li>学院</li>
        <li style="width:20%">年级专业班级</li>
        <li>组别</li>
        <li>目前进度</li>
        <li>电话号码</li>
        <li v-if="isShow">总分</li>
        <li>操作</li>
      </ul>
      <ul v-for="(n, index) in List" :key="index">
        <li>{{ index + 1 }}</li>
        <li>{{ n.name }}</li>
        <li>{{ n.college }}</li>
        <li style="width:20%">{{ n.grade + n.major }}</li>
        <li>{{ n.group_option }}</li>
        <li>{{ n.currentAssess }}</li>
        <li>{{ n.phone }}</li>
        <li v-if="isShow">{{ n.scores[0].score }}</li>
          <li style="color: rgb(11, 147, 234); cursor: pointer;" @click="goToInfoView(index)">查看</li>
      </ul>
    </div>
    <div class="M_pages">
      <div>
        <li>共{{ length }}页</li>
        <li>《</li>
        <li v-for="(i, index) in length" :key="index" @click="changepage(index + 1)">{{ index + 1 }}</li>
        <li>》</li>
        <li>前往</li>
        <input type="text" class="choosenumber" v-model="searchpage" />
        <li>页</li>
      </div>
    </div>
  </div>
</template>

<script>



import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getList } from '@/store/personnelMan/personal';
import { storeToRefs } from 'pinia';
import { ElMessage } from "element-plus";
import Breadcrumb from '../Breadcrumb.vue';



export default {
  name: 'personnelMen',
  components:{
    Breadcrumb
  },
  setup() {
    let spot = reactive({
      assessIndex: '',
      name: '',
      college: '',
      major: '',
      groupOption: '',
      assessld: '',
      sort: '',
      page: '1',
      size: 10,
    });

    let List;
    let length;
    let searchpage = ref(1);
    let isShow = ref(false);
    let disabled = ref(true);
    
    const get = getList();
    const gets = storeToRefs(get);
    get.excel();
    get.getlength();
    get.getList(
      spot.page,
      spot.size,
      spot.groupOption,
      spot.assessIndex,
      spot.name,
      spot.college,
      spot.major,
      spot.assessld
    );
    const href = gets.gethref;
    List = gets.list;
    console.log(List);
    length = Math.ceil(gets.length.value / 10);
    const route = useRoute();
    const router = useRouter();
    const goToInfoView = (index) => {
      router.push(`/main/infoView/${index}`);
    };

    //路由切换
    if (route.params.group != undefined) {
      spot.groupOption = route.params.group
      isShow.value = true; disabled.value = false
    }

    const changepage = function (page) {
      spot.page = page
    }
    //筛选监控
    watch(spot, (a) => {
      get.getList(spot.page, spot.size, spot.groupOption, spot.assessIndex, spot.name, spot.college, spot.major, spot.assessld, spot.sort)
      if (spot.groupOption != '') { isShow.value = true; disabled.value = false } else { isShow.value = false; disabled.value = true }
    },
      { deep: true },
    )

  
    //检查收搜索页格式
    watch(searchpage, (newValue) => {
      if (isNaN(newValue) == false && newValue != '' && newValue != 0) {
        spot.page = newValue
      }
      else if (newValue != '') {
        ElMessage.error('页数搜索格式不正确')
      }

    })

    watch(searchpage, (newValue) => {
      if (newValue != '') {
        spot.page = newValue;
      }
    });

    return {
      spot,
      List,
      href,
      length,
      changepage,
      searchpage,
      isShow,
      disabled,
      href,
      get,
      goToInfoView,
    };
  },
};



//   methods: {
// //导出excel


//     //数据筛选
//     // meet() {
//     //   this.pages = 1;
//     //   this.inforx = this.infor.filter((p) => {
//     //     return (
//     //       p.name.indexOf(this.spot.name) != -1 &&
//     //       p.college.indexOf(this.spot.college) != -1 &&
//     //       p.majorandclass.indexOf(this.spot.grade) != -1 &&
//     //       p.majorandclass.indexOf(this.spot.major) != -1 &&
//     //       p.group.indexOf(this.spot.group) != -1 &&
//     //       p.progress.indexOf(this.spot.progress) != -1 &&
//     //       p.name.indexOf(this.spot.sort) != -1
//     //     );
//     //   });
//     // },


</script>

<style scoped>
.c_member {
  width: 100%;
  height: 100%;
}

input {
  margin-left: 15px;
}

select {
  margin-left: 15px;
}

.SelectMember {
  display: flex;
  flex-flow: wrap;
  margin: 0 auto;
  width: 90%;
  height: 15%;

  border-width: 0px 0px 2px 0px;
  border-color: rgba(187, 187, 187, 100);
  border-style: solid;
}

.SelectMember ul {
  width: 20%;
  margin-left: 5%;
}

.SelectMember li {
  display: inline-block;
}

.SelectMember input {
  width: 50%;

  display: inline-block;
}

.SelectMember select {
  display: inline-block;
  width: 50%;
  height: 25px;

  border-radius: 5px;
}

.datafun {
  margin: 0 auto;
  width: 90%;
  height: 10%;
}

.datafun div,
.datafun a {
  float: right;
  margin-top: 20px;

  width: 8%;

  color: white;
  line-height: 30px;
  border-radius: 10px;
  text-align: center;
}

.clean {
  margin-right: 20px;
  background-color: rgba(129, 179, 55, 100);
}

.output {
  background-color: rgba(247, 175, 98, 100);
}

.M_data {
  margin: 0 auto;
  width: 90%;
  height: 50%;
}

.M_data ul {
  display: flex;
  margin: 1% auto;
  align-items: center;
  overflow: hidden;
  width: 100%;
}

.headtitle {
  height: 40px;
  color: white;
  background-color: rgba(11, 147, 234, 100);
}

.M_data li {
  width: 15%;
  text-align: center;
}

.M_pages {
  margin: 10% auto;
  overflow: hidden;
  width: 90%;
}

.M_pages li {
  user-select: none;
  margin: 0 5px;
  float: left;
}

.M_pages input {
  float: left;
  width: 20px;
  text-align: center;
}

.M_pages div {
  float: right;
}

select {
  outline-style: none;
}

</style>