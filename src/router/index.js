import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../pages/index'
import login from '@/pages/login'
import registered from '@/pages/registered'
import forgot from '@/pages/forgot'
import verification from '@/pages/verification'
import repassword from '@/pages/repassword'
import user from '@/pages/user'
import topic from '@/pages/topic'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    { path: '/forgot', component: forgot },
    { path: '/registered', component: registered },
    { path: '/login', component: login },
    { path: '/confirm_verification/:code', component: verification },
    { path: '/reset-password/:code', component: repassword },
    { path: '/user/:userId',name: 'user', component: user},
    { path: '/topic/:topicId', name: 'topic', component: topic}
  ]
})
