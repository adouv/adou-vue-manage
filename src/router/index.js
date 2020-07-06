import Vue from 'vue'
import Router from 'vue-router'
import AuthService from '../ddd/auth.service'
import systemRouter from "./systemRouter";
import systemDevelopmentRouter from "./systemDevelopmentRouter";
import salesManageRouter from "./salesManageRouter";

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => console.log(err))
}

Vue.use(Router)

const routers = [{
    path: '/',
    name: 'layout',
    component: resolve => require(['@/modules/layout/index'], resolve),
    children: [{
            path: '/',
            name: 'home',
            component: resolve => require(['@/modules/home.vue'], resolve)
        },
        {
            path: '/adTest',
            name: 'adTest',
            component: resolve => require(['@/modules/test.vue'], resolve)
        },
        ...systemRouter,
        ...systemDevelopmentRouter,
        ...salesManageRouter
    ]
}, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/modules/login.vue'], resolve)
}, {
    path: '*',
    name: 'notFind',
    component: resolve => require(['@/modules/notFindPage.vue'], resolve)
}];

const router = new Router({
    mode: 'history',
    routes: routers
});

AuthService.tokenAuth(Vue, router, routers);

export default router;