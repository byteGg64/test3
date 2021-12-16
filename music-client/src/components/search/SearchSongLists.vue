<template>
  <div class="search-song-Lists">
    <content-list :contentList="albumDatas" path="song-list-album"/>
  </div>
</template>

<script>
  import mixin from '../../mixins'
  import ContentList from '../MusicItem'
  import {HttpManager} from '../../api/index'

  export default {
    name: 'search-song-Lists',
    mixins: [mixin],
    components: {
      ContentList
    },
    data() {
      return {
        albumDatas: []
      }
    },
    mounted() {
      this.getSearchList()
    },
    methods: {
      getSearchList() {
        if (!this.$route.query.keywords) return;
        HttpManager.getSongListOfLikeTitle(this.$route.query.keywords).then(res => {
          if (!res.length) {
            this.notify('暂无该歌曲内容', 'warning')
          } else {
            this.albumDatas = res
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../../assets/css/search-song-Lists.css';
</style>
