<template>
  <div class="search-songs">
    <album-content :songList="listOfSongs"/>
  </div>
</template>

<script>
import mixin from '../../mixins'
import AlbumContent from '../SongListDetailOrSingerDetailContent'
import { mapGetters } from 'vuex'

export default {
  name: 'search-songs',
  mixins: [mixin],
  components: {
    AlbumContent
  },
  computed: {
    ...mapGetters([
      'listOfSongs' // 存放的音乐
    ])
  },
  mounted () {
    this.getSong(); //当选项栏切换歌单的时候，这个时候还需要在发送请求，要不然会显示为空。
  }
}
</script>

<style lang="css" scoped>
@import '../../assets/css/search-songs.css';
</style>
