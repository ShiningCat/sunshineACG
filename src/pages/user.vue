<template>
  <div class="container">
    <div class="article well clearfix mybody3">
      <div class="fl">
        <img v-if="user.userAvatar" id="avatar" @click="getPicture" width="160" height="160" :src="user.userAvatar" />
        <img v-else id="avatar" @click="getPicture" width="160" height="160" :src="userAvatar" />
        <input type="file" id="img" accept="image/png,image/jpeg"  @change="uploadImg($event)" />
      </div>
      <div style="height:70px;"></div>
      <div class="ProfileHeader-content">
        <div>
          <span class="name"><b>{{user.userName}}</b></span>
          <span class="introduce-user">{{user.introduce}}</span>
        </div>
        <div>
          <span class="sex"><i :class='"fa fa-spinner fa-" + user.sex'></i></span>
          <router-link to="/user/edit" class="btn btn-inverse-primary pull-center fr">编辑个人资料</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div id="mainstay"  class="col-md-8">
        <div class="article well clearfix mybody3">
          <div class="navbar-collapse bs-navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li v-for="(item,index) in tabs" :class="{userActive:index == num}" @click="tab(index)">
                <a><i :class="icon[index]"></i>{{item}}</a>
              </li>
            </ul>
          </div>
        </div>
        <userTheme v-if="showActivity && num == 0"></userTheme>
        <userReply v-else-if="showActivity && num == 1"></userReply>
        <userComment v-else-if="showActivity && num == 2"></userComment>
        <favorites v-else-if="showActivity && num == 3"></favorites>
        <div v-else-if="showActivity">
          <div class="article well clearfix mybody3" >
            <div class="List-item">
              <div class="ContentItem-title">
                  <h2><b>用户已设置隐私,您无法查看动态</b></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside class="col-md-4" id="sidebar">
      </aside>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import userTheme from '../components/userTheme.vue'
import userReply from '../components/userReply.vue'
import userComment from '../components/userComment.vue'
import favorites from '../components/favorites.vue'
export default {
  components: {
    userTheme,
    userReply,
    userComment,
    favorites
  },
  data (){
    return{
      tabs: ['帖子','回复','评论','收藏夹'],
      icon: ['fa fa-home','fa fa-book','fa fa-comments','fa fa-star'],
      num: 0,
      userAvatar: '/static/images/avatar.jpg',
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      userName : localStorage.getItem('userName'),
      pageUserId: this.$route.params.userId,
      user: { userId:'' },
      sex: localStorage.getItem("sex"),
      isLogin: false,
      isMyPage: false,
      isHide: false,
      showActivity: false
    }
  },
  created() {
    if (this.token == null){
      this.isLogin = true
    }
    if (this.pageUserId == this.userId) {
      this.isMyPage = true
      this.user.userId = this.userId
      this.user.userName = this.userName
      this.user.userAvatar = this.userAvatar
      this.user.sex = this.sex
      this.showActivity = true
    }else{
      this.getUser()
    }
  },
  methods: {
    getUser() {
      let that = this
      axios.get('http://localhost:2001/api/users/'+ that.pageUserId, {
      })
      .then(function(response) {
        let result = response.data
        if (result.success) {
          if (result.obj == null){
            // that.$router.push({ path: '/404' })
          } else {
            that.user = result.obj
            switch (that.user.sex) {
              case 1:that.sex = 'mars';break;
              case 2:that.sex = 'venus';break;
              default:that.sex = 'genderless';break;
            }
            that.user.sex = that.sex
            if(result.obj.userPrivacy == 0){
              that.showActivity = true
            }
          }
        }
      })
      .catch(function(error) {
      });
    },
    tab(index) {
      this.num = index;
    },
    getPicture () {
      $('#img').click()
    },
    uploadImg (event) {
      let tag = event.target
      let file = tag.files[0]
      let param = new FormData()
      param.append('file',file,file.name)
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }
      axios.post('http://localhost:2001/api/image',param,config)
      .then(function (response) {
        console.log(response.data)
      })
      .catch (function (error){
        console.log(error)
      })
    }
  }
}
</script>
