<template>
    <div class="main">
      <el-row :gutter="2">
        <el-col :span="24">
          <div class="title">
            <span>驾驶管理仓</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
            <div class="card-top">
            </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
  .main {
    height: 800px;
    background-size: 100% 100%;
    background: url('../../assets/images/blue-bg.png') ;
  }

  .main .title {
    background-size: 100% 100%;
    height: 81px;
    background: rgba(64, 162, 118, 0) url('../../assets/images/blue-title.png') center;
    transform: translate(10px, 10px);

    font-size: 25px;
    color: cyan;
    font-style: italic;
    text-align: center;
    vertical-align: center;
    line-height: 81px;
  }

  .card-top {
    background-clip: border-box;
    background: rgba(64, 162, 118, 0) url('../../assets/images/blue-边框.png');
    background-size: 100% 100%;
    background-origin: padding-box;
    height: calc(10vw);
    -webkit-transition: transform 0.8s;
    transform:translate(100px,100px);
  }
</style>
