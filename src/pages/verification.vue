<template>
<div class="container">
  <div class="row" style="width: 40%;margin-left: auto; margin-right: auto;padding-top: 50px;">
    <h2 style="color:red;">{{msg}}</h2>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created () {
    this.verification()
  },
  methods: {
    verification () {
      var code = this.$route.params.code
      var that = this
      axios.get('http://localhost:2001/api/user/confirm_verification/' + code)
      .then(function (response) {
        if (response.data.success) {
          that.msg = '验证成功,快去登录吧'
          setTimeout(that.$router.push({ path: '/login' },4000))
        } else {
          that.msg = response.data.errorMsg
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

