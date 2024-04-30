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
// // 获取企业无分类
// export function GetSelectCategoryqy(data) {
//   return fmreq({
//     url: '/api/admin/GetSelectCategory',
//     method: 'post',
//     data
//   })
// }


// 统一删除内容删除id
export function DeleteArticle(data) {
  return fmreq({
    url: '/api/admin/DeleteArticle',
    method: 'post',
    data
  })
}
// 统一删除分类id
export function DeleteCategory(data) {
  return fmreq({
    url: '/api/admin/DeleteCategory',
    method: 'post',
    data
  })
}

// 统一回显内容id
export function GetArtcileInfo(data) {
  return fmreq({
    url: '/api/admin/GetArtcileInfo',
    method: 'post',
    data
  })
}
// 统一内容列表
export function GetArtcileList(data) {
  return request({
    url: '/api/admin/GetArtcileList',
    method: 'post',
    data
  })
}

// 统一回显分类id
export function GetCategoryInfo(data) {
  return fmreq({
    url: '/api/admin/GetCategoryInfo',
    method: 'post',
    data
  })
}
// 统一分类列表
export function GetCategoryList(data) {
  return request({
    url: '/api/admin/GetCategoryList',
    method: 'post',
    data
  })
}

// 统一确定修改分类
export function UpdateCategory(data) {
  return request({
    url: '/api/admin/UpdateCategory',
    method: 'post',
    data
  })
}
//  统一确定修改内容
export function UpdateArticle(data) {
  return request({
    url: '/api/admin/UpdateArticle',
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
