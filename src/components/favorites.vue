<template>
  <div id="article-list" >
    <div v-if="favorites.length != 0" class="article well clearfix mybody3"  id="comments" >
      <div class="List-item" v-for="fa in favorites">
        <div class="ContentItem-title">
            <router-link style="color:#1a1a1a;" :to="'/theme/'+ fa.favoriteThemeId"><h2><b>{{theme.favoriteThemeName}}</b></h2></router-link>
        </div>
        <div class="ContentItem-status">
          <span class="ContentItem-statusItem">{{theme.createTime | time('lll')}}</span>
          <span class="ContentItem-statusItem ml5">{{theme.themeReplyNumber}} 个回复</span>
        </div>
      </div>
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
    <div v-else class="article well clearfix mybody3"  id="comments" >
      <div style="text-align: center;"><h3>还没有收藏!</h3></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data (){
    return {
      pageUserId: this.$parent.$data.pageUserId,
      //第几页
      pageNum: 1,
      // 总页数
      pages: '',
      //总记录数
      total: 0,
      favorites:''
    }
  },
  created() {
    this.getFavorites(this.pageNum)
  },
  methods: {
    getFavorites(page) {
      let that = this
      axios.get('http://localhost:2001/api/users/'+ that.pageUserId +'/favorites', {
        params: {
          page: page
        }
      }).then(function(response) {
        let result = response.data;
        if (result.success) {
          that.favorites = result.obj.list
          that.pages = result.obj.pages
        //   that.pageNum = result.obj.pageNum
        }
      })
    },
    btnClick: function(data){//页码点击事件
      if(data != this.pageNum){
        this.pageNum = data
        this.getFavorites(this.pageNum)
        $("html,body").animate({scrollTop:$('#mainstay').offset().top}, 500)
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
    }
  }
}
</script>
