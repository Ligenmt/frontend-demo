import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '../views/404'

Vue.use(Router)


import Login from '../views/login'
import Dashboard from '../views/dashboard/Dashboard'
import Home from '../views/home'
import RadioNav from '../views/component-demo/radionav'
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
        path: '/componentdemo',
        component: Dashboard,
        meta: {title: '小组件', icon: 'home'},
        children: [
            {
                path: 'backtotop',
                name: '返回顶部',
                component: ()=>import('@/views/component-demo/backtotop'),
                meta: {title: 'Backtotop'},
            },
            {
                path: 'wangeditor',
                name: 'WangEditor',
                component: ()=>import('@/views/component-demo/wangeditor'),
                meta: {title: 'Wangeditor'},
            },
            {
                path: 'radionav',
                name: 'radionav',
                component: RadioNav,
                meta: {title: 'Radio导航'}
            },
            {
                path: 'toast',
                name: 'toast',
                component: ()=>import('@/views/component-demo/toast'),
                meta: {title: '自定义Toast'}
            },
            {
                path: 'loadingui',
                name: 'loadingui',
                component: ()=>import('@/views/component-demo/loadingui'),
                meta: {title: '自定义Loading页面'}
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
                component: ()=>import('@/views/threejs/cube'),
                meta: {title: 'cube'}
            },
            {
                path: 'three2',
                name: 'three2',
                component: () => import('@/views/threejs/three2'),
                meta: {title: 'three2'}
            },
            {
                path: 'cloud',
                name: 'cloud',
                component: () => import('@/views/threejs/cloud'),
                meta: {title: 'cloud'}
            },
        ]
    },
    {
        path: '/two',
        component: Dashboard,
        meta: {title: 'Twojs', icon: 'home'},
        redirect: 'index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: ()=>import('@/views/twojs/index'),
                meta: {title: 'index'}
            },

        ]
    },
    {
        path: '/canvas',
        component: Dashboard,
        meta: {title: 'Canvas', icon: 'home'},
        // redirect: 'index',
        children: [
            {
                path: 'hotmapd1',
                name: 'hotmapd1',
                component: ()=>import('@/views/canvas/hotmapd1'),
                meta: {title: 'hotmapd1'}
            },
            {
                path: 'hotmapd2',
                name: 'hotmapd2',
                component: ()=>import('@/views/canvas/hotmapd2'),
                meta: {title: 'hotmapd2'}
            },

        ]
    },
    {
        path: '/example',
        name: 'example',
        component: Dashboard,
        redirect: '/example/upload',
        meta: {title: '页面样式', icon: 'form'},
        children: [
            // {
            //     path: 'upload',
            //     name: 'upload',
            //     component: DataUpload,
            //     meta: {title: '数据上传'}
            // },
            // {
            //     path: 'query',
            //     name: 'query',
            //     component: Project,
            //     meta: {title: '数据查看'}
            // },
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
                meta: {title: '知乎登录粒子效果'}
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
        path: '/echarts',
        component: Dashboard,
        meta: {title: 'Echarts', icon: 'home'},
        children: [
            {
                path: 'surface1',
                name: 'surface1',
                component: ()=>import('@/views/echarts/surface1'),
                meta: {title: 'Surface1'}
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
