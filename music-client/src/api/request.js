import axios from 'axios'
import {BASE_URL} from './config'
import router from '../router'

axios.defaults.timeout = 5000;// 超时时间设置
axios.defaults.withCredentials = true;// true允许跨域
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';// Content-Type 响应头  https://blog.csdn.net/u014322206/article/details/84994596
/*element-upload组件默认的文件编码application/x-www-form-urlencoded是这个，但是上传文件需要的是multipart/form-data
https://blog.csdn.net/liushan633/article/details/84062905*/
if (process.env.NODE_ENV === 'production') {
  // 第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境
  if (process.env.VUE_APP_FLAG === 'pro') {
    // production 生产环境
    axios.defaults.baseURL = BASE_URL
  } else {
    // test 测试环境
    axios.defaults.baseURL = BASE_URL
  }
} else {
  // dev 开发环境
  axios.defaults.baseURL = BASE_URL
}

//添加响应拦截器
axios.interceptors.response.use(
  response => {
    //如果返回的状态码为200，说明接口请求成功可以正常拿到数据；否则的话抛出错误。
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  //服务器状态码不是2开头的的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 403:
          // console.log('管理员权限已修改请重新登录')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          // console.log('请求页面飞到火星去了')
          break
      }
      return Promise.reject(error.response)
    }
  }
);

/**
 * 封装get方法
 * @param url
 * @param params
 * @param responseType
 * @returns {Promise}
 */
export function get(url, params = {}, responseType = 'json') {
  //console.log(url,params,responseType,"click")
  //在创建promise的时候会执行((resolve, reject) => {}),即而通过axios来发送网络请求，然后根据返回的状态码来决定执行thne还是catch
  //如果是执行thne，那么就会执行promise的resolve方法，之后在触发promise的then方法。
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      responseType
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 *使用axios进行数据请求（之前使用的是ajax）
 */
export function post(url, data = {}) {
  console.log(url,data,"---------------");
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => resolve(response.data),
        err => reject(err)
      )
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
