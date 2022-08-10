import Vue from 'vue'
import Router from 'vue-router'
import EmptyPage from '../components/EmptyPage.vue'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}

const routes = [
    {
        path: '/prototype',
        name: 'prototype',
        component:() =>import('@/components/Prototype.vue')
    },
    {
        path: '/getPreviews',
        name: 'getPreviews',
        component:()=>import('@/views/GetPreviews.vue')
    },
    {
        path: '/emptyPage',
        name: 'emptyPage',
        component: EmptyPage
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
        path: '/workSpace',
        name: 'workSpace',
        component:() =>import('../components/WorkSpace.vue'),
        redirect: {name:'recentLook'},
        children: [
            {
                path: 'userInfo',
                name: 'userInfo',
                component:() =>import('../components/personal/UserInfo.vue')
            },
            {
                path: 'changePwd',
                name: 'changePwd',
                component:() =>import('../components/personal/ChangePwd.vue')
            },
            {
                path: 'messageCheck',
                name: 'messageCheck',
                component:() =>import('../components/personal/MessageCheck.vue')
            },
            {
                path: 'messageContent',
                name: 'messageContent',
                component:() =>import('../components/personal/MessageContent.vue')
            },
            {
                path: 'shareLink',
                name: 'shareLink',
                component:()=>import('../components/personal/ShareLink.vue')
            },
            {
                path: 'recentLook',
                name: 'recentLook',
                component:() =>import('../components/personal/RecentLook.vue')
            },
            {
                path: 'collectProject',
                name: 'collectProject',
                component:() =>import('../components/personal/CollectProject.vue')
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
                path: 'docCenter',
                name: 'docCenter',
                component:() =>import('../components/team/DocCenter.vue')
            },
        ]
    }

]

export default new Router({
    routes,
})
