import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '../views/404'

Vue.use(Router)


import Login from '../views/login'
import Dashboard from '../views/dashboard/Dashboard'
import Home from '../views/home'
import LoadingIcon from '../views/css-demo/loadingicon'


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
            {
                path: 'kanban',
                name: 'kanban',
                component: ()=>import('@/views/component-demo/kanban'),
                meta: {title: '看板'}
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
                path: 'demo1',
                name: 'demo1',
                component: ()=>import('@/views/threejs/demo1'),
                meta: {title: 'demo1'}
            },
            {
                path: 'model',
                name: 'model',
                component: ()=>import('@/views/threejs/model'),
                meta: {title: 'model'}
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
                meta: {title: '一维热力图'}
            },
            {
                path: 'hotmapd2',
                name: 'hotmapd2',
                component: ()=>import('@/views/canvas/hotmapd2'),
                meta: {title: '二维热力图'}
            },
            {
                path: 'wellstructure',
                name: 'wellstructure',
                component: ()=>import('@/views/canvas/wellstructure/index.vue'),
                meta: {title: '井身结构'}
            },

        ]
    },
    {
        path: '/css',
        name: 'css',
        component: Dashboard,
        meta: {title: 'CSS样式', icon: 'form'},
        children: [
            {
                path: 'test',
                name: 'test',
                component: ()=>import('@/views/css-demo/test'),
                meta: {title: '乱七八糟'}
            },
            {
                path: 'flexcenter',
                name: 'flexcenter',
                component: ()=>import('@/views/css-demo/flexcenter'),
                meta: {title: 'flex垂直居中'}
            },
            {
                path: 'loadingicon',
                name: 'loadingicon',
                component: LoadingIcon,
                meta: {title: '加载动画'}
            },
            {
                path: 'borderbox',
                name: 'borderbox',
                component: ()=>import('@/views/css-demo/borderbox'),
                meta: {title: '怪异盒模型'}
            },
        ]
    },
    {
        path: '/page',
        name: 'page',
        component: Dashboard,
        meta: {title: '页面例子', icon: 'form'},
        children: [
            {
                path: 'zhihuparticle',
                name: 'zhihuparticle',
                component: () => import('@/views/page-demo/zhihuparticle'),
                meta: {title: '知乎登录粒子效果'}
            },
            {
                path: 'radionav',
                name: 'radionav',
                component: ()=>import('@/views/page-demo/radionav'),
                meta: {title: 'Radio导航'}
            },
            {
                path: 'fixfooter',
                name: 'fixfooter',
                component: ()=>import('@/views/page-demo/fixfooter'),
                meta: {title: '固定底部'}
            },
            {
                path: 'excel',
                name: 'excel',
                component: ()=>import('@/views/page-demo/handsontable'),
                meta: {title: 'Excel'}
            },
        ]
    },
    {
        path: '/mapbox',
        component: Dashboard,
        meta: {title: 'Mapbox', icon: 'home'},
        redirect: 'home',
        children: [
            {
                path: 'polygon',
                name: 'polygon',
                component: ()=>import('@/views/pds/polygon'),
                meta: {title: 'Polygon'}
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
