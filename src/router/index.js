import Vue from 'vue'
import Router from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'

Vue.use(Router)

const routes = [
    { 
        path: '/', 
        redirect: {name:'home'}
    },
    {
        path: '/home',
        name: 'home',
        component:() =>import('../components/HomePage.vue')
    },
    {
        path: '/prototype',
        name: 'prototype',
        component: () => import('@/views/Prototype'),
    },
    {
        path: '/login',
        name: 'login',
        component:() =>import('../components/user/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component:() =>import('../components/user/Register.vue')
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component:() =>import('../components/user/UserCenter.vue'),
        children: [
          {
            path: 'userInfo',
            name: 'userInfo',
            component:() =>import('../components/user/userCenter/UserInfo.vue')
          },
          {
            path: 'changePwd',
            name: 'changePwd',
            component:() =>import('../components/user/userCenter/ChangePwd.vue')
          }
        ]
    },
    {
        path: '/workSpace',
        name: 'workSpace',
        component:() =>import('../components/user/WorkSpace.vue')
    }
    
]

export default new Router({
    routes,
})
