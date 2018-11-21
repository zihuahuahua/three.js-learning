import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: (resolve) => require(['@/pages/index'], resolve)
        },
        {
            path: '/jump',
            name: 'jump',
            component: (resolve) => require(['@/pages/jump'], resolve)
        },
        {
            path: '/mini-city',
            name: 'mini-city',
            component: (resolve) => require(['@/pages/mini-city'], resolve)
        },
        {
            path: '/mall',
            name: 'mall',
            component: (resolve) => require(['@/pages/mall'], resolve)
        },
        {
            path: '/test',
            name: 'test',
            component: (resolve) => require(['@/pages/test'], resolve)
        },
        {
            path: '/first',
            name: 'first',
            component: (resolve) => require(['@/pages/first'], resolve)
        },
        {
            path: '/clock',
            name: 'clock',
            component: (resolve) => require(['@/pages/clock_canvas'], resolve)
        }
    ]
})
