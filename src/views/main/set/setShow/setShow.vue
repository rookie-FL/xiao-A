<template>
    <div class="big-box">
        <div class="add-title">展示设置/展示内容编辑</div>
        <div class="container">
            <div class="img-title">轮播图图片</div>
            <div v-for="(preview, index) in imagePreviews" :key="index" class="image-preview" :data-index="index">
                <img :src="preview">
                <div class="actions">
                    <!-- <div class="another" :data-index="index" @click="changeImg">
                    <button @click="uploadImage" class="ano-button">更换</button>
                    <input type="file" ref="imageInput1" accept="image/*" style="display: none" @change="handleImageChange">
                </div> -->
                    <div class="delete" :data-index="index" @click="deleteImg">删除</div>
                </div>
            </div>
            <label class="custom-file-input">
                <input type="file" ref="imageInput" accept="image/*" @change="handleImageChange" data-operate="add">
                <span class="add-icon">+</span>
            </label>

        </div>

        <div class="box">
            <div class="title">内容</div>
            <div class="inputs" v-for="(preview, index) in imagePreviews" :key="index">
                <el-input v-model="allText[index]" maxlength="15" :placeholder="viewTitle" show-word-limit type="text"
                    class="text" />
                <el-input v-model="allTextarea[index]" :rows="6" type="textarea" placeholder="输入内容" />
            </div>

            <div class="buttons">
                <el-button type="primary" style="background-color: white;">返回</el-button>
                <el-button type="primary" @click="save">暂存</el-button>
                <el-button type="primary" @click="comfirm">确定</el-button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { uploadFile } from '@/service/upload/upload';
import { setShow } from '@/service/upload/setShow'
import { ElMessage } from 'element-plus';
import { getShow } from '@/service/upload/getShow'

const imageInput = ref(null);
const imageInput1 = ref(null);
const imagePreviews = ref([]);
const imageFile = ref([])
const allText = ref([])
const allTextarea = ref([])
const imageText = ref([])
const getShowRes = ref([])
const viewTitle = `输入小标题${imagePreviews.value.length + 1}`

// const uploadImage = (event) => {
//     imageInput1.value.click(); // 触发文件输入框的点击事件
// };

onMounted(() => {
    // 获取轮播图数据
    getShow(true).then(res => {
        let obj
        for (let i = 0; i < res.data.length; i++) {
            getShowRes.value.push(res.data[i])
            allText.value.push(res.data[i].title)
            allTextarea.value.push(res.data[i].content)
            urls.value.push(res.data[i].url)
            imagePreviews.value.push(res.data[i].url)
            imageFile.value.push("")

            obj = {
                url: res.data[i].url,
                title: res.data[i].title,
                content: res.data[i].content
            }
            imageText.value.push(obj)
        }

    })

})

// 增加图片
const handleImageChange = (event) => {
    const operate = event.target.getAttribute('data-operate')
    const file = event.target.files[0];
    imageFile.value.push(file)
    const index = event.target.getAttribute('data-index')
    console.log("执行的操作是", operate);
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviews.value.push(e.target.result);
            allText.value.push("")
            allTextarea.value.push("")
            // if (operate === "add") {
            //     imagePreviews.value.push(e.target.result);
            //     allText.value.push("")
            //     allTextarea.value.push("")
            // } else {
            //     imagePreviews.value[index] = e.target.result;
            // }

        };
        reader.readAsDataURL(file);
    }
};

// 删除图片
function deleteImg(event) {
    const index = event.target.getAttribute('data-index')
    imagePreviews.value.splice(index, 1)
    imageFile.value.splice(index, 1)
    allText.value.splice(index, 1)
    allTextarea.value.splice(index, 1)

    imageText.value.splice(index, 1)
}

let urls = ref([])

// 暂存内容
async function save() {
    let obj
    for (let i = 0; i < imageFile.value.length; i++) {
        if (imageFile.value[i]) {
            await uploadFile(imageFile.value[i]).then(res => {
                urls.value.push(res.data)
                obj = {
                    url: res.data,
                    title: allText.value[i],
                    content: allTextarea.value[i]
                }
                imageText.value.push(obj)
            })
        }

    }
    await setShow(imageText.value, false).then(res => {
        ElMessage.success("暂存成功")
    }).catch(res => {
        ElMessage.error("暂存失败")
    })
}

// 确定保存
async function comfirm() {
    console.log("目前图片的数量", imageFile.value.length);
    let obj
    for (let i = 0; i < imageFile.value.length; i++) {
        if (imageFile.value[i]) {
            console.log("=======================存储图片");
            await uploadFile(imageFile.value[i]).then(res => {
                urls.value.push(res.data)
                obj = {
                    url: res.data,
                    title: allText.value[i],
                    content: allTextarea.value[i]
                }
                imageText.value.push(obj)
            })
        }
    }
    await setShow(imageText.value, true).then(res => {
        ElMessage.success("保存成功")
    }).catch(res => {
        ElMessage.error("保存失败")
    })
}


</script>

<style>
.add-title {
    font-weight: 700;
    margin-bottom: 20px;
}

/* 轮播图图片的部分 */
.container {
    margin-bottom: 30px;
}

.custom-file-input {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 200px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #F4F5F5;
}

.custom-file-input input[type="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
}

.container {
    display: flex;
}

.img-title {
    font-weight: 700;
    margin-right: 30px;
}

.add-icon {
    position: absolute;
    font-size: 50px;
    top: 50%;
    left: 50%;
    color: gray;
    transform: translate(-50%, -50%);
}

.actions {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 30%;
    line-height: 1.5;
    bottom: 0;
    color: rgba(255, 255, 255, .9);
    font-size: 14px;
    border-radius: 0 6px 0 0;
    background-color: rgba(0, 0, 0, .5);
}

.ano-button {
    border: none;
    color: rgba(255, 255, 255, .9);
    background-color: transparent;
}

.actions div {

    width: 100%;
    text-align: center;
}

.actions div:hover {
    cursor: pointer;
}

.image-preview {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 6px;
    margin-right: 17px;
}

.image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


/* 内容部分 */
.box {
    position: relative;
}

.box .title {
    font-weight: 700;
}

.inputs textarea,
.inputs .text {
    margin: 10px 0 10px 20px;
    resize: none;
}

.inputs textarea {
    margin-bottom: 40px;
}

.buttons {
    position: absolute;
    right: 70px;
    bottom: -5px;
}

.buttons button {
    border: #ccc;
    background-color: white;
    color: gray;
    margin-right: 10px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    /* 边框阴影 */
}
</style>
  