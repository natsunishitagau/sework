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
          }
        ]
    },
    {
        path: '/workSpace',
        name: 'workSpace',
        component:() =>import('../components/user/WorkSpace.vue')
    },
    {
        path: '/proInterface',
        name: 'proInterface',
        component:() =>import('../components/user/ProInterface')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
