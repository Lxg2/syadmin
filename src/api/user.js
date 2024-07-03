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
    url: '/api/admin/GetUserInfo',
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
// 广告添加
export function SubmitAd(data) {
  return request({
    url: '/api/admin/SubmitAd',
    method: 'post',
    data
  })
}
// 获取广告列表
// /api/admin/GetAdList
export function GetAdList(data) {
  return request({
    url: '/api/admin/GetAdList',
    method: 'post',
    data
  })
}
// 删除广告
export function DeleteAd(data) {
  return fmreq({
    url: '/api/admin/DeleteAd',
    method: 'post',
    data
  })
}
// 修改广告数据
export function UpdateAd(data) {
  return request({
    url: '/api/admin/UpdateAd',
    method: 'post',
    data
  })
}
// 添加单表
export function SubmitContent(data) {
  return request({
    url: '/api/admin/SubmitContent',
    method: 'post',
    data,
    loading: true
  })
}
// 单表详情
export function GetContentInfo(data) {
  return fmreq({
    url: '/api/admin/GetContentInfo',
    method: 'post',
    data,
  })
}
// 修改单表数据
export function UpdateContent(data) {
  return request({
    url: '/api/admin/UpdateContent',
    method: 'post',
    data,
    loading: true
  })
}