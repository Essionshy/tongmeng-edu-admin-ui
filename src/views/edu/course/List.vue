<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="courseQuery" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="courseQuery.name" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="courseQuery.level" placeholder="课程状态">
          <el-option label="已发布" value="0"></el-option>
          <el-option label="未发布" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示查询结果表格 -->

    <el-table
      v-loading="listLoading"
      :data="courseList"
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
      <el-table-column label="课程标题" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="课时数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lessonNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.buyCount }}
        </template>
      </el-table-column>
      <el-table-column label="浏览量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.viewCount }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status == "Draft" ? "未发布" : "已发布"
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
          <router-link :to="'/edu/course/info/' + scope.row.id">
            <el-button type="primary" icon="el-icon-edit" size="mini"
             >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/edu/course/chapter/' + scope.row.id">
            <el-button type="primary" icon="el-icon-edit" size="mini"
               >编辑课程大纲信息</el-button
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
      :page-sizes="pageSizes"
      :total="total"
      style="padding: 30px; text-align: center"
      layout="total,prev, pager, sizes,next,jumper"
      prev-text="上一页"
      next-text="下一页"
      @current-change="fetchData"
      @size-change="sizeChange"    
    
    />
  </div>
</template>

<script>
import courseApi from "@/api/edu/course";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Normal: "success",
        Draft: "gray",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      courseList: null,
      listLoading: true,
      pageSizes:[10, 20, 30, 40, 50, 100],
      page: 1,
      limit: 10,
      total: 0,
      courseQuery: {
        name: "",
        level: null,
      },
    };
  },
  //页面渲染前调用该方法
  created() {
    this.fetchData();
  },
  methods: {
    sizeChange(size){   
      //修改每页显示的记录数
      this.limit=size;    
      this.fetchData();
    },
    handleDelete(index, row) {
      console.log(index, row);
      courseApi
        .deleteCourse(row.id)
        .then((response) => {
          //删除成功
          if (response.success) {
            this.$message({
              type: "success",
              message: response.message,
            });
          }
          //删除完成后回显列表
          this.fetchData();
        })
        .catch((error) => {});
    },
    fetchData() {
      this.listLoading = true;

      courseApi
        .getCourseList(this.page, this.limit, this.courseQuery)
        .then((response) => {
          //请求成功
          this.courseList = response.data.courseList;
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
