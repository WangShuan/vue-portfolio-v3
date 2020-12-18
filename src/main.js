import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vue-loading-overlay'
import 'bootstrap'

import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'

import './bus'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'

Object.keys(rules).forEach((rule) => extend(rule, rules[rule]))

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.component('loading', VueLoading)

Vue.filter('dollarSign', (n) => `$${n}`)

Vue.filter('numFormat', (n) => {
  const intPart = Number(n).toFixed(0)
  const intPartFormat = intPart
    .toString()
    .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return intPartFormat
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`
    axios.post(api).then((res) => {
      if (res.data.success === false) {
        next('/login')
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
