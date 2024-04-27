/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: "/space",
  component: Layout,
  redirect: "/space/spaceadmin",
  name: "spacemain",
  meta: {
    title: "空间管理",
    icon: "comp",
  },
  children: [
    {
      path: "spaceadmin",
      component: () => import("@/views/space"),
      name: "spaceadmin",
      meta: {
        title: "空间管理",
        channelname: "kongjian",
      },
    },
    {
      path: "spaceadminadd",
      component: () => import("@/views/space/add"),
      name: "spaceadminadd",
      meta: {
        title: "新建空间",
        noCache: true,
        activeMenu: "/space/spaceadmin",
        channelname: "kongjian",
      },
      hidden: true,
    },
    {
      path: "spaceadminedit",
      component: () => import("@/views/space/edit"),
      name: "spaceadminedit",
      meta: {
        title: "编辑空间",
        noCache: true,
        activeMenu: "/space/spaceadmin",
        channelname: "kongjian",
      },
      hidden: true,
    },
    {
      path: "spaceclass",
      component: () => import("@/views/space/policyClass/contact"),
      name: "spaceclass",
      meta: {
        title: "推荐榜管理",
        channelname: "kongjian",
      },
    },
    {
      path: "spaceclassadd",
      component: () => import("@/views/space/policyClass/add"),
      name: "spaceclassadd",
      meta: {
        title: "新建推荐类",
        noCache: true,
        activeMenu: "/space/spaceclass",
        channelname: "kongjian",
      },
      hidden: true,
    },
    {
      path: "spaceclassedit",
      component: () => import("@/views/space/policyClass/edit"),
      name: "spaceclassedit",
      meta: {
        title: "编辑推荐类",
        noCache: true,
        activeMenu: "/space/spaceclass",
        channelname: "kongjian",
      },
      hidden: true,
    },
    // 空间规格
    {
      path: "specification",
      component: () => import("@/views/space/specification/contact"),
      name: "specification",
      meta: {
        title: "空间规格",
        channelname: "guige",
      },
    },
    {
      path: "specificationadd",
      component: () => import("@/views/space/specification/add"),
      name: "specificationadd",
      meta: {
        title: "新建规格",
        noCache: true,
        activeMenu: "/space/specification",
        channelname: "guige",
      },
      hidden: true,
    },
    {
      path: "specificationedit",
      component: () => import("@/views/space/specification/edit"),
      name: "specificationedit",
      meta: {
        title: "编辑规格",
        noCache: true,
        activeMenu: "/space/specification",
        channelname: "guige",
      },
      hidden: true,
    },
  ],
};
export default compRouter
