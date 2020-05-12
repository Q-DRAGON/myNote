import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VueLazyload from 'vue-lazyload'
import '@/assets/scss/common.scss'
import '@/assets/css/style.css'
import './components/global'
import $ from 'jquery'
// 需要开启权限配置时使用下面的语句
import './permission'

Vue.prototype.$echarts = echarts
Vue.prototype.$EventBus = new Vue()
Vue.use(Element)
Vue.use(VueLazyload, {
  preLoad: 1,
  error: './assets/img/lazyLoading/error.png',
  loading: './assets/img/lazyLoading/loading.png',
  attempt: 1
})
// 设置为 false 以阻止 vue 在启动时生成生产提示, 生成环境一般为false, 开发用true
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
