import axios from 'axios'
import { MessageBox, Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let loadingClose = null//关闭loading实例

//1. 创建新的axios实例，
const service = axios.create({
  // https://syzw.qiieer.net
  // baseURL: '/govcloud/syapi',
  // baseURL: 'https://syzw.qiieer.net',
  // baseURL: 'https://syzw.qiieer.net/govcloud/syapi',
  baseURL: 'https://baoanqifu.tgovcloud.com/govcloud/syapi', // url = base url + request
  timeout: 5 * 1000,
});
// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    if(config.loading){
      loadingClose = Loading.service({
        lock: true,
        text: '正在保存中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
    }
    if(config.data && config.data.hotstr){
      let hotstr = config.data.hotstr
      if(!Array.isArray(hotstr)){
        hotstr = hotstr.split(',');
      }
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
      if(Array.isArray(hotstr)){
        res.datalist.Hotstr =  hotstr.join(',')
      }else{
        res.datalist.Hotstr =  hotstr
      }
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
      if(loadingClose){
        loadingClose.close();
      }
      const res = response.data
      if(res.datalist && res.datalist.Hotstr){
        let hotstr = res.datalist.Hotstr
        if(!Array.isArray(hotstr)){
          hotstr = res.datalist.Hotstr.split(',')
        }
        hotstr.forEach((item,index) => {
          switch(item){
            case '1':
              hotstr[index] = '置顶';
              break;
            case '2':
              hotstr[index] = '热门';
              break;
            default:
              break;
          }
      })
      if(Array.isArray(hotstr)){
        res.datalist.Hotstr =  hotstr.join(',')
      }else{
        res.datalist.Hotstr =  hotstr
      }
    }
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
      if(loadingClose){
        loadingClose.close();
      }
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
export default service;
