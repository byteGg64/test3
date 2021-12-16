import { get, post } from './request'

const HttpManager = {
  /************************* 用户 API *************************/
  // 登录
  loginIn: (params) => post(`user/login/status`, params),
  //返回指定ID的用户
  getUserOfId: (id) => get(`user/detail?id=${id}`),
  // 注册
  SignUp: (params) => post(`user/add`, params),
  // 更新用户信息
  updateUserMsg: (params) => post(`user/update`, params),
  /************************* 歌单 API *************************/
  // 获取全部歌单
  getSongList: () => get('songList'),
  // 获取歌单类型
  getSongListOfStyle: (style) => get(`songList/style/detail?style=${style}`),
  /************************* SongList_Song API *************************/
  //SongList_Song（某个歌单里面的全部歌曲）
  getListOfSongId: (songListId) => get(`list/detail?songListId=${songListId}`),
  /************************* 歌手 API *************************/
  // 返回所有歌手
  getAllSinger: () => get('singer'),
  // 通过性别对歌手分类
  getSingerOfSex: (sex) => get(`singer/sex/detail?sex=${sex}`),
  /************************* 歌曲 API *************************/
  // 返回指定歌曲ID的歌曲
  getSongOfId: (id) => get(`song/detail?id=${id}`),
  //返回某id歌手的全部歌曲
  getSongOfSingerId: (id) => get(`song/singer/detail?singerId=${id}`),
  /************************* 收藏 *************************/
  //返回的指定用户ID的收藏列表
  getCollectionOfUser: (userId) => get(`collection/detail?userId=${userId}`),
  // 添加收藏的歌曲 type: 0 代表歌曲， 1 代表歌单
  setCollection: (params) => post(`collection/add`, params),
  /************************* 评分 API *************************/
  //获取指定歌单的评分
  getEvaluateOfSongListId: (songListId) => get(`evaluate?songListId=${songListId}`),
  // 提交评分
  setEvaluate: (params) => post(`evaluate/add`, params),
  /************************* 评论 API *************************/
  // 返回所有评论
  getAllComment: (type, id) => {
    let url = '';
    if (type === 1) {
      url = `comment/songList/detail?songListId=${id}`
    } else if (type === 0) {
      url = `comment/song/detail?songId=${id}`
    }
    return get(url)
  },
  // 添加评论
  setComment: (params) => post(`comment/add`, params),
  // 点赞
  setLike: (params) => post(`comment/like`, params),
  /************************* 搜索 API *************************/
  //返回指定歌手名或者是歌曲名
  getSongOfSingerName: (keywords) => get(`song/singerName/detail?name=${keywords}`),
  // 返回标题包含文字的歌单
  getSongListOfLikeTitle: (keywords) => get(`songList/likeTitle/detail?title=${keywords}`),
  // 下载音乐
  downloadMusic: (url) => get(url, {}, 'blob'),  /*Syntax Error: Unexpected token, expected , (46:2)  没加,*/

};

export { HttpManager }
