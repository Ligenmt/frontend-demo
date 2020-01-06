// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import './styles/normalize.css'
import '@/styles/index.css' // global css

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App'
import router from './router'

Vue.use(ElementUI, {locale});
Vue.config.productionTip = false

import echarts from 'echarts'
import 'echarts-gl'
Vue.prototype.$echarts = echarts

//自定义Toast组件
import toastRegistry from './components/Toast/index'
Vue.use(toastRegistry)
import loadingUIRegistry from './components/LoadingUI/index'
Vue.use(loadingUIRegistry)


import '@/icons' // icon

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
