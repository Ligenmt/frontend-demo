import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '../views/404'

Vue.use(Router)


import Login from '../views/login'
import Dashboard from '../views/dashboard/Dashboard'
import Home from '../views/home'
import Project from '../views/project'
import DataUpload from '../views/dataupload'
import Calculate from '../views/calculate'
import RadioNav from '../views/radionav'
import LoadingIcon from '../views/loadingicon'


const routeMap = [
  {
    path: '/login',
    name: 'HelloWorld',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    hidden: true
  },
  {
    path: '',
    component: Dashboard,
    meta: {title: '首页', icon: 'home'},
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {title: '首页'}
      },
    ]
  },
  {
    path: '/project',
    name: 'project',
    component: Dashboard,
    redirect: '/project/list',
    meta: {title: '数据上传', icon: 'form'},
    children: [
      {
        path: 'list',
        name: 'list',
        component: DataUpload,
        meta: {title: '数据上传'}
      },
      {
        path: 'add',
        name: 'add',
        component: Project,
        meta: {title: '数据查看'}
      },
      {
        path: 'radionav',
        name: 'radionav',
        component: RadioNav,
        meta: {title: 'Radio导航'}
      },
      {
        path: 'loadingicon',
        name: 'loadingicon',
        component: LoadingIcon,
        meta: {title: 'Loading动画'}
      },
      {
        path: 'cube',
        name: 'cube',
        component: ()=>import('@/views/cube'),
        meta: {title: 'cube'}
      },
    ]
  },
  {
    path: '/employee',
    component: Dashboard,
    redirect: 'employee/list',
    meta: {title: '计算分析', icon: 'product-list'},
    children: [
      {
        path: 'list',
        name: 'list',
        component: Calculate,
        meta: {title: '计算分析'}
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
]

export default new Router({
  routes: routeMap
})
