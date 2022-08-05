import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/emptyPage',
        name: 'emptyPage',
        component: () =>import('../components/EmptyPage.vue')
    },
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
        path: '/workSpace/prototype',
        name: 'prototype',
        component: () => import('@/views/Prototype'),
    },
    {
      path: '/workSpace/document',
      name: 'document',
      component: () => import('../components/EditDoc.vue')
    },
    {
        path: '/workSpace/uml',
        name: 'uml',
        component: () => import('../components/DrawIo.vue')
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
      path: '/retrieve',
      name: 'retrieve',
      component: () => import('../components/user/Retrieve.vue')
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component:() =>import('../components/user/UserCenter.vue'),
        redirect: {name:'userInfo'},
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
          },
            {
                path: 'messageCheck',
                name: 'messageCheck',
                component:() =>import('../components/user/userCenter/MessageCheck.vue')
            },
            {
                path: 'messageContent',
                name: 'messageContent',
                component:() =>import('../components/user/userCenter/MessageContent.vue')
            }
        ]
    },
    {
        path: '/workSpace',
        name: 'workSpace',
        component:() =>import('../components/WorkSpace.vue'),
        redirect: {name:'recentLook'},
        children: [
            {
                path: 'recentLook',
                name: 'recentLook',
                component:() =>import('../components/personal/RecentLook.vue')
            },
            {
                path: 'inviteMember',
                name: 'inviteMember',
                component:() =>import('../components/team/InviteMember.vue')
            },
            {
                path: 'newGroup',
                name: 'newGroup',
                component:() =>import('../components/personal/NewGroup.vue')
            },
            {
                path: 'manageMember',
                name: 'manageMember',
                component:() =>import('../components/team/ManageMember.vue')
            },
            {
                path: 'groupProject',
                name: 'groupProject',
                component:() =>import('../components/team/GroupProject.vue')
            },
            {
                path: 'recycleBin',
                name: 'recycleBin',
                component:() =>import('../components/team/RecycleBin.vue')
            },
            {
                path: 'proInterface',
                name: 'proInterface',
                component:() =>import('../components/personal/ProInterface.vue')
            },
        ]
    }

]

export default new Router({
    routes,
})
