/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const caseRouter = {
  path: '/case',
  component: Layout,
  redirect: '/case/list',
  name: 'case',
  meta: {
    title: '案例管理',
    icon: 'case',
  },
  children: [{
      path: 'list',
      component: () => import('@/views/case/list'),
      name: 'List',
      meta: {
        title: '案例列表'
      }
    }, {
      path: 'case-add',
      component: () => import('@/views/case/case-add'),
      name: 'CaseAdd',
      meta: {
        title: '发布案例',
        noCache: true,
        activeMenu: '/case/list'
      }
    }
  ]
}
export default caseRouter
