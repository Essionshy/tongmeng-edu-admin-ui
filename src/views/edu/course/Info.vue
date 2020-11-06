<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="1" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
    <br />

    <el-form ref="course" :model="courseInfo" label-width="120px">
      <el-form-item label="课程ID" hidden>
        <el-input v-model="courseInfo.id" />
      </el-form-item>
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder="示例：机器学习项目课程"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          @change="firstLevelSubjectChanged"
          placeholder="一级分类"
        >
          <el-option
            v-for="firstLevelSubject in firstLevelSubjectList"
            :key="firstLevelSubject.id"
            :label="firstLevelSubject.title"
            :value="firstLevelSubject.id"
          >
          </el-option>
        </el-select>

        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="secondLevelSubject in secondLevelSubjectList"
            :key="secondLevelSubject.id"
            :label="secondLevelSubject.title"
            :value="secondLevelSubject.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <el-form-item label="讲师名称">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teachers"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API + '/oss/file/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img class="cover" :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseInfo.price"
          placeholder=""
          controls-position="right"
        />（元/人民币）
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :disabled="saveBtnDisabled"
          style="margin-top: 12px"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CourseApi from "@/api/edu/course";
import { getTeachers } from "@/api/edu/teacher";
import { getSubjectListTree } from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: "",
        lessonNum: 0,
        teacherId: "",
        subjectId: "",
        subjectParentId: "",
        price: 0,
        description: "",
        cover: "",
      },
      BASE_API: process.env.BASE_API,
      teachers: [],
      firstLevelSubjectList: [],
      secondLevelSubjectList: [],
      courseId: "",
    };
  },
  created() {
    //加载讲师下拉框数据
    this.fetchData();

    //加载一级分类下拉框数据
    this.getFirstLevelSubjectList();
    //判断
    if (this.$route.params && this.$route.params.id) {
      //更新操作 回显表单
      this.courseId = this.$route.params.id;
      console.log("courserid" + this.courseId);
      CourseApi.getCourseInfo(this.courseId)
        .then((response) => {
          this.courseInfo = response.data.courseInfo;
          //根据一级分类值，获取二级分类
          //再次查询

          this.getSecondLevelSubjectList(this.courseInfo.subjectParentId);
        })
        .catch((error) => {
          console.log(error);
        });

      //根据
    } else {
      //
      this.courseInfo = {
        title: "",
        lessonNum: 0,
        teacherId: "",
        subjectId: "",
        subjectParentId: "",
        price: 0,
        description: "",
        cover: "/static/01.jpg",
      };
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url;
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLimit2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传封面只能是JPG格式");
      }
      if (!isLimit2M) {
        this.$message.error("上传封面大小不能超过2MB!");
      }
      return isJPG && isLimit2M;
    },

    //更新时，根据一级分类加载二级分类数据
    getSecondLevelSubjectList(value) {
      for (var i = 0; i < this.firstLevelSubjectList.length; i++) {
        var firstLevelSubject = this.firstLevelSubjectList[i];

        if (firstLevelSubject.id === value) {
          this.secondLevelSubjectList = firstLevelSubject.children;
        }
      }
    },

    //一级分类change事件
    firstLevelSubjectChanged(value) {
      console.log(value);
      for (var i = 0; i < this.firstLevelSubjectList.length; i++) {
        var firstLevelSubject = this.firstLevelSubjectList[i];
        if (firstLevelSubject.id === value) {
          this.secondLevelSubjectList = firstLevelSubject.children;
          //清空二级分类中的值
          this.courseInfo.subjectId = "";
        }
      }
    },
    //获取一级分类数据
    getFirstLevelSubjectList() {
      getSubjectListTree().then((response) => {
        this.firstLevelSubjectList = response.data.rows;
      });
    },

    fetchData() {
      //获取讲师列表
      getTeachers()
        .then((response) => {
          this.teachers = response.data.teachers;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //保存课程
    saveCourseInfo() {
      CourseApi.saveCourseInfo(this.courseInfo)
        .then((response) => {
          this.$message({
            tepe: "success",
            message: response.message,
          });
          //课程保存成功返回课程ID
          this.courseId = response.data.courseId;
          //跳转到第二步Chapter页面
          this.$router.push({ path: "/course/chapter/" + this.courseId });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //更新课程
    updateCourseInfo() {
      CourseApi.updateCourseInfo(this.courseInfo)
        .then((response) => {
          this.$message({
            tepe: "success",
            message: response.message,
          });

          //跳转到第二步Chapter页面
          this.$router.push({ path: "/course/chapter/" + this.courseId });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 保存课程基本信息
    saveOrUpdate() {
      if (this.$route.params && this.$route.params.id) {
        this.updateCourseInfo();
      } else {
        this.saveCourseInfo();
      }
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}

  .cover{
    background: #d6d6d6;
    width: 500px;
    height: 270px;
    display:block;
    float:left;
    border: none;
  }
</style>