<template>
  <div class="topbar-container">
    <div class="breadcrumb-container">
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Index",
      data() {
        // console.log(this.$route.matched)
        return {

        }
      },
    }
</script>

<style scoped>
  .topbar-container {
    /*background-color: coral;*/
    height: 50px;
    line-height: 50px;
    border-radius: 1px !important;
    border-bottom: 1px solid #e6e6e6;
  }

  .breadcrumb-container {
    box-sizing: inherit;
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .breadcrumb-inner {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
</style>
