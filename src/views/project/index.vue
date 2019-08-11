<template>
  <div class="app-container">
    <el-card shadow="never">
      <i class="el-icon-tickets"></i>
      <span>项目列表</span>
      <el-button
        type="primary"
        class="btn-add"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        border="true"
        :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
    export default {
      name: "project",
      data() {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          tableData: Array(20).fill(item)
        }
      }
    }
</script>

<style scoped>
  .btn-add {
    float: right;
  }

  .table-container {
    margin-top: 20px;
  }
</style>
