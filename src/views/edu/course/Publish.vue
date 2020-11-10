<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="3" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
  <!-- 显示课程发布信息 -->
    <div class="ccInfo">     
      <img :src="coursePublishInfo.cover">
      <div class="main">
        <h2> {{coursePublishInfo.title}}</h2>
        <p class="gray"><span>共{{coursePublishInfo.lessonNum}}课时</span></p>
           <p><span>所属分类：{{coursePublishInfo.subjectParentTitle}}-{{coursePublishInfo.subjectTitle}}</span></p>
              <p>课程讲师：{{coursePublishInfo.teacherName}}</p>
                <h3 class="red">￥{{coursePublishInfo.price}}</h3>

      </div>
     

    </div>

    <div>
      <el-button style="margin-top: 12px" @click="prev">返回修改</el-button>
      <el-button type="primary" style="margin-top: 12px" @click="publish"
        >发布课程</el-button
      >
    </div>
  </div>
</template>
<script>
import courseApi from "@/api/edu/course";
export default {
  data() {
    return {
      courseId: "",
      coursePublishInfo: {},
    };
  },
  created() {
    //获取courseId
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      courseApi.getCoursePublishInfo(this.courseId).then((response) => {      
        this.coursePublishInfo = response.data.coursePublishInfo;
      });
    },
    prev() {
      this.$router.push({ path: "/edu/course/chapter/"+this.courseId });
    },
    //发布课程
    publish() {
      courseApi.publishCourse(this.courseId).then(response=>{
        this.$message({
          type:'success',
          message:response.message
        })
      })
      //跳转课程列表
     this.$router.push({path:'/edu/course/list'})
     
    },
  },
};
</script>

<style scoped>
  .ccInfo{
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
  }

  .ccInfo img{
    background: #d6d6d6;
    width: 500px;
    height: 270px;
    display:block;
    float:left;
    border: none;
  }

  .ccInfo .main{
    margin-left: 520px;
  }
  .ccInfo .main h3{
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 20px;
    color: #d32f24;
    font-weight: normal;
    position:absolute;
  }
</style>