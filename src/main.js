// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { Toast } from 'vant'
import moment from 'moment'
Vue.use(Toast)
Vue.use(less)
Vue.use(VueCookies)

axios.defaults.baseURL = "/api"
Vue.prototype.$https = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 跳转页面需要权限
  if (to.meta.auth) {
    let isLogin=Vue.$cookies.get('userInfo')
    // 判断是否已经登录
    if (isLogin) {
      
      // Vue.$cookies.get('userInfo')
      // 已经登录,跳转到下个页面
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
