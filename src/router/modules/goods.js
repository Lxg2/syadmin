
import Layout from '@/layout'

const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/list',
  name: 'goods',
  meta: {
    title: '商品管理',
    icon: 'goods'
  },
  children: [{
    path: 'goods-add',
    component: () => import('@/views/goods/goods-add'),
    name: 'GoodsAdd',
    meta: {
      title: '添加商品',
      noCache: true,
      activeMenu: '/goods/list'
    },
    hidden: true
  }, {
    path: 'list',
    component: () => import('@/views/goods/list'),
    name: 'List',
    meta: {
      title: '商品列表'
    }
  }, {
    path: 'sort',
    component: () => import('@/views/goods/sort'),
    name: 'Sort',
    meta: {
      title: '商品分类'
    }
  },{
    path: 'sort-add',
    component: () => import('@/views/goods/sort-add'),
    name: 'SortAdd',
    meta: {
      title: '新增分类',
      noCache: true,
      activeMenu: '/goods/sort'
    },
    hidden: true
  },
  {
    path: 'comment',
    component: () => import('@/views/goods/com'),
    name: 'Comment',
    meta: {
      title: '商品评价'
    }
  }, {
    path: 'spec',
    component: () => import('@/views/goods/spec'),
    name: 'Spec',
    meta: {
      title: '商品规格'
    }
  },{
    path: 'spec-add',
    component: () => import('@/views/goods/spec-add'),
    name: 'SpecAdd',
    meta: {
      title: '新增规格',
      noCache: true,
      activeMenu: '/goods/spec'
    },
    hidden: true
  },{
    path: 'analysis',
    component: () => import('@/views/goods/ana'),
    name: 'Analysis',
    meta: {
      title: '商品分析'
    }
  },{
    path: 'detail',
    component: () => import('@/views/goods/dtl'),
    name: 'Detail',
    meta: {
      title: '数据分析',
      noCache: true,
      activeMenu: '/goods/ana'
    },
    hidden: true 
  }
]
}
export default goodsRouter
