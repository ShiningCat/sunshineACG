<template>
<div class="container">
  <div v-if="!success" class="row" style="width: 40%;margin-left: auto; margin-right: auto;padding-top: 50px;">
    <aside id="zan_login-5">
      <div class="panel panel-zan aos-init aos-animate" style="text-align: center;" aos="flip-center" aos-duration="3000">
        <div class="panel-heading"><span  style="float:left;"><router-link to="login/"><i class="fa fa-reply"></i></router-link></span>注册</div>
        <div class="login-form clearfix" action="" method="post">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user"></i></div>
              <input class="form-control" v-model="userName" minlength="3" maxlength='20' placeholder="昵称(至少3个字)" type="text" value="" size="20">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-envelope-o"></i></div>
              <input class="form-control" v-model="email" type="text" minlength='8' maxlength='80' placeholder="邮箱"  value="" size="80">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-lock"></i></div>
              <input class="form-control" type="password" v-model="password" placeholder="密码" minlength='7' maxlength='16'>
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
          <button  @click="registered" class="btn btn-inverse-primary pull-center" :disabled="isDisabled" >注册</button>
          </div>
        </div>
    </aside>
  </div>
  <div v-else>
    <div class="page-content well text-center"> <h2>注册成功,请去邮箱验证您的账号</h2> <p><router-link to="/login" class="btn btn-danger">去登录</router-link></p> </div>
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
      userName: '',
      email: '',
      password: '',
      geetest_challenge: '',
      geetest_validate: '',
      geetest_seccode: '',
      userId: '',
      gt_server_status: '',
      isDisabled: false,
      error: '',
      captchaObj: '',
      success:false
    }
  },
  created: function () {
    if(localStorage.getItem("token") != null){
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    registered () {
      let that = this
      if (that.email == '' || that.password == '' || that.userName == ''){
        that.error = '请输入注册信息'
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
      that.isDisabled=true
      axios.post('http://localhost:2001/api/users', qs.stringify({
        userName: that.userName,
        email: that.email,
        password: that.password,
        geetest_challenge: that.geetest_challenge,
        geetest_validate: that.geetest_validate,
        geetest_seccode: that.geetest_seccode,
        userId: that.userId,
        gt_server_status: that.gt_server_status
      }))
      .then(function (response) {

        if (response.data.success) {
          that.success = true
        } else {
          that.isDisabled=false
          that.captchaObj.reset()
          that.error = response.data.errorMsg
        }
      })
      .catch(function (error) {
      })
    }
  }
}
</script>
