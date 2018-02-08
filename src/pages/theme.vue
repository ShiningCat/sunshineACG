<template>
  <div class="container">
    <div class="row">
      <div id="mainstay"  class="col-md-8">
        <article class="article container well a-rotateinLT mybody3">
          <div class="breadcrumb">
            <i class="fa fa-home"></i>
            <span typeof="v:Breadcrumb"><router-link rel="v:url" property="v:title" title="首页" to="/" class="taxonomy category">首页</router-link></span> &gt;
            <span typeof="v:Breadcrumb"><router-link rel="v:url" property="v:title" title="转到 帖子列表" :to="'/topic/'+ theme.themeTopicId"  class="taxonomy category">列表</router-link></span>
          </div>
          <div class="hidden-xs">
            <div class="title-article">
            <h1 >{{theme.themeName}}<br /><span class="label label-info" style="font-size:13px;"></span>
            </h1>
            </div>
            <div class="tag-article container">
            <span class="label label-zan"><i class="fa fa-calendar"></i> {{theme.createTime | time('L')}}</span>
            <span class="label label-zan"><i class="fa fa-user-o"></i> {{theme.themeUserName}}</span>
            </div>
          </div>
          <!-- 大型设备文章属性结束 -->
          <div class="centent-article">
            <figure class="thumbnail hidden-xs"></figure>
            <blockquote>
            <p><b><span style="font-size: 12pt;COLOR:#3399CC"><p>{{theme.themeContent}}</p></span></b></p>
            </blockquote>
            <footer class="article-footer">
            <div class="article-tags">
              <i class="fa fa-tags"></i>
              <!-- <a href="" rel="tag">柚子社</a>
              <a href="" rel="tag">纯爱</a>  -->
            </div>
            </footer>
            <!-- 标签 -->
            <div style="float:right">
            </div>
          </div>
        </article>
        <div id="comments-template">
          <div class="comments-wrap">
            <div id="comments" >
            <h3 id="comments-title" class="comments-header alert alert-info"><i class="fa fa-comments"></i> {{total}} 条回复</h3>
            <div id="loading-comments">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <ol class="commentlist">
              <li  class="comment byuser comment-author-zuiyurufeng even thread-even depth-1"  v-for="reply in replys">
                <article class="comment-body" :id="'comment-'+reply.replyId" >
                  <footer class="comment-meta">
                    <div class="comment-author vcard">
                      <img v-if="reply.userAvatar" width="59" height="59" :src="reply.userAvatar" class="avatar avatar-70wp-user-avatar wp-user-avatar-70 alignnone photo avatar-default"/>
                      <img v-else width="59" height="59" :src="userAvatar" class="avatar avatar-70wp-user-avatar wp-user-avatar-70 alignnone photo avatar-default" />
                      <b class="fn">{{reply.replyUserName}}</b>
                      <!-- <span class="introduce">{{reply.introduce}}</span> -->
                    </div>
                    <div class="comment-metadata">
                      <time datetime="2016-02-06T20:51:52+00:00"> {{reply.replyTime | time('llll')}} </time>
                    </div>
                  </footer>
                  <div class="comment-content">
                    <p>{{reply.replyContent}}</p>
                  </div>
                  <div class="reply">
                    <router-link v-if="isLogin" rel="nofollow" class="comment-reply-login" to="/login" >登录以评论</router-link>
                    <a v-else rel="nofollow" @click="openComment(reply.replyUserId, reply.replyId)" class="comment-reply-link"><b style="color:#8590a6;">{{reply.replyCommentNumber}} 条评论</b></a>
                  </div>
                </article>
                <div v-if="reply.replyId == replyId" class="comment-respond">
                  <h3 id="reply-title" class="comment-reply-title">
                    <i class="fa fa-pencil"></i> 评论
                    <small><a rel="nofollow" id="cancel-comment-reply-link" @click="callComment" >取消</a></small>
                  </h3>
                  <div id="comments" >
                    <div id="loading-comments">
                      <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <ol class="commentlist">
                      <li  class="comment byuser comment-author-zuiyurufeng even thread-even depth-1"  v-for="comment in comments">
                        <article class="comment-body" :id="'comment-'+comment.commentId" >
                          <footer class="comment-meta">
                            <div class="comment-author vcard">
                              <img v-if="comment.userAvatar" width="50" height="50" :src="comment.userAvatar" class="avatar avatar-70wp-user-avatar wp-user-avatar-70 alignnone photo avatar-default"/>
                              <img v-else width="50" height="50" :src="userAvatar" class="avatar avatar-70wp-user-avatar wp-user-avatar-70 alignnone photo avatar-default" />
                              <b class="fn">{{comment.commentUserName}}</b>
                              <!-- <span class="introduce">{{reply.introduce}}</span> -->
                            </div>
                            <div class="comment-metadata">
                              <time > {{comment.createTime | time('lll')}} </time>
                            </div>
                          </footer>
                          <div class="RichText">
                            <p>{{comment.commentContent}}</p>
                          </div>
                        </article>
                      </li>
                    </ol>
                    <div id="zan-page" class="clearfix ">
                      <ul class="pagination pagination-zan pull-right commentPage">
                        <li style="padding: 0px;"><a v-on:click="commentBtnClick(1)">1</a></li>
                        <li style="padding: 0px;" v-if="commentPageNum>1"><a to="" v-on:click="commentBtnClick(commentPageNum-1)">&laquo;</a></li>
                        <li style="padding: 0px;" v-if="commentPageNum==1"><a to="" class="banclick">&laquo;</a></li>
                        <li style="padding: 0px;" v-for="index in commentIndexs"  v-bind:class="{ 'active': commentPageNum == index}">
                          <a v-on:click="commentBtnClick(index)">{{ index }}</a>
                        </li>
                        <li style="padding: 0px;"><span>...</span></li>
                        <li style="padding: 0px;" v-if="commentPageNum != commentPages"><a v-on:click="commentBtnClick(commentPageNum+1)">&raquo;</a></li>
                        <li style="padding: 0px;" v-if="commentPageNum == commentPages"><a class="banclick">&raquo;</a></li>
                        <li style="padding: 0px;"><a v-on:click="commentBtnClick(commentPages)">{{commentPages}}</a></li>
                      </ul>
                    </div>
                  </div>
                  <div id="commentform" class="comment-form mt10 commentRes">
                    <input class="form-control" maxlength="100" v-model="commentContent" placeholder="写下你的评论..." />
                    <div class="error" v-if="commentPostFlag" >
                      <i class="fa fa-spinner fa-spin"></i>正在提交, 请稍候...</div>
                    <div v-if="!commentPostFlag" class="error" id="">{{commentError}}</div>
                    <span class="form-submit"><input @click="postComment" type="button" id="submit" class="button" value="评论" /></span>
                  </div>
                </div>
              </li>
            </ol>
            <div id="zan-page" class="clearfix">
              <ul class="pagination pagination-zan pull-right">
                <li><a v-on:click="btnClick(1)">1</a></li>
                <li v-if="pageNum>1"><a v-on:click="btnClick(pageNum-1)">&laquo;</a></li>
                <li v-if="pageNum==1"><a class="banclick">&laquo;</a></li>
                <li v-for="index in indexs"  v-bind:class="{ 'active': pageNum == index}">
                    <a to="" v-on:click="btnClick(index)">{{ index }}</a>
                </li>
                <li><span>...</span></li>
                <li v-if="pageNum!=pages"><a to="" v-on:click="btnClick(pageNum+1)">&raquo;</a></li>
                <li v-if="pageNum == pages"><a to="" class="banclick">&raquo;</a></li>
                <li><a v-on:click="btnClick(pages)">{{pages}}</a></li>
              </ul>
            </div>
            </div>
            <div id="respond" class="comment-respond">
              <h3 id="reply-title" class="comment-reply-title">
                <i class="fa fa-pencil"></i> 欢迎回复
              </h3>
              <p  v-if="isLogin" class="must-log-in">要发表回复，您必须先<router-link to="/login" >登录</router-link>。</p>
              <div v-else id="commentform" class="comment-form" >
                <div id="smilelink">
                  <!-- //TODO 表情 -->
                </div>
                <textarea placeholder="内容"  v-model="replyContent" cols="45" rows="8" maxlength="1000" ></textarea>
                <div id="loading" v-if="postFlag" >
                  <i class="fa fa-spinner fa-spin"></i>正在提交, 请稍候...</div>
                <div v-if="!postFlag" id="error">{{error}}</div>
                <p class="form-submit">
                  <input @click="postReply"  type="button" id="submit" class="button" value="发表回复" :disabled="postFlag">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <aside class="col-md-4" id="sidebar">
      </aside>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      replyContent: '',
      error : '',
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      userAvatar: '/static/images/avatar.jpg',

      //第几页
      pageNum: 1,
      // 总页数
      pages: '',
      //总记录数
      total: 0,
      theme:'',
      themeId: this.$route.params.themeId,
      replys: '',
      isLogin: false,
      postFlag: false,
      replyUserId : '',
      replyId: '',

      commentContent: '',
      comments: '',
      commentPageNum: 1,
      commentPages: '',
      commentTotal: 0,
      commentUserId: '',
      commentPostFlag: false,
      commentError:'',
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
    this.getTheme()
    this.getReplys(this.pageNum)
  },
  methods: {
    getReplys(page) {
      let that = this
      axios.get("http://localhost:2002/api/reply", {
        params: {
          page: page,
          themeId : that.themeId
        }
      })
      .then(function(response) {
        let result = response.data;
        if (result.success) {
          that.pageNum = result.obj.pageNum
          that.pages = result.obj.pages
          that.total = result.obj.total
          that.replys = result.obj.list
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    getComments(page) {
      let that = this
      axios.get("http://localhost:2002/api/comments", {
        params: {
          page: page,
          replyId : that.replyId
        }
      })
      .then(function(response) {
        let result = response.data
        if (result.success) {
          that.commentPageNum = result.obj.pageNum
          that.commentPages = result.obj.pages
          that.commentTotal = result.obj.total
          that.comments = result.obj.list
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    getTheme() {
      let that = this
      axios.get("http://localhost:2002/api/themes/" + that.themeId, {
      })
      .then(function(response) {
        let result = response.data;
        if(result.success){
          that.theme = result.obj
        }
      })
    },
    postReply () {
      let that = this
      if (that.themeId == null){
        that.error = "这里不可以回复"
        return
      }
      if (that.userId == null){
        that.error = "您还未登录,不可以回复!"
        return
      }
      if (that.replyContent == '' ){
        that.error = "回复内容不能为空!"
        return
      }
      that.postFlag = true
      axios.post('http://localhost:2002/api/reply', qs.stringify({
        replyThemeId : that.themeId,
        replyUserId: that.userId,
        replyUserName: that.userName,
        replyContent: that.replyContent,
      })).then(function (response) {
        var result = response.data
        if(result.success){
          that.getReplys(that.pages)
          $("html,body").animate({scrollTop:$('#respond').offset().top + 150 }, 500)
          that.postFlag = false
          that.replyContent = ''
        }else{
          that.postFlag = false
          that.error = result.errorMsg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    postComment () {
      let that = this
      if (that.replyId == null){
        that.commentError = "这里不可以评论~!"
        return
      }
      if (that.userId == null){
        that.commentError = "您还未登录,不可以回复!"
        return
      }
      if (that.commentContent == '' ){
        that.commentError = "回复内容不能为空!"
        return
      }
      that.commentPostFlag = true
      axios.post('http://localhost:2002/api/comments', qs.stringify({
        commentReplyId : that.replyId,
        commentUserId: that.userId,
        commentUserName: that.userName,
        commentContent: that.commentContent,
        replySomeone: 2
      })).then(function (response) {
        var result = response.data
        if(result.success){
          that.getComments(that.commentPages)
          $("html,body").animate({scrollTop:$('.commentRes').offset().top - 150 }, 500)
          that.commentPostFlag = false
          that.commentContent = ''
        }else{
          that.commentPostFlag = false
          that.commentError = result.errorMsg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    btnClick: function(data){//页码点击事件
      if(data != this.pageNum){
        this.pageNum = data
        this.getReplys(this.pageNum)
        $("html,body").animate({scrollTop:0}, 500)
      }
    },
    openComment: function(userId, replyId){
      if(this.replyUserId == ''){
        this.replyUserId = userId
        this.replyId = replyId
        this.getComments(this.commentPageNum)
      }
    },
    callComment: function (){
      this.replyUserId = ''
      this.replyId = ''
    },
    commentBtnClick: function(data){//页码点击事件
      if(data != this.commentPageNum){
        this.commentPageNum = data
        this.getComments(this.commentPageNum)
        // $("html,body").animate({scrollTop:0}, 500)
      }
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
    },
    commentIndexs: function(){
      var left = 1;
      var right = this.commentPages;
      var ar = [];
      if(this.commentPages>= 5){
        if(this.commentPageNum > 3 && this.commentPageNum < this.commentPages-2){
          left = this.commentPageNum - 2
          right = this.commentPageNum + 2
        }else{
          if(this.commentPageNum<=3){
            left = 1
            right = 5
          }else{
            right = this.commentPages
            left = this.commentPages -4
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
