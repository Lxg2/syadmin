/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const finaRouter = {
  path: '/fina',
  component: Layout,
  redirect: '/fina/pay',
  name: 'fina',
  meta: {
    title: '财务管理',
    icon: 'fina'
  },
  children: [{
    path: 'pay-edit',
    component: () => import('@/views/fina/pay-edit'),
    name: 'PayEdit',
    meta: {
      title: '新增',
      noCache: true,
      activeMenu: '/fina/pay'
    },
    hidden: true
  }, {
    path: 'pay',
    component: () => import('@/views/fina/pay'),
    name: 'Pay',
    meta: {
      title: '支付设置'
    }
  }, {
    path: 'account',
    component: () => import('@/views/fina/acc'),
    name: 'Account',
    meta: {
      title: '账户明细'
    }
  }, {
    path: 'acc-det',
    component: () => import('@/views/fina/acc-det'),
    name: 'AccDet',
    meta: {
      title: '详情',
      noCache: true,
      activeMenu: '/fina/acc'
    },
    hidden: true
  }]
}
export default finaRouter
