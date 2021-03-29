import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入toast
import toast from "common/toast"
//引入fastclick
import FastClick from "fastclick"
//引入lazyload插件
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false
//安装toast插件
Vue.use(toast);
//解决移动端300ms延迟
FastClick.attach(document.body);
//安装懒加载插件
Vue.use(VueLazyLoad);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
