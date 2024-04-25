import Layout from '@/layout'

const videoRouter = {
  path: "/partybuilding",
  component: Layout,
  redirect: "/partybuilding/elegant",
  name: "partybuilding",
  meta: {
    title: "党建管理",
    icon: "video",
    channelname: "dangjian",
  },
  children: [
    {
      path: "elegant",
      component: () => import("@/views/video/elegant/index.vue"),
      name: "elegant",
      meta: {
        title: "党建风采",
        channelname: "dangjianfengcai",
      },
    },
    {
      path: "elegantadd",
      component: () => import("@/views/video/elegant/elegantadd"),
      name: "elegantadd",
      meta: {
        title: "新建风采",
        channelname: "dangjianfengcai",
        activeMenu: "/partybuilding/elegant",
      },
      hidden: true,
    },
    {
      path: "elegantedit",
      component: () => import("@/views/video/elegant/elegantedit"),
      name: "elegantedit",
      meta: {
        title: "编辑风采",
        activeMenu: "/partybuilding/elegant",
        channelname: "dangjianfengcai",
      },
      hidden: true,
    },

    // {
    //   path: "buildingfwq",
    //   component: () =>
    //   import("@/views/video/partyfwq/building/building.vue"),
    //   name: "buildingfwq",
    //   meta: {
    //     title: "党群服务圈",
    //     activeMenu: "/partybuilding/buildingfwq",
    //     channelname: "dangjianfuwuquan",
    //   },
    // },
    // {
    //   path: "buildingaddfwq",
    //   component: () =>
    //     import("@/views/video/partyfwq/building/buildingadd.vue"),
    //   name: "buildingaddfwq",
    //   meta: {
    //     title: "新建服务圈",
    //     channelname: "dangjianfuwuquan",
    //     activeMenu: "/partybuilding/buildingfwq",
    //   },
    //   hidden: true,
    // },
    // {
    //   path: "buildingeditfwq",
    //   component: () =>
    //     import("@/views/video/partyfwq/building/buildingedit.vue"),
    //   name: "buildingeditfwq",
    //   meta: {
    //     title: "编辑服务圈",
    //     activeMenu: "/partybuilding/buildingfwq",
    //     channelname: "dangjianfuwuquan",
    //   },
    //   hidden: true,
    // },
    {
      path: "ads",
      component: () => import("@/views/video/partyfwq/community/index.vue"),
      name: "Ads",
      meta: {
        title: "党群服务圈",
        activeMenu: "/partybuilding/ads",
        channelname: "dangjianshequ",
      },
    },
    {
      path: "elegantaddsq",
      component: () =>
        import("@/views/video/partyfwq/community/communityadd.vue"),
      name: "elegantaddsq",
      meta: {
        title: "新建服务圈",
        activeMenu: "/partybuilding/ads",
        channelname: "dangjianshequ",
      },
      hidden: true,
    },
    {
      path: "eleganteditsq",
      component: () =>
        import("@/views/video/partyfwq/community/communityedit.vue"),
      name: "eleganteditsq",
      meta: {
        title: "编辑服务圈",
        activeMenu: "/partybuilding/ads",
        channelname: "dangjianshequ",
      },
      hidden: true,
    },
    {
      path: "register",
      component: () => import("@/views/video/video-add"),
      name: "register",
      meta: {
        title: "党员报到",
        channelname: "dangyuanbaodao",
        noCache: true,
      },
    },
    {
      path: "registeradd",
      component: () => import("@/views/video/baodao/add.vue"),
      name: "registeradd",
      meta: {
        title: "新建报到",
        channelname: "dangyuanbaodao",
        activeMenu: "/partybuilding/register",
        noCache: true,
      },
      hidden: true,
    },
    {
      path: "registeredit",
      component: () => import("@/views/video/baodao/edit.vue"),
      name: "registeredit",
      meta: {
        title: "编辑报到",
        channelname: "dangyuanbaodao",
        activeMenu: "/partybuilding/register",
        noCache: true,
      },
      hidden: true,
    },
    {
      path: "building",
      component: () => import("@/views/video/partyhuodo/partyavtivet"),
      name: "building",
      meta: {
        title: "党建活动",
        channelname: "dangjianhuodong",
      },
    },
    {
      path: "buildingadd",
      component: () => import("@/views/video/huodo/add.vue"),
      name: "buildingadd",
      meta: {
        title: "新建党建活动",
        channelname: "dangjianhuodong",
        activeMenu: "/partybuilding/building",
        noCache: true,
      },
      hidden: true,
    },
    {
      path: "buildingedit",
      component: () => import("@/views/video/huodo/edit.vue"),
      name: "buildingedit",
      meta: {
        title: "编辑党建活动",
        channelname: "dangjianhuodong",
        activeMenu: "/partybuilding/building",
        noCache: true,
      },
      hidden: true,
    },
    // {
    //   path: "activity",
    //   component: () => import("@/views/video/partyhuodo"),
    //   name: "activity",
    //   meta: {
    //     title: "党建活动",
    //     channelname: "dangjian",
    //   },
    //   children: [
        
    //     {
    //       path: "ads",
    //       component: () => import("@/views/video/partyhuodo/partyapply.vue"),
    //       name: "Ads",
    //       meta: {
    //         title: "报名管理",
    //         channelname: "dangjian",
    //       },
    //     },
    //   ],
    // },
  ],
};
export default videoRouter
