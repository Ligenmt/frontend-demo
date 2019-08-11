<template>
  <div class="app-wrapper">
    <side-bar></side-bar>
    <div class="main-container">
      <top-bar></top-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
    import SideBar from './components/SideBar'
    import TopBar from './components/TopBar'
    import AppMain from './components/AppMain'

    export default {
      name: "Dashboard",
      components: {
        SideBar, TopBar, AppMain,
      },
      computed: {

      },
      data() {
        return {
          status: true,
        }
      }
    }
</script>

<style scoped>

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .main-container {
    min-height: 100%;
    height: calc(100vh);
    transition: margin-left .28s;
    margin-left: 180px;
  }

</style>
