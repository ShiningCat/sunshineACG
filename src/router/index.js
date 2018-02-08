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
import theme from '@/pages/theme'
import userEdit from '@/pages/userEdit'
import page404 from '@/pages/404'

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
    { path: '/user/:userId',name: 'user',meta: {requireAuth: true, }, component: user},
    { path: '/topic/:topicId', name: 'topic', component: topic},
    { path: '/theme/:themeId', name: 'theme', component : theme},
    { path: '/user/edit', name:'userEdit', component: userEdit},
    { path: '/404' , name: '404', component: page404}
  ]
})
