import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

//1. 创建新的axios实例，
const service = axios.create({
  baseURL: 'https://syzw.qiieer.net',
  timeout: 8 * 1000,
});
// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    let {hotstr} = config.data
    if(hotstr){
      hotstr = hotstr.split(',');
      hotstr.forEach((item,index) => {
        switch(item){
          case '置顶':
            hotstr[index] = '1';
            break;
          case '热门':
            hotstr[index] = '2';
            break;
            default:
              break;
        }
      });
      config.data.hotstr = hotstr.join(',')
    }
    if (config.data instanceof FormData === false) {
      config.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      };
      let token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization =
          "Bearer " + localStorage.getItem("token");
      }
    } else {
      //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
      config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded", //配置请求头
      }; 
    }
        if (store.getters.token) {
          config.headers['Authorization'] = 'Bearer ' + getToken()
        }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */
  
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data
      console.log(res);
      // if the custom code is not 20000, it is judged as an error.
      if (res.status !== 200) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
          // to re-login
          MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
export default service;
