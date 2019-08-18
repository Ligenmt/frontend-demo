<template>
    <div class="pds-container">
        <el-row>
            <el-col :span="12">
                <el-card>
                    123
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    123
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "pdshome"
    }
</script>

<style scoped>
    .pds-container {
        /*background: #eeeeee;*/
        height: 100%;
    }

    .pds-card {
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        transition: .3s;
        box-shadow: 0 2px 12px 0 rgba(0,78,126, .1);
        padding: 20px;
        box-sizing: border-box;
    }

    .pds-row {
        width: 100%;
        height: 50%;
    }
</style>
