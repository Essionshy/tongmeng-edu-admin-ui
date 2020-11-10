<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="bannerQuery" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="bannerQuery.title" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="bannerQuery.isDeleted" placeholder="请选择状态">
          <el-option label="正常" value="false"></el-option>
          <el-option label="删除" value="true"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示查询结果表格 -->

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="图片地址" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.imageUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.linkUrl }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :title="scope.row.deleted | statusFilter">{{
            scope.row.deleted == 0 ? "正常" : "删除"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建日期"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="'/rms/banner/update/' + scope.row.id">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
          </router-link>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="[10, 20, 30]"
      :total="total"
      style="padding: 30px; text-align: center"
      layout="total,prev, pager, next,jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import bannerApi from "@/api/rms/banner";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "gray",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      page: 1,
      limit: 10,
      total: 0,
      bannerQuery: {
        title: "",
        isDeleted: '',
      },
    };
  },
  //页面渲染前调用该方法
  created() {
    this.fetchData();
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
      bannerApi
        .deleteBanner(row.id)
        .then((response) => {
          //删除成功
          if (response.success) {
            this.$message({
              type: "success",
              message: response.message,
            });
            //删除完成后回显列表
            this.fetchData();
          }
        })
        .catch((error) => {});
    },
    fetchData() {
      this.listLoading = true;

      bannerApi
        .getBannerList(this.page, this.limit, this.bannerQuery)
        .then((response) => {
          //请求成功
          this.list = response.data.bannerList;
          this.total = response.data.total;

          console.log(response);
          this.listLoading = false;
        })
        .catch((error) => {
          //请求失败
          console.log("请求失败", error);
        });
    },
    onSubmit() {
      this.fetchData();
    },
  },
};
</script>
