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
        channelname: "dangjian",
      },
    },
    {
      path: "elegantadd",
      component: () => import("@/views/video/elegant/elegantadd"),
      name: "elegantadd",
      meta: {
        title: "新建风采",
        channelname: "dangjian",
      },
      hidden: true,
    },
    {
      path: "elegantedit",
      component: () => import("@/views/video/elegant/elegantedit"),
      name: "elegantedit",
      meta: {
        title: "编辑风采",
        channelname: "dangjian",
      },
      hidden: true,
    },
    {
      path: "list",
      redirect: "/partybuilding/list/building",
      component: () => import("@/views/video/partyfwq"),
      name: "List",
      meta: {
        title: "党群服务管理",
        channelname: "dangjian",
      },
      children: [
        {
          path: "building",
          component: () =>
            import("@/views/video/partyfwq/building/building.vue"),
          name: "building",
          meta: {
            title: "党群服务圈",
            channelname: "dangjian",
          },
        },
        {
          path: "buildingadd",
          component: () =>
            import("@/views/video/partyfwq/building/buildingadd.vue"),
          name: "buildingadd",
          meta: {
            title: "新建服务圈",
            channelname: "dangjian",
          },
          hidden: true,
        },
        {
          path: "buildingedit",
          component: () =>
            import("@/views/video/partyfwq/building/buildingedit.vue"),
          name: "buildingedit",
          meta: {
            title: "编辑服务圈",
            channelname: "dangjian",
          },
          hidden: true,
        },
        {
          path: "ads",
          component: () => import("@/views/video/partyfwq/community/index.vue"),
          name: "Ads",
          meta: {
            title: "社区管理",
            channelname: "dangjian",
          },
        },
        {
          path: "elegantadd",
          component: () =>
            import("@/views/video/partyfwq/community/communityadd.vue"),
          name: "elegantadd",
          meta: {
            title: "新建社区",
            channelname: "dangjian",
          },
          hidden: true,
        },
        {
          path: "elegantedit",
          component: () =>
            import("@/views/video/partyfwq/community/communityedit.vue"),
          name: "elegantedit",
          meta: {
            title: "编辑社区",
            channelname: "dangjian",
          },
          hidden: true,
        },
      ],
    },
    {
      path: "register",
      component: () => import("@/views/video/video-add"),
      name: "register",
      meta: {
        title: "党员报到",
        channelname: "dangjian",
        noCache: true,
      },
    },
    {
      path: "activity",
      component: () => import("@/views/video/partyhuodo"),
      name: "activity",
      meta: {
        title: "党建活动",
        channelname: "dangjian",
      },
      children: [
        {
          path: "building",
          component: () => import("@/views/video/partyhuodo/partyavtivet"),
          name: "building",
          meta: {
            title: "活动管理",
            channelname: "dangjian",
          },
        },
        {
          path: "ads",
          component: () => import("@/views/video/partyhuodo/partyapply.vue"),
          name: "Ads",
          meta: {
            title: "报名管理",
            channelname: "dangjian",
          },
        },
      ],
    },
  ],
};
export default videoRouter
