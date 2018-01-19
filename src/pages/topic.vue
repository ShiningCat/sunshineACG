<template>
<div class="container">
  <div class="row">
   <div id="mainstay"  class="col-md-8">
    <div id="article-list" v-for="theme in themes">
      <div class="article well clearfix mybody3"  >
        <div style="height:30px;">
          <span >
            <span class="author-avatar" :href="'/user/'+ theme.themeUserId">
              <img v-if="theme.userAvatar" class="avatar avatar-30 wp-user-avatar wp-user-avatar-30 alignnone photo" width="30" height="30" :src="theme.userAvatar" />
              <img v-else class="avatar avatar-30 wp-user-avatar wp-user-avatar-30 alignnone photo" width="30" height="30" :src="userAvatar" />
            </span>
              <span class="lh30 ml15">
                <a class="" :href="'/user/'+ theme.themeUserId">{{theme.themeUserName}}</a>
              </span>
              <span class="lh30 ml15">{{theme.introduce}}</span> 
          </span>
        </div>
          <div class="ContentItem AnswerItem">
            <div class="ContentItem-meta" >
              <h4 style="" class="ContentItem-title">
                <a target="_blank" :href="'/theme/'+ theme.themeId">{{theme.themeName}}</a>
              </h4>
            </div>
            <div class="RichContent is-collapsed">
              <div class="">
              <p class="">{{theme.themeContent}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="zan-page" class="clearfix">
        <ul class="pagination pagination-zan pull-right">
          <li v-if="pageNum>1"><a to="" v-on:click="pageNum--,pageClick()">&laquo;</a></li>
          <li v-if="pageNum==1"><a to="" class="banclick">&laquo;</a></li>
          <li v-for="index in indexs"  v-bind:class="{ 'active': pageNum == index}">
              <a to="" v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li><span>...</span></li>
          <li v-if="pageNum!=pages"><a to="" v-on:click="pageNum++,pageClick()">&raquo;</a></li>
          <li v-if="pageNum == pages"><a to="" class="banclick">&raquo;</a></li>
          <li><a v-on:click="btnClick(pages)">{{pages}}</a></li>
        </ul>
      </div>
      <div id="respond" class="comment-respond">
        <h3 id="reply-title" class="comment-reply-title">
          <i class="fa fa-pencil"></i>发表帖子
          <small>
            <a rel="nofollow" id="cancel-comment-reply-link" href="/qianlianwanhua.html#respond" style="display:none;">取消回复</a></small>
        </h3>
        <p  v-if="isLogin" class="must-log-in">要发表帖子，您必须先<router-link to="/login" >登录</router-link>。</p>
        <div v-else id="commentform" class="comment-form" >
          <div id="smilelink">
            <!-- //TODO 表情 -->
          </div>
          <div style="margin-bottom: 10px;"><input  v-model="themeName" maxlength="50" class="form-control" type="text"  placeholder="标题" /></div>
          <textarea  placeholder="内容"  v-model="themeContent" cols="45" rows="8" maxlength="1000" ></textarea>
          <div id="loading" v-if="postFlag" >
            <i class="fa fa-spinner fa-spin"></i>正在提交, 请稍候...</div>
          <div id="error">{{error}}</div>
          <p class="form-submit">
            <input @click="postTheme"  type="button" id="submit" class="button" value="发表帖子" :disabled="postFlag">
          </p>
        </div>
      </div>
    </div>
    <aside class="col-md-4" id="sidebar">
      <aside id="zan_custom-3">
        <div class="panel panel-zan aos-init" aos="fade-up" aos-duration="2000">
        <div class="panel-heading">
          近期更新记录
        </div>
        <div class="panel-body custom">
          20171224 朝霞之歌 解决终章视频播放问题
        </div>
        </div>
      </aside>
    </aside>
  </div>
</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  components: {},
  data() {
    return {
      themeName: '',
      themeContent: '',
      error : '',
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      userAvatar: '/static/images/avatar.jpg',
      //第几页
      pageNum: 1,
      // 总页数
      pages: '',
      topicId: this.$route.params.topicId,
      themes: '',
      isLogin: false,
      postFlag: false
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
    this.getThemes(this.pageNum)
  },
  methods: {
    getThemes(page) {
      let that = this
      axios.get("http://localhost:2002/api/theme", {
        params: {
          page: page,
          topicId : that.topicId
        }
      })
      .then(function(response) {
        let result = response.data;
        if (result.success) {
          that.pageNum = result.obj.pageNum;
          that.pages = result.obj.pages;
          that.themes = result.obj.list;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    postTheme () {
      let that = this
      if (that.topicId == null){
        that.error = "这里不可以发帖"
        return
      }

      if (that.userId == null){
        that.error = "您还未登录,不可以发帖!"
        return
      }
      if (that.themeContent == '' || that.themeName == ''){
        that.error = "帖子标题和内容不能为空!"
        return
      }
      that.postFlag = true
      axios.post('http://localhost:2002/api/theme', qs.stringify({
        themeName: that.themeName,
        themeContent: that.themeContent,
        themeTopicId: that.topicId,
        themeUserId: that.userId,
        themeUserName: that.userName
      })).then(function (response) {
        var result = response.data
        if(result.success){
          that.getThemes(that.pageNum)
          $("html,body").animate({scrollTop:0}, 500)
          that.postFlag = false
          that.themeContent = ''
          that.themeName = ''
        }else{
          that.postFlag = false
          that.error = result.errorMsg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    btnClick: function(data){//页码点击事件
      if(data != this.pageNum){
        this.pageNum = data
        this.getThemes(this.pageNum)
      }
    },
    pageClick: function(){
      console.log('现在在'+this.pageNum+'页');
    }
  },
  computed: {
    indexs: function(){
      var left = 1;
      var right = this.pages;
      var ar = [];
      if(this.pages>= 5){
        if(this.pageNum > 3 && this.pageNum < this.pages-2){
                left = this.pageNum - 2
                right = this.pageNum + 2
        }else{
            if(this.pageNum<=3){
                left = 1
                right = 5
            }else{
                right = this.pages
                left = this.pages -4
            }
        }
      }
    while (left <= right){
        ar.push(left)
        left ++
    }
    return ar
    }
  }
}
</script>
<style>
.lh30{
  line-height:30px;
}
.ml15{
  margin-left: 15px;
}
textarea{outline:none;resize:none;}
</style>
