/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const proRouter = {
  path: '/role',
  component: Layout,
  redirect: '/role/tic',
  name: 'role',
  meta: {
    title: '权限管理',
    icon: 'pro'
  },
  children: [{
    path: 'users',
    component: () => import('@/views/pro/tic'),
    name: 'users',
    meta: {
      title: '用户管理'
    }
  },{
    path: 'usersrole',
    component: () => import('@/views/pro/sec'),
    name: 'usersrole',
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'jurisdiction',
    component: () => import('@/views/pro/sec-add'),
    name: 'jurisdiction',
    meta: {
      title: '权限管理',
    },
  },
  , {
    path: 'tic-add',
    component: () => import('@/views/pro/tic-add'),
    name: 'TicAdd',
    meta: {
      title: '新增',
      noCache: true,
      activeMenu: '/pro/tic'
    },
    hidden: true
  },
  {
    path: 'goodsad',
    component: () => import('@/views/pro/goodsad'),
    name: 'GoodsAd',
    meta: {
      title: '新增',
      noCache: true,
      activeMenu: '/pro/tic-add'
    },
    hidden: true
  }]
}
export default proRouter
