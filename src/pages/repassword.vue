<template>
<div class="container">
  <div class="row" style="width: 40%;margin-left: auto; margin-right: auto;padding-top: 50px;">
    <aside id="zan_login-5">
      <div v-if="repasswordPage" class="panel panel-zan aos-init aos-animate" style="text-align: center;"  aos="flip-center" aos-duration="3000">
        <div class="panel-heading">重置</div>
        <div class="login-form clearfix">
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
          <button  @click="repassword" value="提交" :disabled="isDisabled" class="btn btn-inverse-primary pull-center">提交</button>
          </div>
        </div>
        <h2 style="color:red;">{{msg}}</h2>
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
      repasswordPage: false,
      password: '',
      geetest_challenge: '',
      geetest_validate: '',
      geetest_seccode: '',
      userId: '',
      gt_server_status: '',
      isDisabled: false,
      error: '',
      captchaObj: '',
      msg: ''
    }
  },
  mounted: function() {
    this.checkCode ()
  },
  methods: {
    // 验证找回密码链接是否有效
    checkCode () {
      var code = this.$route.params.code
      let that = this
      axios.get('http://localhost:2001/api/users/update_password/' + code)
      .then(function (response) {
        if (response.data.success) {
          that.repasswordPage = true
        } else {
          that.msg = response.data.errorMsg
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    repassword () {
      var code = this.$route.params.code
      let that = this
      that.isDisabled = true
      axios.put('http://localhost:2001/api/users/update_password/', qs.stringify({
        code: code,
        password: that.password,
        geetest_challenge: that.geetest_challenge,
        geetest_validate: that.geetest_validate,
        geetest_seccode: that.geetest_seccode,
        userId: that.userId,
        gt_server_status: that.gt_server_status
      })).then(function (response) {
        if (response.data.success) {
          that.error = response.data.obj
        } else {
          that.isDisabled=false
          that.captchaObj.reset()
          that.error = response.data.errorMsg
        }
      }).catch(function (error) {
      })
    }
  }
}
</script>
