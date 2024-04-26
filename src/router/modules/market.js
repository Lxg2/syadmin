/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: '/market',
  component: Layout,
  redirect: '/market/marketadmin',
  name: 'market',
  meta: {
    title: '市场管理',
    icon: 'comp',
  },
  children: [
    {
    path: 'marketadmin',
    component: () => import('@/views/market'),
    name: 'marketadmin',
    meta: {
      title: '市场管理',
      channelname:'shichang'
    }
  },
  {
    path: 'marketadminadd',
    component: () => import('@/views/market/add'),
    name: 'marketadminadd',
    meta: {
      title: '发布供应',
      noCache: true,
      activeMenu: '/market/marketadmin',
      channelname:'shichang'
    },
    hidden: true
  }, {
    path: 'spaceadminedit',
    component: () => import('@/views/market/edit'),
    name: 'spaceadminedit',
    meta: {
      title: '编辑供应',
      noCache: true,
      activeMenu: '/market/marketadmin',
      channelname:'shichang'
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
