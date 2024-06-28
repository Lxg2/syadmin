/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const caseRouter = {
  path: '/cover',
  component: Layout,
  redirect: '/cover/coveradmin',
  name: 'cover',
  meta: {
    title: '广告封面',
    icon: 'homefm',
    channelname: "fengmian",
  },
  children: [{
      path: 'coveradmin',
      component: () => import('@/views/cover'),
      name: 'coveradmin',
      meta: {
        title: '广告封面',
        channelname: "fengmian",
      }
    }, {
      path: 'coveradd',
      component: () => import('@/views/cover/add.vue'),
      name: 'coveradd',
      meta: {
        title: '新建封面',
        channelname: "fengmian",
        noCache: true,
        activeMenu: '/cover/coveradmin',
      },
      hidden: true,
    },
    {
      path: 'coveredit',
      component: () => import('@/views/cover/edit.vue'),
      name: 'coveredit',
      meta: {
        title: '编辑封面',
        channelname: "fengmian",
        noCache: true,
        activeMenu: '/cover/coveradmin'
      },
      hidden: true,
    }
  ]
}
export default caseRouter
