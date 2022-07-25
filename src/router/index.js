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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router