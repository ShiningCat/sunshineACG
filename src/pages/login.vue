<template>
<div class="container">
  <div class="row" style="width: 40%;margin-left: auto; margin-right: auto;padding-top: 50px;">
    <aside id="zan_login-5">
      <div class="panel panel-zan aos-init aos-animate" aos="flip-center" aos-duration="3000">
        <div class="panel-heading">登录</div>
        <div class="login-form clearfix">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-envelope-o"></i></div>
              <input class="form-control" v-model="email" placeholder="邮箱" type="text"  size="20">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-lock"></i></div>
              <input class="form-control" type="password" v-model="password" placeholder="密码" size="20">
            </div>
          </div>
          <div class="form-group">
            <div class="center-block">
            <captcha></captcha>
            </div>
          </div>
          <div style="text-align: center;">
            <h5>{{error}}</h5>
          </div>
          <p>
            <label for="remember"><input name="remember" v-model="remember" type="checkbox" id="remember" > 记住我的登录信息
            </label>
            <router-link to="/forgot" title=" Password Lost and Found" style="color: #3d4450;float:right;font-weight:bold;padding:2px;">忘记密码？</router-link>
          </p>
          <button @click="login" value="登录" data-toggle="modal" data-target=".bs-example-modal-sm"  class="btn btn-inverse-primary pull-center">登录</button>
          <router-link to="/registered" class="btn btn-inverse-primary pull-right">注册</router-link>
          </div>
        </div>
    </aside>
  </div>
</div>
</template>
<script>
import '../js/gt.js'
import captcha from '../components/captcha.vue'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    captcha
  },
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      geetest_challenge: '',
      geetest_validate: '',
      geetest_seccode: '',
      userId: '',
      gt_server_status: '',
      error: '',
      captchaObj: ''
    }
  },
  created() {
    if(localStorage.getItem("token") != null){
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    login () {
      let that = this
      if (that.email == '' || that.password == ''){
        that.error = '请输入账号和密码'
        return
      }
      
      that.isDisabled = true
      axios.post('http://localhost:2001/api/token', qs.stringify({
        email: that.email,
        password: that.password,
        geetest_challenge: that.geetest_challenge,
        geetest_validate: that.geetest_validate,
        geetest_seccode: that.geetest_seccode,
        userId: that.userId,
        gt_server_status: that.gt_server_status
      })).then(function (response) {
        var result = response.data
        if(result.success){
          var user = result.obj.userInfo
          if (that.remember){
            localStorage.setItem("token",result.obj.token)
            localStorage.setItem("userId",user.userId)
            localStorage.setItem("userName",user.userName)
            localStorage.setItem("userAvatar",user.userAvatar)
          } else {
            sessionStorage.setItem("token",result.obj.token)
            sessionStorage.setItem("userId",user.userId)
            sessionStorage.setItem("userName",user.userName)
            sessionStorage.setItem("userAvatar",user.userAvatar)
          }
          that.$router.push({ path: '/' })
        }else{
          // sessionStorage.setItem('email', that.email)
          // sessionStorage.setItem('password', response.data.password)
          that.error = result.errorMsg
          that.captchaObj.reset()
        }
      }).catch(function (error) {
        if (!that.email) {
          that.error = '邮箱不能为空'
        } else {
          console.log(error)
          that.$route.matched[0].meta = {
            requiresAuth: true
          }
        }
      })
    }
  }
}
</script>
