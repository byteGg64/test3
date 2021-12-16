webpackJsonp([8],{A82U:function(t,s,e){"use strict";var n=e("BO1k"),a=e.n(n),i=e("Dd8w"),o=e.n(i),c=e("msXN"),r=e("NYxO"),l=e("gyMJ"),u=e("WU9+"),d={name:"comment",mixins:[c.a],props:{playId:Number,type:Number},data:function(){return{commentList:[],userPic:[],userName:[],textarea:"",ZAN:u.a.ZAN}},computed:o()({},Object(r.b)(["id","userId","index","loginIn","avator"])),watch:{id:function(){this.getComment()}},mounted:function(){this.getComment()},methods:{getComment:function(){var t=this;l.a.getAllComment(this.type,this.playId).then(function(s){t.commentList=s;var e=!0,n=!1,i=void 0;try{for(var o,c=a()(s);!(e=(o=c.next()).done);e=!0){var r=o.value;t.getUsers(r.userId)}}catch(t){n=!0,i=t}finally{try{!e&&c.return&&c.return()}finally{if(n)throw i}}}).catch(function(t){console.log(t)})},getUsers:function(t){var s=this;l.a.getUserOfId(t).then(function(t){s.userPic.push(t.avator),s.userName.push(t.username)}).catch(function(t){console.log(t)})},postComment:function(){var t=this;if(this.loginIn){var s=new URLSearchParams;s.append("userId",this.userId),1===this.type?s.append("songListId",this.playId):0===this.type&&s.append("songId",this.playId),s.append("content",this.textarea),s.append("type",this.type),l.a.setComment(s).then(function(s){1===s.code?(t.textarea="",t.getComment(),t.notify("评论成功","success")):t.notify("评论失败","error")}).catch(function(t){console.log(t)})}else this.notify("请先登录","warning")},postUp:function(t,s,e){var n=this;if(this.loginIn){var a=new URLSearchParams;a.append("id",t),a.append("up",s+1),l.a.setLike(a).then(function(t){1===t.code&&(n.$refs.up[e].children[0].style.color="#2796dd",n.getComment())}).catch(function(t){console.log(t)})}else this.notify("请先登录","warning")}}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"comment"},[e("h2",[e("span",[t._v("评论")]),t._v(" "),e("span",{staticClass:"part__tit_desc"},[t._v("共 "+t._s(t.commentList.length)+" 条评论")])]),t._v(" "),e("div",{staticClass:"comment-msg"},[e("el-input",{staticClass:"comment-input",attrs:{type:"textarea",placeholder:"期待您的精彩评论...",rows:2},model:{value:t.textarea,callback:function(s){t.textarea=s},expression:"textarea"}})],1),t._v(" "),e("el-button",{staticClass:"sub-btn",attrs:{type:"primary"},on:{click:function(s){return t.postComment()}}},[t._v("发表评论")])],1),t._v(" "),t._l(t.commentList,function(s,n){return e("ul",{key:n,staticClass:"popular"},[e("li",[e("div",{staticClass:"popular-img"},[e("img",{attrs:{src:t.attachImageUrl(t.userPic[n]),alt:""}})]),t._v(" "),e("div",{staticClass:"popular-msg"},[e("ul",[e("li",{staticClass:"name"},[t._v(t._s(t.userName[n]))]),t._v(" "),e("li",{staticClass:"content"},[t._v(t._s(s.content))]),t._v(" "),e("li",{staticClass:"time"},[t._v(t._s(s.createTime))])])]),t._v(" "),e("div",{ref:"up",refInFor:!0,staticClass:"up",on:{click:function(e){return t.postUp(s.id,s.up,n)}}},[e("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":t.ZAN}})]),t._v("\n        "+t._s(s.up)+"\n      ")])])])})],2)},staticRenderFns:[]};var m=e("VU/8")(d,v,!1,function(t){e("KcCF")},"data-v-4d37f068",null);s.a=m.exports},KcCF:function(t,s){},VCbs:function(t,s){},"m+am":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("BO1k"),a=e.n(n),i=e("Dd8w"),o=e.n(i),c=e("msXN"),r=e("2z3r"),l=e("A82U"),u=e("NYxO"),d=e("gyMJ"),v={name:"song-list-album",mixins:[c.a],components:{AlbumContent:r.a,Comment:l.a},data:function(){return{songLists:[],singers:{},count:0,songListId:"",value3:0,value5:0}},computed:o()({},Object(u.b)(["loginIn","tempList","listOfSongs","userId","avator"])),created:function(){this.songListId=this.tempList.id,this.singers=this.tempList,this.getSongId(),this.getEvaluate(this.songListId)},methods:{getSongId:function(){var t=this;d.a.getListOfSongId(this.songListId).then(function(s){var e=!0,n=!1,i=void 0;try{for(var o,c=a()(s);!(e=(o=c.next()).done);e=!0){var r=o.value;t.getSongList(r.songId)}}catch(t){n=!0,i=t}finally{try{!e&&c.return&&c.return()}finally{if(n)throw i}}t.$store.commit("setListOfSongs",t.songLists)}).catch(function(t){console.log(t)})},getSongList:function(t){var s=this;d.a.getSongOfId(t).then(function(t){s.songLists.push(t)}).catch(function(t){console.log(t)})},getEvaluate:function(t){var s=this;d.a.getEvaluateOfSongListId(t).then(function(t){s.value5=t/2}).catch(function(t){console.log(t)})},pushValue:function(){var t=this;if(this.loginIn){var s=new URLSearchParams;s.append("songListId",this.songListId),s.append("consumerId",this.userId),s.append("score",2*this.value3),d.a.setEvaluate(s).then(function(s){1===s.code?(t.getEvaluate(t.songListId),t.notify("评分成功","success")):0===s.code?t.notify("评分失败","error"):2===s.code&&t.notify("该歌曲您已评分","success")}).catch(function(t){console.log(t)})}else this.value3=null,this.notify("请先登录","warning")}}},m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"song-list-album"},[e("div",{staticClass:"album-slide"},[e("div",{staticClass:"album-img"},[e("img",{attrs:{src:t.attachImageUrl(t.singers.pic),alt:""}})]),t._v(" "),e("div",{staticClass:"album-info"},[e("h2",[t._v("简介：")]),t._v(" "),e("span",[t._v("\n        "+t._s(t.singers.introduction)+"\n      ")])])]),t._v(" "),e("div",{staticClass:"album-content"},[e("div",{staticClass:"album-title"},[e("p",[t._v(t._s(t.singers.title))])]),t._v(" "),e("div",{staticClass:"album-score"},[e("div",[e("h3",[t._v("歌单评分：")]),t._v(" "),e("div",[e("el-rate",{attrs:{disabled:""},model:{value:t.value5,callback:function(s){t.value5=s},expression:"value5"}})],1)]),t._v(" "),e("span",[t._v(t._s(2*t.value5))]),t._v(" "),e("div",[e("h3",[t._v("评分：")]),t._v(" "),e("div",{on:{click:function(s){return t.pushValue()}}},[e("el-rate",{attrs:{"show-text":"","allow-half":""},model:{value:t.value3,callback:function(s){t.value3=s},expression:"value3"}})],1)])]),t._v(" "),e("div",{staticClass:"songs-body"},[e("album-content",{attrs:{songList:t.listOfSongs}},[e("template",{slot:"title"},[t._v("歌单")])],2),t._v(" "),e("comment",{attrs:{playId:t.songListId,type:1}})],1)])])},staticRenderFns:[]};var p=e("VU/8")(v,m,!1,function(t){e("VCbs")},"data-v-12eaef33",null);s.default=p.exports}});
//# sourceMappingURL=8.be74795e817386482a50.js.map