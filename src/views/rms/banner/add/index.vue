<template>
  <div class="app-container">
    <el-form ref="form" :model="banner" label-width="120px">
      <el-form-item label="BannerID" hidden>
        <el-input v-model="banner.id" />
      </el-form-item>
      <el-form-item label="Banner标题">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="Banner排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="上传Banner" label-width="120px">
        <el-upload
          :action="BASE_URL + '/oss/file/upload'"
          list-type="picture-card"
          :on-success="handleSuccessed"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>      
          <img width="50%" height="50%"  :src="banner.imageUrl" />
      
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import bannerApi from "@/api/rms/banner";

export default {
  data() {
    return {
      banner: {
        id: "",
        title: "",
        sort: 1,
        imageUrl: "",
        linkUrl:''
      },
      dialogVisible: false,
      BASE_URL: process.env.BASE_API,
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
    handleSuccessed(res,file,fileList){
      this.banner.imageUrl=res.data.url;
      this.banner.linkUrl=this.$route.path
     
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        //从路径中获取id的值
        const id = this.$route.params.id;
        //this.dialogVisible=true;
        this.getBannerInfo(id);
      } else {
        //清空表单
        this.banner = {};
      }
    },
    //获取 Banner
    getBannerInfo(id) {
      bannerApi
        .getBanner(id)
        .then((response) => {
          this.banner = response.data.banner;
        })
        .catch((error) => {});
    },

    //保存Banner
    addBannerInfo() {
      bannerApi
        .saveBanner(this.banner)
        .then((response) => {
          //提示
          this.$message({
            type:'success',
            message:response.message
          });
          //跳转
          this.$router.push({path:'/resource/banner/list'})
        })
        .catch((error) => {
          console.log(error);
        });
    },
    upadteBannerInfo() {
      bannerApi
        .updateBanner(this.banner)
        .then((response) => {
          this.$message({
            type: "success",
            message: response.message,
          });

          //跳转至讲师列表
          this.$router.push({ path: "/resource/banner/list" });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onSubmit() {
      //判断是创建还是更新
      if (this.$route.params && this.$route.params.id) {
        this.upadteBannerInfo();
      } else {
       
         this.addBannerInfo();
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

