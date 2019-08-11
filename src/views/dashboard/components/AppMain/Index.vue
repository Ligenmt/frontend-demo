<template>
  <section class="app-main">
    <div class="app-container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
    export default {
      name: "Index",

      data() {
        return {}
      }
    }

</script>

<style scoped>
  .app-main{
    height: calc(100vh - 51px);
  }

  .app-container {
    /*background-color: #42b983;*/
    padding: 0px;
    height: 100%;
  }
</style>
