<template>
  <div class="dealview-box card-box">
    <!-- 漏斗图 -->
    <FunnelData />
    <!-- 数据列表 -->
    <PayTabelVue />
    <!-- 交易构成 -->
    <PayingUserVue />
  </div>
</template>

<script>
/* import echarts from "echarts";
import { fetchList } from "@/api/article"; */
import Pagination from "@/components/Pagination";
import FunnelData from "./components/FunnelData.vue";
import PayTabelVue from "./components/PayTabel.vue";
import PayingUserVue from "./components/PayingUser.vue";

export default {
  name: "Dealview",
  components: { Pagination, FunnelData, PayTabelVue, PayingUserVue },
  // data() {
  //   return {
  //     chart: null,
  //     value: "",
  //     list: null,
  //     total: 0,
  //     listQuery: {
  //       page: 1,
  //       limit: 10,
  //     },
  //     radio: "",
  //     VisObj: {
  //       data: [
  //         {
  //           text: "访客数",
  //           num: 56000,
  //         },
  //       ],
  //     },
  //     dealviewObj: {
  //       title: "商店实时概况",
  //       time: "2023-03-28 11:42:01",
  //       data: [
  //         {
  //           text: "访问量",
  //           num: 5600,
  //           yesterday: 5364,
  //         },
  //         {
  //           text: "访客数",
  //           num: 2638,
  //           yesterday: 1897,
  //         },
  //         {
  //           text: "新增用户",
  //           num: 2938,
  //           yesterday: 1897,
  //         },
  //         {
  //           text: "支付人数",
  //           num: 10000,
  //           yesterday: 10909,
  //         },
  //         {
  //           text: "累计支付人数",
  //           num: 2000890,
  //           yesterday: 1900800,
  //         },
  //       ],
  //     },
  //     UserviewObj: {
  //       title: "交易构成",
  //       time: "2023-03-28 11:42:01",
  //       data: [
  //         {
  //           user: 5600,
  //           bargains: "75%",
  //           pct: 280.0,
  //           pay: 280000.0,
  //           bargains: "65%",
  //         },
  //         {
  //           user: 3600,
  //           bargains: "45%",
  //           pct: 248.0,
  //           pay: 178089.0,
  //           bargains: "40%",
  //         },
  //         {
  //           user: 2000,
  //           bargains: "30%",
  //           pct: 248.0,
  //           pay: 178089.0,
  //           bargains: "25%",
  //         },
  //       ],
  //     },
  //     tableData: [
  //       {
  //         day: "2023-03-02",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-04",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-01",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-03",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-02",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-04",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-01",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //       {
  //         day: "2023-03-03",
  //         paview: "100089",
  //         visitor: "1200",
  //         user: "1200",
  //         time: "00:12:45",
  //         usum: "200000",
  //       },
  //     ],
  //   };
  // },
  // created() {
  //   this.getList();
  // },

  // beforeDestroy() {
  //   if (!this.chart) {
  //     1;
  //     return;
  //   }
  //   this.chart.dispose();
  //   this.chart = null;
  // },
  // methods: {
  //   getList() {
  //     this.listLoading = true;
  //     fetchList(this.listQuery).then((response) => {
  //       this.list = response.data.items;
  //       this.total = response.data.total;
  //       this.listLoading = false;
  //     });
  //   },
  //   funnelChart() {
  //     this.chart = echarts.init(document.getElementById("Payment overview"));
  //     const chartOptions = {
  //       title: {
  //         text: "Funnel",
  //       },
  //       tooltip: {
  //         trigger: "item",
  //         formatter: "{a} <br/>{b} : {c}%",
  //       },
  //       toolbox: {
  //         feature: {
  //           dataView: { readOnly: false },
  //           restore: {},
  //           saveAsImage: {},
  //         },
  //       },
  //       legend: {
  //         data: ["Show", "Click", "Visit", "Inquiry", "Order"],
  //       },
  //      0, 5],
  //           width: 55,
  //         },
  //       },
  //       grid: {
  //         left: 12,
  //         right: 81,
  //         bottom: 47,
  //         containLabel: true,
  //       },
  //       xAxis: {
  //         type: "category",
  //         boundaryGap: false,
  //         data: [
  //           "2023-03-21",
  //           "2023-03-22",
  //           "2023-03-23",
  //           "2023-03-24",
  //           "2023-03-25",
  //           "2023-03-26",
  //           "2023-03-27",
  //         ],
  //         axisLine: {
  //           show: true,
  //           lineStyle: {
  //             color: "#E2E2E2",
  //             type: "solid",
  //           },
  //         },
  //         axisLabel: {
  //           fontSize: 14,
  //           color: "#999999",
  //         },
  //       },
  //       yAxis: {
  //         type: "value",
  //         splitLine: {
  //           lineStyle: {
  //             type: "dashed",
  //             color: "#E2E2E2",
  //           },
  //         },
  //         axisLine: {
  //           show: true,
  //           lineStyle: {
  //             color: "#E2E2E2",
  //             type: "solid",
  //           },
  //         },
  //         /* axisLabel: {
  //                   show: true,
  //                   interval: 0,
  //                   color: '#999999',
  //                   fontSize: 14,
  //                   formatter: '{value}%',
  //                 } */
  //       },
  //       toolbox: {
  //         show: false,
  //       },
  //       series: [
  //         {
  //           name: "访客数",
  //           type: "line",
  //           smooth: true,
  //           data: [320, 132, 201, 134, 90, 230, 210],
  //         },
  //         {
  //           name: "新增用户",
  //           type: "line",
  //           smooth: true,
  //           data: [220, 182, 291, 234, 290, 330, 310],
  //         },
  //         {
  //           name: "浏览量",
  //           type: "line",
  //           smooth: true,
  //           data: [350, 232, 201, 154, 190, 330, 410],
  //         },
  //         {
  //           name: "支付人数",
  //           type: "line",
  //           smooth: true,
  //           data: [130, 252, 191, 254, 210, 230, 310],
  //         },
  //       ],
  //     };
  //     this.chart.setOption(chartOptions);
  //   },
  //   payChart() {
  //     this.chart = echarts.init(document.getElementById("payuser"));
  //     const chartdeal = {
  //       color: ["#2B71FF", "#16D2A2"],
  //       tooltip: {
  //         trigger: "axis",
  //       },
  //       legend: {
  //         data: ["新用户", "老用户"],
  //         right: 87,
  //         itemGap: 40,
  //         itemWidth: 12,
  //         itemHeight: 12,
  //         icon: "circle",
  //         textStyle: {
  //           fontSize: 14,
  //           padding: [0, 0, 0, 5],
  //           width: 55,
  //         },
  //       },
  //       grid: {
  //         left: 12,
  //         right: 81,
  //         bottom: 47,
  //         containLabel: true,
  //       },
  //       xAxis: {
  //         type: "category",
  //         boundaryGap: false,
  //         data: [
  //           "2023-03-21",
  //           "2023-03-22",
  //           "2023-03-23",
  //           "2023-03-24",
  //           "2023-03-25",
  //           "2023-03-26",
  //           "2023-03-27",
  //         ],
  //       },
  //       yAxis: {
  //         type: "value",
  //         splitLine: {
  //           lineStyle: {
  //             type: "dashed",
  //           },
  //         },
  //       },
  //       toolbox: {
  //         show: false,
  //       },
  //       series: [
  //         {
  //           name: "新用户",
  //           type: "line",
  //           smooth: true,
  //           data: [320, 132, 201, 134, 90, 230, 210],
  //         },
  //         {
  //           name: "老用户",
  //           type: "line",
  //           smooth: true,
  //           data: [220, 182, 291, 234, 290, 330, 310],
  //         },
  //       ],
  //     };
  //     this.chart.setOption(chartdeal);
  //   },
  // },
  // mounted() {
  //   this.funnelChart(), this.PaymentChart(), this.payChart();
  // },
};
</script>

<style lang="scss" scoped>
.dealview-box {
  padding: 31px 47px 0 25px;
  font-family: Microsoft YaHei;

  //   .title {
  //     height: 19px;
  //     font-size: 20px;
  //     font-weight: bold;
  //     color: #333333;
  //   }

  //   .time {
  //     margin-left: 20px;
  //     line-height: 14px;
  //     font-size: 14px;
  //     color: #999999;
  //   }

  //   .dealview-items {
  //     .dealview-item {
  //       margin-right: 20px;
  //       padding-bottom: 24px;

  //       .text {
  //         line-height: 14px;
  //         font-size: 14px;
  //         color: #999999;
  //         margin: 22px 0;
  //       }

  //       .num-box {
  //         margin-bottom: 15px;
  //         display: flex;
  //         align-items: center;

  //         .num {
  //           line-height: 23px;
  //           font-size: 30px;
  //           font-weight: bold;
  //           color: #333333;
  //           margin-right: 11px;
  //         }
  //       }

  //       img {
  //         width: 20px;
  //         height: 20px;
  //       }

  //       .yesterday {
  //         line-height: 14px;
  //         font-size: 14px;
  //         font-weight: bold;
  //         color: #666666;
  //       }
  //     }
  //   }

  //   .left-component {
  //     flex-wrap: wrap;
  //     height: 432px;

  //     .hopper {
  //       flex-basis: calc(100% / 3);
  //       height: 30%;
  //       &.blue::before {
  //         background: #f8fbff;
  //       }
  //       &.green::before {
  //         background: #f2faf3;
  //       }
  //       &.yellow::before {
  //         background: #fef7e9;
  //       }

  //       .text {
  //         font-size: 14px;
  //         font-weight: 400;
  //         color: #999999;
  //         line-height: 54px;
  //         margin: 22px 0;
  //       }
  //       .num {
  //         line-height: 30px;
  //         font-size: 30px;
  //         font-weight: bold;
  //         color: #333333;
  //         margin-right: 11px;
  //       }
  //     }

  //     /*  &::before {
  //         content: "";
  //         position: relative;
  //         width: 12px;
  //         height: 12px;
  //         border-radius: 50%;
  //         display: inline-block;
  //         margin-right: 10px;
  //       }
  //     } */
  //     /* .numberVisitors {
  //       flex-basis: calc(100% / 3);
  //       height: 30%;
  //       background: #f8fbff;
  //     }
  //     .placeOrder {
  //       flex-basis: calc(100% / 3);
  //       height: 30%;
  //       background: #f2faf3;
  //     }
  //     .payoutStatus {
  //       flex-basis: calc(100% / 3);
  //       height: 30%;
  //       background: #fef7e9;
  //     } */
  //   }
  // }

  // .Chart-box {
  //   padding: 24px 0 0 24px;

  //   #Payment #payuser {
  //     width: 100%;
  //     height: 310px;
  //   }

  //   #funnel {
  //     // width: 500px;
  //     height: 432px;
  //   }
}

.row-between {
  margin: 90px 78px 37px 31px;
}

.foot {
  padding: 64px 73px 65px 965px;
}

::v-deep .el-radio-button--medium .el-radio-button__inner {
  margin-right: 20px;
  border: none;
  border-radius: 0;
}
</style>