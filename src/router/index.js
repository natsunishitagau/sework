import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    { 
        path: '/', 
        redirect: {name:'login'}
    },
    {
        path: '/login',
        name: 'login',
        component:() =>import('../components/LoginVue.vue')
    },
    {
        path: '/register',
        name: 'register',
        component:() =>import('../components/RegisterVue.vue')
    },
    {
        path: '/retrieve',
        name: 'retrieve',
        component:() =>import('../components/RetrieveVue.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router