<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="2" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 显示章节 -->
    <ul class="chapterList">
      <li v-for="chapter in chapterList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button type="text" @click="openAddVideoDialog(chapter.id)"
              >添加小节</el-button
            >
            <el-button type="text" @click="openEditChapter(chapter.id)"
              >编辑</el-button
            >
            <el-button style="" type="text" @click="deleteChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>
        <!-- 显示各章节小节信息 -->
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="openEditVideo(video.id)"
                  >编辑</el-button
                >
                <el-button style="" type="text" @click="deleteVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button style="margin-top: 12px" @click="prev">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px" @click="next"
        >保存并下一步</el-button
      >
    </div>

    <!-- 添加或修改章节对话框Dialog -->
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item label="章节标题" label-width="120px">
          <el-input v-model="chapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" label-width="120px">
          <el-input-number v-model="chapter.sort" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改小节对话框Dialog -->
    <el-dialog title="添加小节" :visible.sync="videoDialogFormVisible">
      <el-form :model="video">
        <el-form-item label="小节标题" label-width="120px">
          <el-input v-model="video.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小节排序" label-width="120px">
          <el-input-number v-model="video.sort" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费" label-width="120px">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频" label-width="120px">
          <el-upload
            class="upload-demo"
            :action="BASE_API + '/vod/video/upload'"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="videoDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="videoSaveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getChapterList,
  addChapter,
  getChapter,
  updateChapter,
  deleteChapter,
} from "@/api/edu/chapter";

import videoApi from "@/api/edu/video";
export default {
  data() {
    return {
      chapterList: [],
      courseId: "",
      dialogFormVisible: false,
      videoDialogFormVisible: false,
      BASE_API: process.env.BASE_API,
      fileList: [],
      chapter: {
        courseId: "",
        title: "",
        sort: "",
      },
      video: {
        courseId: "",
        chapterId: "",
        sort: "",
        title: "",
        videoSourceId:"",
        videoOriginalName:""
      },
      //
      //
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      //获取章节信息
      this.getChapters();
    }
  },
  methods: {
    handleSuccess(res, file, fileList) {
      this.video.videoSourceId = res.data.videoId;
      this.video.videoOriginalName=file.name;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`想要重新上传视频，请先删除已上传的视频`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    openAddVideoDialog(chapterId) {
      this.videoDialogFormVisible = true;
      this.video.chapterId = chapterId;
      //清空表单数据
      //清空对话框中数据
      this.video.title = "";
      this.video.sort = 0;
    },

    //打开编辑章节对话框

    openEditChapter(chapterId) {
      this.dialogFormVisible = true;
      //回显表单
      getChapter(chapterId).then((response) => {
        this.chapter = response.data.chapter;
      });
    },
    openChapterDialog() {
      //打开对话框
      this.dialogFormVisible = true;
      //清空对话框中数据
      this.chapter.title = "";
      this.chapter.sort = 0;
    },

    saveChapter() {
      //关闭对话框
      this.chapter.courseId = this.courseId;
      //提示信息
      addChapter(this.chapter).then((response) => {
        this.$message({
          type: "success",
          message: response.message,
        });
      });
      //刷新页面
      this.getChapters();
    },

    updateChapterInfo() {
      updateChapter(this.chapter).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getChapters();
      });
    },

    //提交表单数据添加章节
    saveOrUpdate() {
      this.dialogFormVisible = false;
      if (!this.chapter.id) {
        this.saveChapter();
      } else {
        this.updateChapterInfo();
      }
    },
    deleteChapter(chapterId) {
      deleteChapter(chapterId).then((response) => {
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getChapters();
      });
    },

    getChapters() {
      getChapterList(this.courseId)
        .then((response) => {
          this.chapterList = response.data.chapters;
        })
        .catch((error) => {
          alert(error);
        });
    },

    /***小节 */
    //保存小节
    saveVideoInfo() {
      this.video.courseId = this.courseId;
      videoApi.addVideo(this.video).then((response) => {
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getChapters();
      });
    },
    //更新小节
    updateVideoInfo() {
      videoApi.updateVideo(this.video).then((response) => {
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getChapters();
      });
    },
    deleteVideo(videoId) {
      videoApi.deleteVideo(videoId).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新
        this.getChapters();
      });
    },
    openEditVideo(videoId) {
      this.videoDialogFormVisible = true;
      //回显表单数据
      videoApi.getVideo(videoId).then((response) => {
        this.video = response.data.video;
      });
    },
    //添加或修改小节确认单击事件
    videoSaveOrUpdate() {
      this.videoDialogFormVisible = false;
       
      if (!this.video.id) {
      
        this.saveVideoInfo();
      } else {
      
        this.updateVideoInfo();
      }
    },

    prev() {
      const courseId = this.$route.params.id;
      this.$router.push({ path: "/edu/course/info/" + courseId });
    },
    next() {
      const courseId = this.$route.params.id;
      //跳转到Chapter页面
      this.$router.push({ path: "/edu/course/publish/" + courseId });
    },
  },
};
</script>

<style scoped>
.chapterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li {
  position: relative;
}
.chapterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}

.chapterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>