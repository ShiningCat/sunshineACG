<template>
  <aside id="zan_login-5">
    <div v-if="isLogin" id="login" class="panel panel-zan aos-init " aos="flip-right" aos-duration="3000">
     <div class="panel-heading">
      请登录
     </div>
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
      <p><label for="remember"><input name="remember" v-model="remember" type="checkbox" id="remember" value="" /> 记住我的登录信息</label>
      <a href="/forgot" title=" Password Lost and Found" style="color: #3d4450;float:right;font-weight:bold;padding:2px;">忘记密码？</a></p>
      <button class="btn btn-inverse-primary pull-left" @click="login" type="button" >登录</button>
      <a href="/registered" class="btn btn-inverse-primary pull-right">注册</a>
     </div>
    </div>
    <div v-else>
      <aside id="zan_login-5" >
        <div class="panel panel-zan aos-init " id="logout" aos="flip-right" aos-duration="3000">
          <div class="panel-heading">
            <i class="fa fa-quote-left"></i>欢迎！
            <i class="fa fa-quote-right"></i>
          </div>
          <div class="login-panel text-center">
            <img :src="userAvatar" width="60" height="60" alt="" class="avatar avatar-60 wp-user-avatar wp-user-avatar-60 photo avatar-default">
            <a class="user-name" :href="'/user/' + userId">{{userName}}</a>
            <span></span>
            <a class="btn btn-inverse-primary" :href="'/user/' + userId" title="个人中心">个人中心</a>
            <button class="btn btn-inverse-primary"   @click="logout" title="退出登录">退出登录</button>
          </div>
        </div>
      </aside>
    </div>
   </aside>
</template>
<script>
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
      captchaUserId: '',
      gt_server_status: '',
      error: '',
      captchaObj: '',
      isLogin: false,
      userAvatar: '/static/images/avatar.jpg',
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      token: localStorage.getItem("token"),
      //第几页
      pageNum: 1,
      // 总页数
      pages: '',
      topics: ''
    }
  },
  created() {
    if (this.token == null){
      if (sessionStorage.getItem("token") == null){
        this.isLogin = true;
      } else {
        this.token = sessionStorage.getItem("token")
        this.userId = sessionStorage.getItem("userId")
        this.userName = sessionStorage.getItem("userName")
      }
    }
  },
  methods: {
    login () {
      let that = this
      if (that.email == '' || that.password == ''){
        that.error = '请输入账号和密码'
        return
      }
      if(that.geetest_validate == ''){
        that.error = '请点击验证码'
        return
      }
      axios.post('http://localhost:2001/api/token', qs.stringify({
        email: that.email,
        password: that.password,
        geetest_challenge: that.geetest_challenge,
        geetest_validate: that.geetest_validate,
        geetest_seccode: that.geetest_seccode,
        userId: that.captchaUserId,
        gt_server_status: that.gt_server_status
      })).then(function (response) {
        var result = response.data
        if(result.success){
          var user = result.obj.userInfo
          if (that.remember){
            localStorage.setItem("token",result.obj.token)
            localStorage.setItem("userName",user.userName)
            localStorage.setItem("userAvatar",user.userAvatar)
            localStorage.setItem("userAvatar",user.userAvatar)
          }else{
            sessionStorage.setItem("userId",user.userId)
            sessionStorage.setItem("token",result.obj.token)
            sessionStorage.setItem("userName",user.userName)
            sessionStorage.setItem("userAvatar",user.userAvatar)
          }
          that.userId = user.userId
          that.userName = user.userName
          that.isLogin = false
          that.error = ''
          $("html,body").animate({scrollTop:90}, 500)
          $("html,body").animate({scrollTop:0}, 500)
        }else{
          // sessionStorage.setItem('email', that.email)
          // sessionStorage.setItem('password', response.data.password)
          that.error = result.errorMsg
          that.captchaObj.reset()
        }
      }).catch(function (error) {
        console.log(error)
        that.$route.matched[0].meta = {
            requiresAuth: true
        }
      })
    },
    logout () {
      let that = this
      axios.delete('http://localhost:2001/api/token', {params: {token: that.token}})
      .then(function (response) {
        sessionStorage.clear()
        that.isLogin = true
        localStorage.clear()
        $("html,body").animate({scrollTop:90}, 500)
        $("html,body").animate({scrollTop:0}, 500)
      })
    }
  }
}
</script>

</script>
