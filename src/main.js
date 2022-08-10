import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import '@/custom-component' // 注册自定义组件

import axios from 'axios'
import qs from "qs";

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.scss'

Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

import x2js from 'x2js' // xml数据处理插件
Vue.prototype.$x2js = new x2js() // 创建x2js对象，挂到vue原型上

axios.defaults.baseURL="http://81.70.16.241/back";

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
