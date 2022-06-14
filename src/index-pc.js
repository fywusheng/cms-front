require('es6-promise').polyfill();

import VueLazy   from 'vue-lazyload'
import App       from 'root/pc/app'
import TopicCom  from 'root/pc/components'

import 'reset.css'
import 'root/config/axios'

// for online debug
XIU.query.__debug && (Vue.config.devtools = true);

/**
 * 注册插件
 */
Vue.use(VueLazy, {
    preLoad: 2.5,
    error: 'https://xiu-obs.obs.cn-south-1.myhuaweicloud.com/1548324684777.jpg',
    loading: 'https://xiu-obs.obs.cn-south-1.myhuaweicloud.com/1548324684777.jpg',
    attempt: 3,
})

/**
 * 注册全局
 */
Vue.mixin({
    data() {
        return {
            ENV,
            XIU
        }
    }
});


/**
 * 注册专题组件
 */
_.forIn(TopicCom, (value, key) => {
    Vue.component('topic-' + key, value)
})

/**
 * 注册后台组件
 */
Vue.component('pcBackend', () => import(/* webpackChunkName: "backend-pc" */ 'root/pc/backend'))
Vue.component('pcMasker', () => import(/* webpackChunkName: "backend-pc-masker" */ 'root/pc/backend/masker'))

/**
 * 根实例化
 */
new Vue({
    render: h => h(App)
})
.$mount('#app-topic');

window.XIU = XIU;
window.Vue = Vue;