import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'https://syzw.qiieer.net', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
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
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
   config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
   config.headers = {
     'Content-Type':'application/json' //配置请求头
   }
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] ='Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

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
    // if(res.datalist?.Hotstr){
    //   alert(9)
    // }
    // console.log(res);
    // if the custom code is not 20000, it is judged as an error
      if(res.datalist?.Hotstr){
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
      res.datalist.Hotstr = hotstr.join(',')
    }
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

export default service
