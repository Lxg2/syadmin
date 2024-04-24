<template>
    <div class="dashboard-container">
      <div class="dashboard-top row-between mb32">
        <div class="dashboard-top-left flex1">
          <overview :overviewObj="overviewObj" />
        </div>
      </div>
      <survey-chart />
      <div class="shop-overview">
        <visitpage />
      </div>
    </div>
  </template>
  
  <script>
  import Overview from "./components/Overview";
  import SurveyChart from "./components/SurveyChart";
  import Visitpage from "./components/VisitPage";

  export default {
    name: "Dashboard",
    components: { Overview, SurveyChart, Visitpage },
    data() {
      return {
        overviewObj: {
          title: "小程序实时流量",
          time: "2023-02-28 11:42:01",
          data: [
            {
              text: "今日访问量",
              num: 4800,
              yesterday: 18990,
            },
            {
              text: "今日访客",
              num: 2938,
              yesterday: 3897,
            },
            {
              text: "今日新增用户",
              num: 293,
              yesterday: 189,
            },
            {
              text: "平均访问时长",
              num: '00:11:05',
              yesterday: '00:10:28',
            },
            {
              text: "用户总数",
              num: 293000,
              yesterday: +180,
            },
          ],
        },
      };
    },
    computed: {},
    created() {},
  };
  </script>
  <style lang="scss" scoped>
  .dashboard-container {
    overflow-y: auto;
  
    .shop-overview {
      ::v-deep {
        .overview-box {
          padding-bottom: 30px;
        }
        .overview-items {
          flex-wrap: wrap;
  
          .overview-item {
            padding-left: 24px;
            width: 18.75%;
            flex: none;
            margin-bottom: 12px;
          }
        }
      }
    }
  }

  ::v-deep .el-table {
    &::before{
        display: none;
    }
        th.is-leaf,
        td {
          border: none;
          overflow: auto;
        }
}
  </style>
  