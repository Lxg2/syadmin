/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const caseRouter = {
  path: '/announcementgogao',
  component: Layout,
  redirect: '/announcementgogao/gogao',
  name: 'announcementgogao',
  meta: {
    title: '公告管理',
    icon: 'case',
    channelname: "gonggao",
  },
  children: [{
      path: 'gogao',
      component: () => import('@/views/cgaogo'),
      name: 'gogao',
      meta: {
        title: '公告管理',
        channelname: "gonggao",
      }
    }, {
      path: 'gogaoadd',
      component: () => import('@/views/cgaogo/add.vue'),
      name: 'gogaoadd',
      meta: {
        title: '新建公告',
        channelname: "gonggao",
        noCache: true,
        activeMenu: '/announcementgogao/gogao'
      },
      hidden: true,
    },
    {
      path: 'gogaoedit',
      component: () => import('@/views/cgaogo/edit.vue'),
      name: 'gogaoedit',
      meta: {
        title: '编辑公告',
        channelname: "gonggao",
        noCache: true,
        activeMenu: '/announcementgogao/gogao'

      },
      hidden: true,
    }
  ]
}
export default caseRouter
