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

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.component("loading", VueLoading)

Vue.filter('dollarSign', function(n) {
  return `$${n}`
})

Vue.filter("numFormat", function(n) {
  let intPart = Number(n).toFixed(0)
  let intPartFormat = intPart
    .toString()
    .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
  return intPartFormat
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
