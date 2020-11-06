<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="请输入查询关键字"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="subject"
      :data="subjectData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import { getSubjectListTree } from "@/api/edu/subject";

export default {
  data() {
    return {
      filterText: "",
      subjectData: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  watch: {
    filterText(val) {
      this.$refs.subject.filter(val);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSubjectListTree().then((response) => {
        this.subjectData = response.data.rows;
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
  },
};
</script>

