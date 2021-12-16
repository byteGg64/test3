<template>
  <div class="song-list-album">
    <div class="album-slide">
      <!--歌曲封面-->
      <div class="album-img">
        <img :src=attachImageUrl(singers.pic) alt="">
      </div>
      <!--简介-->
      <div class="album-info">
        <h2>简介：</h2>
        <span>
          {{singers.introduction}}
        </span>
      </div>
    </div>
    <!--歌曲名字-->
    <div class="album-content">
      <div class="album-title">
        <p>{{singers.title}}</p>
      </div>
      <!--歌单评分+评价-->
      <div class="album-score">
        <div>
          <h3>歌单评分：</h3>
          <div>
            <el-rate v-model="value5" disabled/>
          </div>
        </div>
        <span>{{value5 * 2}}</span>
        <div>
          <h3>评分：</h3>
          <div @click="pushValue()">
            <el-rate v-model="value3" show-text allow-half/>
          </div>
        </div>
      </div>
      <div class="songs-body">
        <!--歌单-->
        <album-content :songList="listOfSongs">
          <template slot="title">歌单</template><!--把lbum-content组件里面名字为title的插槽的内容替换点-->
        </album-content>
        <!--评论-->
        <comment :playId="songListId" :type="1"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixins'
  import AlbumContent from '../components/SongListDetailOrSingerDetailContent'
  import Comment from '../components/Comment'
  import {mapGetters} from 'vuex'
  import {HttpManager} from '../api/index'

  export default {
    name: 'song-list-album',
    mixins: [mixin],
    components: {
      AlbumContent,
      Comment
    },
    data() {
      return {
        songLists: [],
        singers: {},
        count: 0, // 点赞数
        songListId: '', // 歌单ID
        value3: 0,
        value5: 0
      }
    },
    computed: {
      ...mapGetters([
        'loginIn', // 登录标识
        'tempList', // 单个歌单信息
        'listOfSongs', // 存放的音乐
        'userId', // 用户ID
        'avator' // 用户头像
      ])
    },
    created() {
      this.songListId = this.tempList.id;// 给歌单ID赋值
      this.singers = this.tempList;
      this.getSongId(); // 获取歌单里面的歌曲ID
      this.getEvaluate(this.songListId) // 获取评分
    },
    methods: {
      /**
       * 点击首页歌单栏里面的某个音乐，前端会利用router跳转到/song-list-album/xxx里面，这个路径对应着SongListDetail.vue
       * 当进入SongListDetail.vue的时候会发送/list/detail
       * /song/detail
       * /rank
       * /comment/songList/detail(这个请求是Comment.vue里面的getComment发送的。)
       * 4种类型的请求。
       */
      //收藏歌单里面的歌曲
      getSongId() {
        HttpManager.getListOfSongId(this.songListId)
          .then(res => {
            // 获取歌单里的歌曲信息
            for (let item of res) {
              this.getSongList(item.songId)
            }
            this.$store.commit('setListOfSongs', this.songLists)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 获取单里的歌曲
      getSongList(id) {
        HttpManager.getSongOfId(id)
          .then(res => {
            //this.songLists.push(res[0])  //原先
            this.songLists.push(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      //获取评分
      getEvaluate(id) {
        HttpManager.getEvaluateOfSongListId(id)
          .then(res => {
            this.value5 = res / 2
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 提交评分
      pushValue() {
        if (this.loginIn) {
          let params = new URLSearchParams();
          params.append('songListId', this.songListId);
          params.append('consumerId', this.userId);
          params.append('score', this.value3 * 2);
          HttpManager.setEvaluate(params)
            .then(res => {
              if (res.code === 1) {
                this.getEvaluate(this.songListId);
                this.notify('评分成功', 'success')
              } else if(res.code === 0) {
                this.notify('评分失败', 'error')
              }else if(res.code === 2)  {
                this.notify('该歌曲您已评分', 'success')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.value3 = null;
          this.notify('请先登录', 'warning')
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../assets/css/song-list-album.css';
</style>
