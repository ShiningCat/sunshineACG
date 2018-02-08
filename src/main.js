// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import moment from 'moment'
import 'font-awesome/css/font-awesome.min.css'
// import {VeeValidate, Veeconfig} from '../static/js/validate.js'
// import VueRouter from 'vue-router'
import router from './router'
axios.interceptors.request.use(config => {
  let token = 'Bearer '+localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token;
  }
  return config
  }, error => {
})
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:router.replace({path: '/login'})
      // case 404:router.replace({path: '/404'})
    }
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (localStorage.getItem("token")) {
//       next()
//     }
//     else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   }
//   else {
//     next()
//   }
// })

Vue.config.productionTip = false
moment.locale('zh-cn');
Vue.filter('time', function (value, formatString) {
  return moment(value).format(formatString);
})
let vm = new Vue({
  el: '#app',
  router,       
  template: '<App/>',
  components: { App }
})

Vue.use({vm})
Vue.config.debug = true;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;