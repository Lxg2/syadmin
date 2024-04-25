/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const caseRouter = {
  path: '/case',
  component: Layout,
  redirect: '/case/list',
  name: 'case',
  meta: {
    title: '资讯管理',
    icon: 'case',
    channelname: "zixun",
  },
  children: [{
      path: 'list',
      component: () => import('@/views/case'),
      name: 'List',
      meta: {
        title: '资讯管理',
        channelname: "zixun",
      }
    }, {
      path: 'caseadd',
      component: () => import('@/views/case/add.vue'),
      name: 'CaseAdd',
      meta: {
        title: '新建资讯',
        channelname: "zixun",
        noCache: true,
        activeMenu: '/case/list'
      },
      hidden: true,
    },
    {
      path: 'caseedit',
      component: () => import('@/views/case/edit.vue'),
      name: 'CaseAdd',
      meta: {
        title: '编辑资讯',
        channelname: "zixun",
        noCache: true,
        activeMenu: '/case/list'
      },
      hidden: true,
    }
  ]
}
export default caseRouter
