<template>
<div class="container">
  <div class="row">
    <div id="mainstay"  class="col-md-8">
      <div id="article-list" v-for="topic in topics">
        <div id="dsds" class="article well clearfix mybody3 aos-init" aos="flip-up" aos-duration='1000'>
          <section class="hidden-xs">
            <div class="title-article">
              <h1><router-link :to="'/topic/'+ topic.topicId" ><span class="animated_h1">{{topic.topicName}}</span><br /><span class="label label-info" style="font-size:13px;"></span></router-link></h1>
            </div>
            <div class="tag-article">
              <!-- <span class="label label-zan"><i class="fa fa-eye"></i> 668,208 ℃</span>
              <span class="label label-zan"><i class="fa fa-comments"></i> <a href="https://www.mygalgame.com/gengxinrizhi.html#comment">740</a></span>  -->
            </div>
            <div class="alert alert-zan mybody3">
              <p style="text-align: center;"> <router-link :to="'/topic/'+ topic.topicId" > </router-link></p>
              <div class="ih-item square effect bottom_to_top">
              <router-link :to="'/topic/'+ topic.topicId" > 
                <div class="img">
                <img src="https://ws1.sinaimg.cn/large/005ODKsIgy1fip1i5u5v7j30iw0c7myf.jpg" alt="详细更新日志Ver.2" />
                <!-- <img :src="topic.topicImage" :alt="topic.topicName" /> -->
                </div>
                <div class="info">
                <p>{{topic.topicContent}}</p>
                </div> </router-link>
              </div>
              <router-link :to="'/topic/'+ topic.topicId" > </router-link>
              <p></p>
            </div>
          </section>
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
    </div>
    <aside class="col-md-4" id="sidebar">
    <aside id="zan_search-7">
      <div class="search aos-init " aos="fade-up" aos-duration="2000">
        <!-- TODO -->
        <form class="form-inline clearfix" method="get" id="searchform" action="">
        <input class="form-control" type="text" name="s" id="s" placeholder="" />
        <button type="submit" class="btn btn-danger btn-small" name="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </aside>
   <indexLogin></indexLogin>
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
   <aside id="zan_latest_comments-8">
    <div class="panel panel2 panel-zan hidden-xs aos-init " aos="fade-up" aos-duration="2000">
     <div class="panel-heading">
      <i class="fa fa-comments"></i> 最新评论
      <i class="fa fa-times-circle panel-remove"></i>
      <i class="fa fa-chevron-circle-up panel-toggle"></i>
     </div>
     <ul class="list-group list-group-flush">
       <!-- TODO -->
      <li class="list-group-item"> <span class="author-avatar"><img src="https://www.mygalgame.com/wp-content/uploads/2017/12/201712231005155.jpg" width="40" height="30" alt="一只狗" class="avatar avatar-40 wp-user-avatar wp-user-avatar-40 alignnone photo" /></span> <a href="https://www.mygalgame.com/qianlianwanhua.html/comment-page-4/#comment-28050" class="hint--left hint--rounded" data-hint2="《千恋＊万花》 一只狗："> <span class="comment-log"> 都是pc版的，手机请找kr版。。千恋万花吧应该有资源 </span> </a> </li>
     </ul>
    </div>
   </aside>
   <aside id="zan_rand_posts-12">
    <div class="panel panel2 panel-zan recent hidden-xs aos-init " aos="fade-up" aos-duration="2000">
     <div class="panel-heading">
      <i class="fa fa-refresh"></i> 随机文章
      <i class="fa fa-times-circle panel-remove"></i>
      <i class="fa fa-chevron-circle-up panel-toggle"></i>
     </div>
     <ul class="list-group list-group-flush">
       <!-- TODO -->
      <li class="list-group-item"> <span class="post-title"> <a href="https://www.mygalgame.com/discipline.html"> DISCIPLINE </a> </span> <span class="badge">42,138 ℃</span> </li>
     </ul>
    </div>
   </aside>
   <aside id="zan_hotest_posts-4">
    <div class="panel panel2 panel-zan hot hidden-xs aos-init " aos="fade-up" aos-duration="2000">
     <div class="panel-heading">
      <i class="fa fa-fire"></i> 最热文章
      <i class="fa fa-times-circle panel-remove"></i>
      <i class="fa fa-chevron-circle-up panel-toggle"></i>
     </div>
     <ul class="list-group list-group-flush">
       <!-- TODO -->
      <li class="list-group-item"> <span class="post-title"> <a href="https://www.mygalgame.com/%e9%98%b3%e5%85%89%e4%b8%8b%e7%9a%84%e7%9c%9f%e5%ae%9e.html" title="阳光下的真实"> 阳光下的真实 </a> </span> <span class="badge">994,488 ℃</span> </li>
     </ul>
    </div>
   </aside>
   <aside id="zan_sets-10">
    <div class="panel panel-zan hidden-xs aos-init" aos="fade-up" aos-duration="2000">
     <ul class="nav nav-pills pills-zan">
      <li class="active"><a href="#sidebar-links" data-toggle="tab">友情链接</a></li>
     </ul>
     <div class="tab-content">

      <div class="tab-pane active nav bs-sidenav fade in" id="sidebar-links">
        <!-- TODO -->
       <li><a href="http://kdays.net/days/" title="Galgame综合向论坛" target="_blank">KDays Forum</a></li>
       <li><a href="http://www.gal123.com/" title="绅士导航♂" target="_blank">绅士导航♂</a></li>
       <li><a href="http://www.moe123.com/" title="萌导航" target="_blank">萌导航</a></li>
      </div>
     </div>
    </div>
   </aside>
  </aside>
  </div>
</div>
</template>
<script>
import indexLogin from '../components/indexLogin.vue'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    indexLogin
  },
  data () {
    return {
      userAvatar: '/static/images/avatar.jpg',
      userName:localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      //第几页
      pageNum: 1,
      // 总页数
      pages: '',
      topics: ''
    }
  },
  mounted() {
    this.getTopics(this.pageNum)
  },
  methods: {
    getTopics(page) {
      let that = this
      axios.get('http://localhost:2002/api/topics', {
        params: {
          page: page
        }
      }).then(function (response) {
        let result = response.data
        if(result.success){
          that.pageNum = result.obj.pageNum
          that.pages = result.obj.pages
          that.topics = result.obj.list
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    btnClick: function(data){//页码点击事件
      if(data != this.pageNum){
        this.pageNum = data
        this.getTopics(this.pageNum)
      }
    },
    pageClick: function(){
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
