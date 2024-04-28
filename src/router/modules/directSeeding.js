/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: '/directseeding',
  component: Layout,
  redirect: '/directseeding/directseedingadminedit',
  name: 'directseeding',
  meta: {
    title: '直播管理',
    icon: 'zhibo',
  },
  children: [
  //   {
  //   path: 'directseedingadmin',
  //   component: () => import('@/views/directseeding'),
  //   name: 'directseedingadmin',
  //   meta: {
  //     title: '直播管理',
  //     channelname:'zhibo'
  //   }
  // },
  // {
  //   path: 'directseedingadminadd',
  //   component: () => import('@/views/directseeding/add'),
  //   name: 'directseedingadminadd',
  //   meta: {
  //     title: '新建直播',
  //     noCache: true,
  //     activeMenu: '/directseeding/directseedingadmin',
  //     channelname:'zhibo'
  //   },
  //   hidden: true
  // }, 
  {
    path: 'directseedingadminedit',
    component: () => import('@/views/directseeding/edit'),
    name: 'directseedingadminedit',
    meta: {
      noCache: true,
      activeMenu: '/directseeding',
      channelname:'zhibo',
      queryid:'8ee90c33-3dcd-4c24-8c3f-0b81a10bd52b'
    },
    hidden: true
  },
  // {
  //   path: 'spaceclass',
  //   component: () => import('@/views/market/policyClass/contact'),
  //   name: 'spaceclass',
  //   meta: {
  //     title: '空间分类',
  //     channelname:'shichang'
  //   },
  // },
  //   {
  //     path: 'spaceclassadd',
  //     component: () => import('@/views/market/policyClass/add'),
  //     name: 'spaceclassadd',
  //     meta: {
  //       title: '新建空间类',
  //       noCache: true,
  //       activeMenu: '/space/spaceclass',
  //       channelname:'shichang'
  //     },
  //     hidden: true
  //   }, {
  //     path: 'spaceclassedit',
  //     component: () => import('@/views/market/policyClass/edit'),
  //     name: 'spaceclassedit',
  //     meta: {
  //       title: '编辑空间类',
  //       noCache: true,
  //       activeMenu: '/space/spaceclass',
  //       channelname:'shichang'
  //     },
  //     hidden: true
  //   },
  ]
}
export default compRouter
