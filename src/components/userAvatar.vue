<template>
  <aside id="zan_login-5" v-show="haslogged">
    <div class="panel panel-zan aos-init " aos="flip-right" aos-duration="3000">
      <div class="panel-heading">
        <i class="fa fa-quote-left"></i>欢迎！
        <i class="fa fa-quote-right"></i>
      </div>
      <div class="login-panel text-center">
        <img :src="userAvatar" width="60" height="60" alt="" class="avatar avatar-60 wp-user-avatar wp-user-avatar-60 photo avatar-default">
        <a class="user-name" :href="'/user/' + userId">{{userName}}</a>
        <span></span>
        <a class="btn btn-inverse-primary" :href="'/user/' + userId" title="个人中心">个人中心</a>
        <button class="btn btn-inverse-primary" @click="logout" title="退出登录">退出登录</button>
      </div>
    </div>
  </aside>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      haslogged: false,
      userAvatar: '/static/images/avatar.jpg',
      userName:'',
      userId: sessionStorage.getItem("userId"),
      token:''
    }
  },
  created() {
    this.checkLogin ()
  },
  methods: {
    checkLogin() {
      let that = this
      if( localStorage.getItem("token") != null ){
        var userName = localStorage.getItem("userName")
        var userAvatar = localStorage.getItem("userAvatar")
        that.userId = localStorage.getItem("userId")
        that.token = localStorage.getItem("token")
        if ( userAvatar != 'null' ) {
          that.userAvatar = userAvatar 
        }
        that.haslogged = true
      } else {
        if( sessionStorage.getItem("token") != null ){
          that.userName = sessionStorage.getItem("userName")
          var userAvatar = sessionStorage.getItem("userAvatar")
          that.userId = sessionStorage.getItem("userId")
          that.token = sessionStorage.getItem("token")
          if ( userAvatar != 'null' ) {
            that.userAvatar = userAvatar
          }
          that.haslogged = true
        }
      }
      
    },
    logout () {
      let that = this
      axios.delete('http://localhost:2001/api/token', {params: {token: that.token}})
      .then(function (response) {
        console.log(response)
        sessionStorage.clear()
        that.haslogged = false
        localStorage.clear()
        // console.log(that.$parent)
        // that.$parent.isLogin = true
        // location.reload()
        router.go(0)
      })
    }
  }
}
</script>

