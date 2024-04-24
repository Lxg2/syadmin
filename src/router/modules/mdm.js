import Layout from '@/layout'

const mdmRouter = {
  path: '/mdm',
  component: Layout,
  redirect: '/mdm/mall/index',
  name: 'mdm',
  meta: {
    title: '数据管理',
    icon: 'mdm'
  },
  children: [{
    path: 'mall',
    component: () => import('@/views/mdm/mall/index'),
    name: 'Mall',
    meta: {
      title: '商城数据',
      noCache: true,
      activeMenu: '/mdm/mall'
    },
  },
  {
    path: 'flow',
    component: () => import('@/views/mdm/mall/flow'),
    name: 'Flow',
    meta: {
      title: '流量看板',
      noCache: true,
      activeMenu: '/mdm/mall'
    },
    hidden: true
  },
  {
    path: 'deal',
    component: () => import('@/views/mdm/mall/deal/index'),
    name: 'Deal',
    meta: {
      title: '交易分析',
      noCache: true,
      activeMenu: '/mdm/mall'
    },
    hidden: true
  },
  {
    path: 'vis',
    component: () => import('@/views/mdm/mall/vis'),
    name: 'Visitor',
    meta: {
      title: '访客排行榜',
      noCache: true,
      activeMenu: '/mdm/mall'
    },
    hidden: true
  }, {
    path: 'pay',
    component: () => import('@/views/mdm/mall/pay'),
    name: 'Pay',
    meta: {
      title: '支付排行榜',
      noCache: true,
      activeMenu: '/mdm/mall'
    },
    hidden: true
  }, {
    path: 'applet',
    component: () => import('@/views/mdm/app/index'),
    name: 'Applet',
    meta: {
      title: '小程序数据'
    }
  }]
}
export default mdmRouter
