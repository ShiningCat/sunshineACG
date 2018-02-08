<template>
<div class="container">
  <div class="row" style="width: 40%;margin-left: auto; margin-right: auto;padding-top: 50px;">
    <aside id="zan_login-5">
      <div class="panel panel-zan aos-init aos-animate" aos="flip-center" aos-duration="3000">
        <div style="text-align: center;" class="panel-heading"><span  style="float:left;"><router-link to="/login"><i class="fa fa-reply"></i></router-link></span><span>找回密码</span></div>
        <div class="login-form clearfix" action="" method="post">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-envelope-o"></i></div>
              <input class="form-control" v-model="email" placeholder="邮箱" type="text"  size="20">
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
          <div style="text-align: center;" >
            <button @click="sendMail" value="登录" class="btn btn-inverse-primary pull-center"  :disabled="isDisabled"  >发送邮件</button>
          </div>
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
  data () {
    return {
      email: '',
      code: '',
      geetest_challenge: '',
      geetest_validate: '',
      geetest_seccode: '',
      userId: '',
      gt_server_status: '',
      isDisabled: false,
      error: '',
      captchaObj: ''
    }
  },
  components: {
    captcha
  },
  created: function () {
    
  },
  methods: {
    sendMail () {
      let that = this
      if (that.email == ''){
        that.error = '请输入要重置密码的邮箱'
        return
      }
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(that.email)){
        that.error = '邮箱格式错误'
        return
      }
      if(that.geetest_validate == ''){
        that.error = '请点击验证码'
        return
      }
      that.isDisabled = true
      axios.post('http://localhost:2001/api/users/update_password/mail', qs.stringify({
        email: that.email,
        geetest_challenge: that.geetest_challenge,
        geetest_validate: that.geetest_validate,
        geetest_seccode: that.geetest_seccode,
        userId: that.userId,
        gt_server_status: that.gt_server_status
      }))
      .then(function (response) {
        if (response.data.success){
          that.error = '发送成功,请去邮箱点击您的重置密码链接'
          setTimeout(that.$router.push({ path: '/login' },5000))
        } else {
          that.isDisabled=true
          that.captchaObj.reset()
          that.error = response.data.errorMsg
        }
      })
      .catch(function (error) {
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
