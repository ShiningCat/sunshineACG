// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
// import {VeeValidate, Veeconfig} from '../static/js/validate.js'
// import VueRouter from 'vue-router'
import router from './router'
Vue.config.productionTip = false
let vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// Vue.use({vm}, VeeValidate, Veeconfig)
Vue.use({vm})
Vue.config.debug = true;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
// Vue.http.interceptors.push(function (request, next) {
  // if (store.getters.getToken) {
  //   request.headers.set('token', `Token ${store.getters.getToken}`)
  // }
  // request.headers.set('Access-Control-Allow-Origin', 'http://localhost:2001')
  // request.headers.set('Access-Control-Allow-Credentials', 'true')
  // next()
// })
