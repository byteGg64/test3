<!--搜索后出现的页面-->
<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span :class="{isActive: toggle === 'Songs'}" @click="handleChangeView('Songs')">歌曲</span>
      <span :class="{isActive: toggle === 'SongLists'}" @click="handleChangeView('SongLists')">歌单</span>
    </nav>
    <component :is="currentView"/><!--<component></component>标签是Vue框架自定义的标签，它的用途就是可以动态绑定我们的组件，根据数据的不同更换不同的组件-->
  </div>
</template>

<script>
import mixin from '../mixins'
import searchSongs from '../components/search/SearchSongs'
import searchSongLists from '../components/search/SearchSongLists'
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  mixins: [mixin],
  components: {
    searchSongs,
    searchSongLists
  },
  data () {
    return {
      toggle: 'Songs',
      currentView: 'searchSongs'
    }
  },
  computed: {
    ...mapGetters([
      'searchword'
    ])
  },
  watch: {
    searchword: function () { //在搜索栏里面点击或者回车只会会触发goSearch方法里面有把searchword的状态进行修改。
      this.getSong()
    }
  },
  methods: {
    // 切换组件
    handleChangeView: function (component) {
      this.currentView = 'search' + component;
      this.toggle = component
    }
  }
}
</script>

<style lang="css" scoped>
@import '../assets/css/search.css';
</style>
