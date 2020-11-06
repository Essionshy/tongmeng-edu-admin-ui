<template>
  <div class="app-container">
    <el-form >
      <el-form-item label="信息描述">
        <el-tag type="info">excel模板说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'./static/excel/example.xlsx'">点击下载模板</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel文件">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="BASE_API + '/edu/subject/addSubject'"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importDislabled"
          :auto-upload="false"
          :limit="1"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传excel文件，仅支持单个文件上传
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      importDislabled: false,
      loading: false,
    };
  },
  methods: {
    submitUpload() {
      //upload 组件只能使用传统的表单提交，不能通过ajax提交请求
      this.loading = true;
      this.importDislabled = true;
      this.$refs.upload.submit();
    },
    //文件上传成功
    fileUploadSuccess(response) {
      this.loading = false;
      this.importDislabled = false;
      this.$message({
        type: "success",
        message: response.message,
      });
      //跳转课程分类列表 TODO
    },
    //文件上传失败
    fileUploadError() {
      this.loading = false;
   
      this.$message({
        type: "error",
        message: response.message,
      });
    },
  },
};
</script>