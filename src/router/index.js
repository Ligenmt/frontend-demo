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
        path: '/three',
        component: Dashboard,
        meta: {title: 'Threejs', icon: 'home'},
        redirect: 'cube',
        children: [
            {
                path: 'cube',
                name: 'cube',
                component: ()=>import('@/views/cube'),
                meta: {title: 'cube'}
            },
            {
                path: 'three2',
                name: 'three2',
                component: () => import('@/views/three2'),
                meta: {title: 'three2'}
            },
            {
                path: 'cloud',
                name: 'cloud',
                component: () => import('@/views/cloud'),
                meta: {title: 'cloud'}
            },
        ]
    },
    {
        path: '/example',
        name: 'example',
        component: Dashboard,
        redirect: '/example/upload',
        meta: {title: '例子', icon: 'form'},
        children: [
            {
                path: 'upload',
                name: 'upload',
                component: DataUpload,
                meta: {title: '数据上传'}
            },
            {
                path: 'query',
                name: 'query',
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
                path: 'zhihuparticle',
                name: 'zhihuparticle',
                component: () => import('@/views/zhihuparticle'),
                meta: {title: 'zhihuparticle'}
            },
        ]
    },
    {
        path: '/pds',
        component: Dashboard,
        meta: {title: 'PDS', icon: 'home'},
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: ()=>import('@/views/pds/home'),
                meta: {title: 'home'}
            },
            {
                path: 'wellinfo',
                name: 'wellinfo',
                component: () => import('@/views/pds/wellinfo'),
                meta: {title: 'wellinfo'}
            },
            {
                path: 'case',
                name: 'case',
                component: () => import('@/views/pds/home'),
                meta: {title: 'case'}
            },

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
