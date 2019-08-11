<template>
  <div>
    <div>数据上传</div>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      name="uploadFile"
      :on-success="onUploadSuccess"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>

</template>

<script>
    export default {
        name: "index",

        data() {

          return {

          }
        },

        methods: {
          onUploadSuccess(response, file, fileList) {
            this.$message({
              message: '数据上传成功!',
              type: 'success'
            });
          },
        }
    }
</script>

<style scoped>

</style>
