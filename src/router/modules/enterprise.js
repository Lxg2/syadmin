// 企业管理
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: '/enterprise',
  component: Layout,
  redirect: '/enterprise/enterpriseadmin',
  name: 'enterprise',
  meta: {
    title: '企业管理',
    icon: 'comp',
  },
  children: [
    {
    path: 'enterpriseadmin',
    component: () => import('@/views/enterprise'),
    name: 'enterpriseadmin',
    meta: {
      title: '企业管理',
      channelname:'qiye'
    }
  },
  {
    path: 'enterpriseadminadd',
    component: () => import('@/views/enterprise/add'),
    name: 'enterpriseadminadd',
    meta: {
      title: '新建企业',
      noCache: true,
      activeMenu: '/enterprise/enterpriseadmin',
      channelname:'qiye'
    },
    hidden: true
  }, {
    path: 'enterpriseadminedit',
    component: () => import('@/views/enterprise/edit'),
    name: 'enterpriseadminedit',
    meta: {
      title: '编辑企业',
      noCache: true,
      activeMenu: '/enterprise/enterpriseadmin',
      channelname:'qiye'
    },
    hidden: true
  },
  {
    path: 'enterpriseclass',
    component: () => import('@/views/enterprise/policyClass/contact'),
    name: 'enterpriseclass',
    meta: {
      title: '企业产品',
      channelname:'qiye'
    },
  },
    {
      path: 'enterpriseclassadd',
      component: () => import('@/views/enterprise/policyClass/add'),
      name: 'enterpriseclassadd',
      meta: {
        title: '新建企业产品',
        noCache: true,
        activeMenu: '/enterprise/enterpriseclass',
        channelname:'qiye'
      },
      hidden: true
    }, {
      path: 'enterpriseclassedit',
      component: () => import('@/views/enterprise/policyClass/edit'),
      name: 'enterpriseclassedit',
      meta: {
        title: '编辑企业产品',
        noCache: true,
        activeMenu: '/enterprise/enterpriseclass',
        channelname:'qiye'
      },
      hidden: true
    },
  ]
}
export default compRouter
