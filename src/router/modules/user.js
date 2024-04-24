/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [{
      path: 'list',
      component: () => import('@/views/user/list'),
      name: 'List',
      meta: {
        title: '用户列表'
      }
    }
    /* , {
        path: 'publist',
        component: () => import('@/views/user/pub'),
        name: 'Publist',
        meta: {
          title: '发布资讯'
        }
      }, {
        path: 'comment',
        component: () => import('@/views/user/com'),
        name: 'Comment',
        meta: {
          title: '评论列表'
        }
      } */
  ]
}
export default userRouter
