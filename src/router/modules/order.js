/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/list',
  name: 'order',
  meta: {
    title: '订单管理',
    icon: 'order'
  },
  children: [{
    path: 'detail',
    component: () => import('@/views/order/detail'),
    name: 'Detail',
    meta: {
      title: '订单详情',
      noCache: true,
      activeMenu: '/order/list'
    },
    //hidden: true
  }, {
    path: 'list',
    component: () => import('@/views/order/list'),
    name: 'List',
    meta: {
      title: '全部订单'
    }
  }]
}
export default orderRouter
