<template>
  <div class="the-header">
    <!--图标-->
    <div class="header-logo" @click="goHome">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="ERJI"></use><!--https://www.w3school.com.cn/xlink/xlink_reference.asp-->
      </svg>
      <span>{{musicName}}</span>
    </div>
    <ul class="navbar" ref="change">
      <li :class="{active: item.name === activeName}" v-for="item in navMsg" :key="item.path"
          @click="goPage(item.path, item.name)">
        {{item.name}}
      </li>
      <li>
        <div class="header-search">
          <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords">
          <div class="search-btn" @click="goSearch()">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="SOUSUO"></use>
            </svg>
          </div>
        </div>
      </li>
      <li v-show="!loginIn" :class="{active: item.name === activeName}" v-for="item in loginMsg" :key="item.type"
          @click="goPage(item.path, item.name)">{{item.name}}
      </li>
    </ul>
    <!--设置-->
    <div class="header-right" v-show="loginIn">
      <div id="user">
        <img :src="attachImageUrl(avator)" alt="">
      </div>
      <ul class="menu">
        <li v-for="(item, index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixins'
  import {mapGetters} from 'vuex'
  import {navMsg, loginMsg, menuList} from '../assets/data/header'
  import {ICON} from '../assets/icon/index'

  export default {
    name: 'the-header',
    mixins: [mixin],
    data() {
      return {
        musicName: 'IMusic',
        navMsg: navMsg, // 左侧导航栏
        loginMsg: loginMsg, // 右侧导航栏
        menuList: menuList, // 用户下拉菜单项
        keywords: '',
        ERJI: ICON.ERJI,
        SOUSUO: ICON.SOUSUO
      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'activeName',
        'avator',
        'username',
        'loginIn'
      ])
    },
    mounted() {
      document.querySelector('#user').addEventListener('click', function (e) {
        document.querySelector('.menu').classList.add('show');
        e.stopPropagation()// 关键在于阻止冒泡
      }, false);
      // 点击“菜单”内部时，阻止事件冒泡。(这样点击内部时，菜单不会关闭)
      document.querySelector('.menu').addEventListener('click', function (e) {
        e.stopPropagation()
      }, false);
      document.addEventListener('click', function () {
        document.querySelector('.menu').classList.remove('show')
      }, false)
    },
    methods: {
      goHome() {
        this.$router.push({path: '/'})
      },
      goPage(path, value) {
        document.querySelector('.menu').classList.remove('show')
        this.changeIndex(value);
        if (!this.loginIn && path === '/my-music') {
          this.notify('请先登录', 'warning')
        } else {
          this.$router.push({path: path})
        }
      },
      changeIndex(value) {
        this.$store.commit('setActiveName', value)
      },
      goMenuList(path) {
        if (path === 0) {//如果是点击退出的话就把当前歌曲的收藏状态设置为false。
          this.$store.commit('setIsActive', false)
        }
        document.querySelector('.menu').classList.remove('show');//异常show菜单
        if (path) {
          this.$router.push({path: path})
        } else {
          this.$store.commit('setLoginIn', false);
          this.$router.push({path: '/'}); //设置退出，然后返回到登录界面  注意和this.$router.go(0)的先后顺序。
          this.$router.go(0)
        }
      },
      /**
       *用户输入歌名或者是歌手名，只会会调用goSearch方法
       * this.$router.push({path: '/search', query: {keywords: this.keywords}})跳转到Search.vue页面有会触发getSong方法
       * getSong方法发送/song/singerName/detail请求给后端，只会得到结果存储在listOfSong变量里面。
       * 然后在根据<component :is="currentView"/>标签看currentView的值来判定显示歌曲还是歌单。
       */
      goSearch() {
        this.$store.commit('setSearchword', this.keywords);
        this.$router.push({path: '/search', query: {keywords: this.keywords}})
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../assets/css/the-header.css';
</style>
