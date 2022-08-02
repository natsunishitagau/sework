import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import qs from 'qs';
const app=createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;

axios.defaults.baseURL="http://81.70.16.241/back";

app.use(ElementPlus)
app.use(qs)
app.use(store)
app.use(router)
app.mount('#app')
