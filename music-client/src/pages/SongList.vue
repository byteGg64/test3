<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li
        v-for="(item, index) in songStyle"
        :key="index"
        :class="{active: item.name === activeName}"
        @click="handleChangeView(item.name)">
        {{item.name}}
      </li>
    </ul>
    <div class="song-content">
      <content-list :contentList="data" path="song-list-album"/>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="albumDatas.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentList from '../components/MusicItem'
  import {mapGetters} from 'vuex'
  import {songStyle} from '../assets/data/songList'
  import {HttpManager} from '../api/index'
  export default {
    name: 'song-list',
    components: {
      ContentList
    },
    data() {
      return {
        songStyle: songStyle, // 歌单导航栏类别
        activeName: '全部歌单',
        pageSize: 15, // 页数
        currentPage: 1, // 当前页
        albumDatas: [] // 歌单
      }
    },
    computed: {
      ...mapGetters([
        'songsList'
      ]),
      // 计算当前表格中的数据
      data() {
        return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    mounted() {
      this.handleChangeView('全部歌单')
    },
    methods: {
      // 获取当前页
      handleCurrentChange(val) {
        this.currentPage = val
      },
      // 获取歌单
      handleChangeView: function (name) {
        this.activeName = name;
        this.albumDatas = [];
        if (name === '全部歌单') {
          this.getSongList(this.cur_page)
        } else {
          this.getSongListOfStyle(name)
        }
      },
      // 获取全部歌单
      getSongList(page) {
        HttpManager.getSongList()
          .then(res => {
            this.currentPage = 1;
            this.albumDatas = res
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 通过类别获取歌单
      getSongListOfStyle(style) {
        HttpManager.getSongListOfStyle(style)
          .then(res => {
            this.currentPage = 1;
            this.albumDatas = res
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../assets/css/song-list.css';
</style>
