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
        component:() =>import('../components/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component:() =>import('../components/Register.vue')
    },
    {
        path: '/retrieve',
        name: 'retrieve',
        component:() =>import('../components/Retrieve.vue')
    },
<<<<<<< HEAD
    // {
    //     path: '/userCenter',
    //     name: 'userCenter',
    //     component:() =>import('../components/UserCenter.vue')
    // }
=======
    {
        path: '/userCenter',
        name: 'userCenter',
        component:() =>import('../components/UserCenter.vue')
    },
>>>>>>> 7dca9f06ac7b9cf41779d2741a37393d44944a7b
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router