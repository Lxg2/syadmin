import request from '@/utils/request'
import fmreq from '@/utils/reqformdata'

export function login(data) {
  return fmreq({
    url: '/api/admin/AdminLogin',
    method: 'post',
    data
  })
}

// 添加统一接口
export function allAddreq(data) {
  return request({
    url: '/api/admin/AddArtcile',
    method: 'post',
    data
  })
}
// 添加统一分类
export function allAddCategoryreq(data) {
  return request({
    url: '/api/admin/AddCategory',
    method: 'post',
    data
  })
}
// 获取分类无分页
export function GetSelectCategory(data) {
  return fmreq({
    url: '/api/admin/GetSelectCategory',
    method: 'post',
    data
  })
}



export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
