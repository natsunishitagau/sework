import {createRouter, createWebHistory} from 'vue-router'

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
        component:() =>import('../components/user/Retrieve.vue')
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
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
