/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const courierRouter = {
  path: '/courier',
  component: Layout,
  redirect: '/courier/par',
  name: 'courier',
  meta: {
    title: '配送管理',
    icon: 'courier'
  },
  children: [{
    path: 'param',
    component: () => import('@/views/courier/par'),
    name: 'Param',
    meta: {
      title: '参数设置'
    }
  }, {
    path: 'way',
    component: () => import('@/views/courier/way'),
    name: 'Way',
    meta: {
      title: '配送方式'
    }
  },{
    path: 'way-add',
    component: () => import('@/views/courier/way-add'),
    name: 'WayAdd',
    meta: {
      title: '新增',
      noCache: true,
      activeMenu: '/courier/way'
    },
    hidden: true
  }, {
    path: 'list',
    component: () => import('@/views/courier/list'),
    name: 'List',
    meta: {
      title: '地址管理'
    }
  }, {
    path: 'comp',
    component: () => import('@/views/courier/comp'),
    name: 'Comp',
    meta: {
      title: '快递公司'
    }
  },{
    path: 'comp-add',
    component: () => import('@/views/courier/comp-add'),
    name: 'CompAdd',
    meta: {
      title: '新增',
      noCache: true,
      activeMenu: '/courier/comp'
    },
    hidden: true
  }]
}
export default courierRouter
