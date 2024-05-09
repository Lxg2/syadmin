/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: '/directseeding',
  component: Layout,
  redirect: '/directseeding/directseedingadminedit',
  name: 'directseeding',
  meta: {
    title: '影视直播管理',
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
    path: 'videosadmin',
    component: () => import('@/views/yingshi'),
    name: 'videosadmin',
    meta: {
      title: '影视管理',
      channelname:'video'
    },
  },
    {
      path: 'videosadminadd',
      component: () => import('@/views/yingshi/add'),
      name: 'videosadminadd',
      meta: {
        title: '新建影视',
        noCache: true,
        activeMenu: '/directseeding/videosadmin',
        channelname:'video'
      },
      hidden: true
    }, {
      path: 'videosadminedit',
      component: () => import('@/views/yingshi/edit'),
      name: 'videosadminedit',
      meta: {
        title: '编辑影视',
        noCache: true,
        activeMenu: '/directseeding/videosadmin',
        channelname:'video'
      },
      hidden: true
    },
    {
      path: 'directseedingadminedit',
      component: () => import('@/views/directseeding/edit'),
      name: 'directseedingadminedit',
      meta: {
        title: '直播管理',
        activeMenu: '/directseeding/directseedingadminedit',
        channelname:'zhibo',
        queryid:'8ee90c33-3dcd-4c24-8c3f-0b81a10bd52b'
      },
    },
  ]
}
export default compRouter
