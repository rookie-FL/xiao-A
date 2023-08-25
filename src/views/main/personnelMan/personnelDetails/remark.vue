<template>
  <div>
    <h1 class="remark">备注</h1>
    <div class="note-input">
      <textarea v-model="note" placeholder="备注"></textarea>
      <button @click="addRemark">添加备注</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NoteInput",
  data() {
    return {
      note: "", // 存储备注文本
    };
  },
  methods: {
    addRemark() {
      const token = "your_token"; 
      const openid = "student_openid_here";

      const requestBody = {
        remark: this.note,
      };

      axios
        .post("http://your_api_url/web/user/remark?openid=" + openid, requestBody, {
          headers: {
            "Content-Type": "application/json",
            "token": token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("备注添加成功");
          } else {
            console.error("备注添加失败");
          }
        })
        .catch((error) => {
          console.error("发生错误", error);
        });
    },
  },
};
</script>


<style scoped>
.note-input {
  width: 40%;
  height: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgba(239, 239, 239); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.remark{
  color: rgba(89, 87, 87);
  margin-top: 10px;
  margin-bottom: 10px;
}

textarea {
  width: 98.5%;
  height: 96%;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 14px;
}
</style>
