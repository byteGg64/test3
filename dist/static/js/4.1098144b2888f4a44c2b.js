webpackJsonp([4],{XiTZ:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Dd8w"),s=r.n(a),l=r("msXN"),i=r("NYxO"),o=r("bG3r"),n=r("gyMJ"),c={name:"info",mixins:[l.a],data:function(){return{registerForm:{username:"",password:"",sex:"",phoneNum:"",email:"",birth:"",introduction:"",location:""},cities:o.a}},computed:s()({},Object(i.b)(["userId"])),mounted:function(){this.getMsg(this.userId)},methods:{getMsg:function(e){var t=this;n.a.getUserOfId(e).then(function(e){t.registerForm.username=e.username,t.registerForm.password=e.password,t.registerForm.sex=e.sex,t.registerForm.birth=e.birth,t.registerForm.introduction=e.introduction,t.registerForm.location=e.location,t.registerForm.avator=e.avator}).catch(function(e){console.log(e)})},goback:function(){this.$router.go(-1)},saveMsg:function(){var e=this,t=new Date(this.registerForm.birth),r=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate(),a=new URLSearchParams;a.append("id",this.userId),a.append("username",this.registerForm.username),a.append("password",this.registerForm.password),a.append("sex",this.registerForm.sex),a.append("birth",r),a.append("introduction",this.registerForm.introduction),a.append("location",this.registerForm.location),n.a.updateUserMsg(a).then(function(t){1===t.code?(e.showError=!1,e.showSuccess=!0,e.$store.commit("setUsername",e.registerForm.username),e.$notify.success({title:"编辑成功",showClose:!0}),setTimeout(function(){this.$router.go(-1)},2e3)):(e.showSuccess=!1,e.showError=!0,e.$notify.error({title:"编辑失败",showClose:!0}))}).catch(function(e){console.log(e)})}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"info"},[r("p",{staticClass:"title"},[e._v("编辑个人资料")]),e._v(" "),r("hr"),e._v(" "),r("div",{staticClass:"personal"},[r("el-form",{staticClass:"demo-ruleForm",attrs:{model:e.registerForm,"label-width":"80px"}},[r("el-form-item",{attrs:{prop:"username",label:"用户名"}},[r("el-input",{attrs:{placeholder:"用户名"},model:{value:e.registerForm.username,callback:function(t){e.$set(e.registerForm,"username",t)},expression:"registerForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password",label:"密码"}},[r("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.registerForm.password,callback:function(t){e.$set(e.registerForm,"password",t)},expression:"registerForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"性别"}},[r("el-radio-group",{model:{value:e.registerForm.sex,callback:function(t){e.$set(e.registerForm,"sex",t)},expression:"registerForm.sex"}},[r("el-radio",{attrs:{label:0}},[e._v("女")]),e._v(" "),r("el-radio",{attrs:{label:1}},[e._v("男")])],1)],1),e._v(" "),r("el-form-item",{attrs:{prop:"birth",label:"生日"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.registerForm.birth,callback:function(t){e.$set(e.registerForm,"birth",t)},expression:"registerForm.birth"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"introduction",label:"签名"}},[r("el-input",{attrs:{type:"textarea",placeholder:"签名"},model:{value:e.registerForm.introduction,callback:function(t){e.$set(e.registerForm,"introduction",t)},expression:"registerForm.introduction"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"location",label:"地区"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"地区"},model:{value:e.registerForm.location,callback:function(t){e.$set(e.registerForm,"location",t)},expression:"registerForm.location"}},e._l(e.cities,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),r("div",{staticClass:"btn"},[r("div",{on:{click:function(t){return e.saveMsg()}}},[e._v("保存")]),e._v(" "),r("div",{on:{click:e.goback}},[e._v("取消")])])],1)])},staticRenderFns:[]};var d=r("VU/8")(c,u,!1,function(e){r("goze")},"data-v-02ce1b4a",null).exports,m={name:"upload",mixins:[l.a],data:function(){return{imageUrl:""}},computed:s()({},Object(i.b)(["userId"])),methods:{beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,r=e.size/1024/1024<10;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 10MB!"),t&&r},uploadUrl:function(){return this.$store.state.configure.HOST+"/user/avatar/update?id="+this.userId},handleAvatarSuccess:function(e,t){1===e.code?(this.imageUrl=URL.createObjectURL(t.raw),this.$store.commit("setAvator",e.avator),this.$message({message:"修改成功",type:"success"})):this.notify("修改失败","error")}}},v={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"upload"},[r("p",{staticClass:"title"},[e._v("修改头像")]),e._v(" "),r("hr"),e._v(" "),r("div",{staticClass:"section"},[r("el-upload",{attrs:{drag:"",action:e.uploadUrl(),"show-file-list":!1,"before-upload":e.beforeAvatarUpload,"on-success":e.handleAvatarSuccess}},[r("i",{staticClass:"el-icon-upload"}),e._v(" "),r("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),r("em",[e._v("修改头像")])]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过10M")])])],1)])},staticRenderFns:[]};var g={name:"setting",components:{Info:d,Upload:r("VU/8")(m,v,!1,function(e){r("r+UB")},"data-v-f0efa0ee",null).exports},data:function(){return{activeName:"个人信息",componentSrc:"Info",settingList:[{icon:"",name:"个人信息",path:"Info"},{icon:"",name:"修改头像",path:"Upload"}]}},methods:{handleClick:function(e){this.activeName=e.name,this.componentSrc=e.path}}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"setting"},[r("div",{staticClass:"leftCol"},[r("div",{staticClass:"settingsMainHeader"},[e._v("设置")]),e._v(" "),r("ul",{staticClass:"setting-aside"},e._l(e.settingList,function(t,a){return r("li",{key:a,class:{activeColor:e.activeName===t.name},on:{click:function(r){return e.handleClick(t)}}},[e._v("\n        "+e._s(t.name)+"\n      ")])}),0)]),e._v(" "),r("div",{staticClass:"contentCol"},[r(e.componentSrc,{tag:"component"})],1)])},staticRenderFns:[]};var b=r("VU/8")(g,p,!1,function(e){r("Zyl2")},"data-v-85cfe740",null);t.default=b.exports},Zyl2:function(e,t){},bG3r:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"a",function(){return s});var a={username:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],phoneNum:[{essage:"请选择日期",trigger:"blur"}],email:[{message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],birth:[{required:!0,type:"date",message:"请选择日期",trigger:"change"}],introduction:[{message:"请输入介绍",trigger:"blur"}],location:[{message:"请输入地区",trigger:"change"}]},s=[{value:"北京",label:"北京"},{value:"天津",label:"天津"},{value:"河北",label:"河北"},{value:"山西",label:"山西"},{value:"内蒙古",label:"内蒙古"},{value:"辽宁",label:"辽宁"},{value:"吉林",label:"吉林"},{value:"黑龙江",label:"黑龙江"},{value:"上海",label:"上海"},{value:"江苏",label:"江苏"},{value:"浙江",label:"浙江"},{value:"安徽",label:"安徽"},{value:"福建",label:"福建"},{value:"江西",label:"江西"},{value:"山东",label:"山东"},{value:"河南",label:"河南"},{value:"湖北",label:"湖北"},{value:"湖南",label:"湖南"},{value:"广东",label:"广东"},{value:"广西",label:"广西"},{value:"海南",label:"海南"},{value:"重庆",label:"重庆"},{value:"四川",label:"四川"},{value:"贵州",label:"贵州"},{value:"云南",label:"云南"},{value:"西藏",label:"西藏"},{value:"陕西",label:"陕西"},{value:"甘肃",label:"甘肃"},{value:"青海",label:"青海"},{value:"宁夏",label:"宁夏"},{value:"新疆",label:"新疆"},{value:"香港",label:"香港"},{value:"澳门",label:"澳门"},{value:"台湾",label:"台湾"}]},goze:function(e,t){},"r+UB":function(e,t){}});
//# sourceMappingURL=4.1098144b2888f4a44c2b.js.map