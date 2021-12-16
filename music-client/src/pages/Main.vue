<template>
  <div>
    <the-header/><!--顶部操作栏-->
    <the-aside/><!--右边的播放列表-->
    <router-view class="music-content"/><!--滚动条+歌单+歌手    默认会跳转到Home-->
    <song-audio/><!--当前播放的是那首歌，是否需要暂停-->
    <play-bar/><!--音乐播放器-->
    <scroll-top/><!--返回top的按钮-->
    <the-footer/><!--版权信息-->
  </div>
</template>

<script>
  import TheHeader from '../components/TheHeader'
  import TheAside from '../components/TheAside'
  import SongAudio from '../components/SongAudio'
  import PlayBar from '../components/PlayBar'
  import ScrollTop from '../components/ScrollTop'
  import TheFooter from '../components/TheFooter'
  export default {
    components: {
      TheHeader,
      TheAside,
      SongAudio,
      PlayBar,
      ScrollTop,
      TheFooter,
    }
  }
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
</style>
