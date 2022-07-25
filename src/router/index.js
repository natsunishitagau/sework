import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    { 
        path: '/', 
        redirect: {name:'home'}
    },
    {
        path: '/home',
        name: 'home',
        component:() =>import('../components/HelloWorld.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router