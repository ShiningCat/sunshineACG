<template>
<div id="captcha">
</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      captchaObj: ''
    }
  },
  created() {
    this.loadVerifyCode ()
  },
  methods: {
    loadVerifyCode () {
      let that = this
      let parentData = that.$parent._data
      axios.get('http://localhost:2001/api/verification/code?t=' + (new Date()).getTime())
      .then(function (response) {
        parentData.userId = response.data.userId
        parentData.gt_server_status = response.data.gt_server_status
        initGeetest({
          gt: response.data.gt,
          challenge: response.data.challenge,
          new_captcha: response.data.new_captcha,
          offline: !response.data.success,
          product: 'float', // 产品形式，包括：float，popup
          width: '100%'
        }, function (captchaObj) {
          $('#captcha').empty()
          captchaObj.appendTo('#captcha')
          captchaObj.onSuccess(function () {
            var result = captchaObj.getValidate();
            if(result != undefined) {
              parentData.geetest_challenge = result.geetest_challenge
              parentData.geetest_validate = result.geetest_validate
              parentData.geetest_seccode = result.geetest_seccode
              parentData.captchaObj = captchaObj
              parentData.isDisabled = false
            }
          })
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

