<template>
  <div class="sidebar-container">
    <el-menu
      :collapse="isCollapsed"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <template v-for="item in dashboardRoutes" v-if="!item.hidden && item.children">
        <router-link v-if="item.meta.name == 'home'" :to="item.children[0].path">
          <el-menu-item :index="item.path || item.name">
            <!--<i class="el-icon-menu"></i>-->
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu :index="item.path" :key="item.path">
          <template slot="title">
            <!--<i class="el-icon-menu"></i>-->
            <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <template v-for="child in item.children" v-if="!child.hidden">
            <router-link :to="item.path+'/'+child.path" :key="child.name">
              <el-menu-item :index="item.path+'/'+child.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{child.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>

</template>

<script>
    export default {
      name: "SideBar",

      data() {
        // console.log(this.$router.options.routes)
        return {
          isCollapsed: false,
          message: "hello",
        }
      },

      computed: {
        total() {
          return this.count
        },
        dashboardRoutes() {
          let rootRoutes = this.$router.options.routes
          let dashboardRoutes = rootRoutes[2].children
          // console.log(dashboardRoutes)
          return rootRoutes
        },
      },

      methods: {

      }
    }
</script>

<style scoped>
  .sidebar-container {
    background-color: #304156;
    transition: width .28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
</style>
