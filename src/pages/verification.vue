<template>
  <div>
    <div class="page-content well text-center"> <h2>{{msg}}</h2> <p><router-link to="/login" class="btn btn-danger">去登录</router-link></p> </div>
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
      axios.get('http://localhost:2001/api/users/confirm_verification/' + code)
      .then(function (response) {
        if (response.data.success) {
          that.msg = '验证成功,快去登录吧'
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

