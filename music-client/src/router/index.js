import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


/*----------------------------------------------------------------------------*/
//Uncaught (in promise) Error: Navigation cancelled from "/" to "/song-list-album/6" with a new naviga
// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
//push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err)
};
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err)
};
//https://blog.csdn.net/weixin_43240445/article/details/111713465
/*----------------------------------------------------------------------------*/


/*path和component形成键值对，component代表映射该path的组件（页面）*/
const constantRoutes = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/pages/404')
  },
  {
    path: '/',
   /* name: 'main',*/  /*default child route. When navigating to this named route (:to="{name: 'main'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.*/
    component: () => import('@/pages/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/Home')
      },
      {
        path: '/song-list',
        name: 'song-list',
        component: () => import('@/pages/SongList')
      },
      {
        path: '/singer',
        name: 'singer',
        component: () => import('@/pages/Singer')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/pages/SearchResult')
      },
      {
        path: '/my-music',
        name: 'my-music',
        component: () => import('@/pages/MyMusic')
      },
      {
        path: '/login-in',
        name: 'login-in',
        component: () => import('@/pages/LoginIn')
      },
      {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('@/pages/SignUp')
      },
      /*登录之后/login-in和/sign-up会被取代*/
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/pages/Setting')
      },
      {
        path: '/song-list-album/:id',
        name: 'song-list-album',
        component: () => import('@/pages/SongListDetail')
      },
      {
        path: '/singer-album/:id',
        name: 'singer-album',
        component: () => import('@/pages/SingerDetail')
      },
      {
        path: '/lyric/:id',
        name: 'lyric',
        component: () => import('@/pages/Lyric')
      },
    ]
  }
];

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: (o, from, savedPosition) => ({x: 0, y: 0}),
  routes: constantRoutes
})
