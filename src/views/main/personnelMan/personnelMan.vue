<template>
  <router-view></router-view>
  <div
    class="c_member"
    style="width: 100%; height: 90%"
    v-if="$route.matched[$route.matched.length - 1].meta.show"
  >
    <Breadcrumb></Breadcrumb>
    <div class="SelectMember">
      <el-form label-position="left">
        <el-row :span="20" gutter="20">
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input
                type="text"
                placeholder="输入姓名"
                v-model="spot.name"
                clearbale="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学院">
              <el-input
                type="text"
                placeholder="输入学院"
                v-model="spot.college"
                clearbale="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年级">
              <el-input
                type="text"
                placeholder="输入年级"
                v-model="spot.grade"
                clearbale="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="专业">
              <el-input
                type="text"
                placeholder="输入专业"
                v-model="spot.major"
                clearbale="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20" gutter="15">
          <el-col :span="7">
            <span class="selecttitle">组别</span>
            <el-select
              v-model="spot.groupOption"
              clearable
              placeholder="选择组别"
            >
              <el-option value="">选择组别</el-option>
              <el-option value="后台组">后台组</el-option>
              <el-option value="前端组">前端组</el-option>
              <el-option value="AI组">AI组</el-option>
              <el-option value="运维组">运维组</el-option>
              <el-option value="机械组">机械组</el-option>
              <el-option value="电控组">电控组</el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <span class="selecttitle">进度</span>
            <el-select
              v-model="spot.assessIndex"
              clearable
              placeholder="选择进度"
              :disabled="disabled"
            >
              <el-option value="">选择进度</el-option>
              <el-option
                v-for="(n, index) in process.data"
                :key="index"
                :value="n.name"
                >{{ n.name }}</el-option
              >
            </el-select>
          </el-col>
          <el-col :span="7">
            <span class="selecttitle">排序</span>
            <el-select
              v-model="spot.sort"
              clearable
              placeholder="选择排序"
              :disabled="disabled"
            >
              <el-option value="">选择排序</el-option>
              <el-option value="按总分降序">按总分降序</el-option>
              <el-option value="按总分升序">按总分升序</el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="datafun">
      <a
        class="output"
        @click="output"
        v-bind:href="href"
        download="2023年小A工作室考核信息.xlsx"
        >数据导出</a
      >
    </div>
    <div class="M_data">
      <ul class="headtitle">
        <li>序号</li>
        <li>姓名</li>
        <li>学院</li>
        <li style="width: 20%">年级专业班级</li>
        <li>组别</li>
        <li>目前进度</li>
        <li>电话号码</li>
        <li v-if="isShow">总分</li>
        <li>操作</li>
      </ul>
      <ul v-for="(n, index) in List" :key="index" class="people">
        <li>{{ index + 1 }}</li>
        <li>{{ n.name }}</li>
        <li>{{ n.college }}</li>
        <li style="width: 20%">{{ n.grade + n.major }}</li>
        <li>{{ n.group_option }}</li>
        <li>{{ n.currentAssess }}</li>
        <li>{{ n.phone }}</li>
        <li v-if="isShow">{{ n.scores[0].score }}</li>
        <li
          style="color: rgb(11, 147, 234); cursor: pointer"
          @click="goToInfoView(index, n)"
        >
          查看
        </li>
      </ul>
    </div>
    <div class="M_pages">
      <div>
        <li>前往</li>
        <input type="text" class="choosenumber" v-model="searchpage" />
        <li>页</li>
      </div>
      <div>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="Math.ceil(pages) * 10"
          class="mt-4"
          @current-change="handleCurrentChange"
          :current-page="spot.page"
        />
      </div>
      <div>
        <li>共{{ pages }}页</li>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getList } from "@/store/personnelMan/personal";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import Breadcrumb from "../Breadcrumb.vue";

export default {
  name: "personnelMen",
  components: {
    Breadcrumb,
  },
  setup() {
    let spot = reactive({
      assessIndex: "",
      name: "",
      college: "",
      major: "",
      groupOption: "",
      assessld: "",
      sort: "",
      page: "1",
      size: 10,
    });

    let List;
    let process;
    let length;
    let pages;
    let searchpage = ref(1);
    let isShow = ref(false);
    let disabled = ref(true);
    // 格式转换
    function valueToNumber(value) {
      if (value == "后台组" || value == "笔试" || value == "按总分升序") {
        return 0;
      } else if (
        value == "前端组" ||
        value == "面试" ||
        value == "按总分降序"
      ) {
        return 1;
      } else if (value == "AI组" || value == "一轮") {
        return 2;
      } else if (value == "运维组" || value == "二轮") {
        return 3;
      } else if (value == "机械组" || value == "三轮") {
        return 4;
      } else if (value == "电控组" || value == "通过") {
        return 5;
      } else if (value == "") {
        return "";
      }
    }

    // const get = getList();
    const get = getList();
    const gets = storeToRefs(get);

    let {
      page,
      size,
      groupOption,
      assessIndex,
      name,
      college,
      major,
      assessld,
      sort,
    } = spot;
    get.getList(
      page,
      size,
      valueToNumber(groupOption),
      valueToNumber(assessIndex),
      name,
      college,
      major,
      assessld,
      valueToNumber(sort)
    );
    get.excel();
    pages = gets.pages;
    const href = gets.gethref;
    List = gets.list;
    get.getProcess(groupOption);
    process = gets.process;
    const route = useRoute();
    const router = useRouter();
    const goToInfoView = (index, n) => {
      let info = toRaw(n);
      let stringInfo = JSON.stringify(info);
      router.push({
        path: `/main/infoView/${index}`,
        query: { stringInfo: stringInfo },
      });
    };

    //路由切换
    if (route.params.group != undefined) {
      spot.groupOption = route.params.group;
      isShow.value = true;
      disabled.value = false;
    }

    const changepage = function (page) {
      spot.page = page;
    };
    //筛选监控
    watch(
      spot,
      (newValue) => {
        let {
          page,
          size,
          groupOption,
          assessIndex,
          name,
          college,
          major,
          assessld,
          sort,
        } = spot;

        get.getList(
          page,
          size,
          valueToNumber(groupOption),
          valueToNumber(assessIndex),
          name,
          college,
          major,
          assessld,
          valueToNumber(sort)
        );

        if (spot.groupOption != "") {
          isShow.value = true;
          disabled.value = false;
        } else {
          isShow.value = false;
          disabled.value = true;
        }
      },
      { deep: true }
    );

    //检测更新流程
    watch(
      () => spot.groupOption,
      (newValue) => {
        get.getProcess(valueToNumber(newValue));
      },
      { deep: true }
    );

    // 页面更新
    const handleCurrentChange = function (newPage) {
      spot.page = newPage;
    };

    //检查收搜索页格式
    watch(searchpage, (newValue) => {
      if (isNaN(newValue) == false && newValue != "" && newValue > 0) {
        spot.page = newValue;
      } else {
        ElMessage.error("页数搜索格式不正确");
      }
    });

    watch(searchpage, (newValue) => {
      if (newValue != "") {
        spot.page = newValue;
      }
    });

    return {
      spot,
      pages,
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
      process,
      handleCurrentChange,
    };
  },
};
</script>

<style scoped>
.c_member {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
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

.people {
  border-bottom: 1px solid rgb(236, 238, 245);
  height: 35px;
  transition: all 0.5s;
}
.people:hover {
  background-color: rgb(243, 243, 243);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 2;
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
.selecttitle {
  font-size: 14px;
  color: rgb(96, 98, 102);
  font-weight: 600;
  margin-right: 15px;
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

.output {
  background-color: rgba(238, 208, 156);
  transition: all 0.4s;
}
.output:hover {
  background-color: rgb(221, 161, 51);
}
.M_data {
  margin: 0 auto;
  width: 90%;
  height: 50%;
}

.M_data ul {
  display: flex;
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
  color: black;
  transition: all 0.5s;
  margin: 10% auto;
  overflow: hidden;
  width: 90%;
}
.M_pages:hover {
  color: rgb(169, 171, 178);
}

.M_pages li {
  cursor: pointer;
  user-select: none;
  margin: 5px 10px;
  float: left;
}

.M_pages input {
  float: left;
  width: 20px;
  text-align: center;
  margin: 5px 0px;
  border-radius: 4px;
}
.M_pages input:hover {
  outline-color: rgb(169, 171, 178);
  color: rgb(169, 171, 178);
}
.M_pages div {
  float: right;
}
</style>