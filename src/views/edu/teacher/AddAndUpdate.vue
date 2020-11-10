<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="120px">
      <el-form-item label="讲师ID" hidden>
        <el-input v-model="teacher.id" />
      </el-form-item>
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" placeholder="请选择讲师级别">
          <!-- TODO 通过数据字典显示列表 -->
          <el-option label="特级讲师" value="0" />
          <el-option label="一级讲师" value="1" />
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历" label-width="120px">
        <el-input v-model="teacher.career" />
      </el-form-item>

      <el-form-item label="讲师简介" label-width="120px">
        <el-input v-model="teacher.intro" type="textarea" />
      </el-form-item>
      <!-- 讲师头像 TODO -->
      <el-form-item label="讲师头像" label-width="120px">
        <!-- 头像缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像</el-button
        >
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/oss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateTeacher, saveTeacher, getTeacher } from "@/api/edu/teacher";
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";

export default {
  components: { PanThumb, ImageCropper },
  data() {
    return {
      teacher: {
        id: "",
        name: "",
        sort: 1,
        level: 0,
        intro: "",
        career: "",
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API,
      file: "",
    };
  },
  //页面渲染前调用该方法
  created() {
    //判断路由中是否包含id参数，如果包含则表示编辑请求
    this.init();
  },
  //监听
  watch: {
    $route(to, from) {
      //路由变化方式，路由发生变化是执行该方法
      this.init();
    },
  },
  methods: {
    //上传图像对话框关闭事件
    close() {
      this.imagecropperShow = false;
      //上传组件复原
      this.imagecropperKey = this.imagecropperKey + 1; //刷新id
    },
    //上传成功事件
    cropSuccess(data) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1; //刷新id
      //crop封装的上传图片成功后返回后的数据
      this.teacher.avatar = data.url;
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        //从路径中获取id的值
        const id = this.$route.params.id;
        this.getTeacherInfo(id);
      } else {
        //清空表单
        this.teacher = {};
      }
    },

    getTeacherInfo(id) {
      getTeacher(id)
        .then((response) => {
          this.teacher = response.data.teacher;
          console.log(this.teacher);
        })
        .catch((error) => {});
    },
    onSubmit() {
      //判断是创建还是更新
      if (this.$route.params && this.$route.params.id) {
        updateTeacher(this.teacher)
          .then((response) => {
            //跳转至讲师列表
            this.$router.push({ path: "/edu/teacher/list" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        saveTeacher(this.teacher)
          .then((response) => {
            
            console.log(response.data);
            this.$message({
              type:'success',
              message:response.message
            });
            //跳转讲师列表          
            this.$router.push({ path: "/edu/teacher/list" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

