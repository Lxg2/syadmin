/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const datumRouter = {
  path: '/datum',
  component: Layout,
  redirect: '/datum/list',
  name: 'datum',
  meta: {
    title: '资料管理',
    icon: 'datum'
  },
  children: [{
    path: 'list',
    component: () => import('@/views/datum/list'),
    name: 'List',
    meta: {
      title: '资料列表'
    }
  },
  {
    path: 'publist',
    component: () => import('@/views/datum/pub'),
    name: 'UploadData',
    meta: {
      title: '上传资料'
    }
  },
  {
    path: 'pub-add',
    component: () => import('@/views/datum/pub-add'),
    name: 'PubAdd',
    meta: {
      title: '有资料',
      noCache: true,
      activeMenu: '/datum/pub'
    },
    //hidden: true 
  },
  {
    path: 'comment',
    component: () => import('@/views/datum/com'),
    name: 'Comment',
    meta: {
      title: '资料类别'
    }
  },
  {
    path: 'com-add',
    component: () => import('@/views/datum/com-add'),
    name: 'ComAdd',
    meta: {
      title: '新增分类',
      noCache: true,
      activeMenu: '/datum/com'
    },
    hidden: true 
  }
]
}
export default datumRouter
