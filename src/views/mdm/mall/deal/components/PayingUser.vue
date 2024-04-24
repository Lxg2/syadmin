<template>
  <div class="paying-box">
    <div class="top row mb24">
      <div class="title">交易构成</div>
      <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
    </div>
    <ul class="dealview-items flex">
      <li
        class="dealview-item flex1"
        v-for="(item, index) in dealviewObj.data"
        :key="index"
      >
        <div class="text">{{ item.text }}</div>
        <div class="num-box">
          <div class="num">{{ item.num }}</div>
        </div>
      </li>
    </ul>

    <div class="mb24" style="margin-top: 50px;">
      <div class="flex mb40" style="align-items: center">
        <div class="mr20">
          <el-radio-group v-model="radio" size="medium">
            <el-radio-button label="1" border>近7天</el-radio-button>
            <el-radio-button label="2" border>近14天</el-radio-button>
            <el-radio-button label="3" border>近1个月</el-radio-button>
          </el-radio-group>
        </div>
        <div class="block mr20">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="Chart-box card-box mb32">
      <Myecharts :options="chartOptions2" height="450px"></Myecharts>
    </div>
  </div>
</template>

<script>
import Myecharts from '@/components/Echarts'
export default {
  components:{Myecharts},
  data() {
    return {
      chartOptions2 : {
        title: {
            text: '订单金额分布',
            left: 'left'
        },
          color: ['#723DF5', '#16D2A2'],
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['新用户', '老用户'],
              top:10,
              right: 0,
              itemGap: 40,
              itemWidth: 12,
              itemHeight: 12,
              icon: "circle",
              textStyle: {
                  fontSize: 14,
                  padding: [0, 0, 0, 5],
                  width: 55
              }
          },
          grid: {
              left: 0,
              top:100,
              right: 10,
              bottom: 50,
              containLabel: true
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [
                  '0',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
              ],
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#E2E2E2',
                  type: "solid"
                }
              },
              axisLabel: {
                fontSize: 14,
                color: '#999999',
              }
          },
          yAxis: {
              type: 'value',
              splitLine :{
                lineStyle :{
                    type:'dashed',
                    color: '#E2E2E2'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#E2E2E2',
                  type: "solid"
                }
              },
              axisLabel: {
                show: true,
                interval: 0,
                color: '#999999',
                fontSize: 14,
                formatter: '{value}%',
              }
          },
          toolbox: {
              show: false,
          },
          series: [
              {
                  name: '新用户',
                  type: 'line',
                  smooth: true,
                  data: [1000, 1200, 1320, 1010, 1340, 900, 2300, 2100, 2200, 1820, 1910, 2340, 2900, 3300, 310]
              },
              {
                  name: '老用户',
                  type: 'line',
                  smooth: true,
                  data: [1210, 100, 1220, 1110, 1040, 1000, 1300, 1500, 2200, 1820, 1910, 2340, 2900, 3300, 310]
              },
              
          ]
      },
      chart: null,
      value: "",
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      radio: "1",

      dealviewObj: {
        title: "商店实时概况",
        time: "2023-03-28 11:42:01",
        data: [
          {
            text: "访问量",
            num: 5600,
            yesterday: 5364,
          },
          {
            text: "访客数",
            num: 2638,
            yesterday: 1897,
          },
          {
            text: "新增用户",
            num: 2938,
            yesterday: 1897,
          },
          {
            text: "支付人数",
            num: 10000,
            yesterday: 10909,
          },
          {
            text: "累计支付人数",
            num: 2000890,
            yesterday: 1900800,
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },

  beforeDestroy() {
    if (!this.chart) {
      1;
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    payChart() {
      this.chart = echarts.init(document.getElementById("payuser"));
      const chartdeal = {
        color: ["#2B71FF", "#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新用户", "老用户"],
          right: 87,
          itemGap: 40,
          itemWidth: 12,
          itemHeight: 12,
          icon: "circle",
          textStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 5],
            width: 55,
          },
        },
        grid: {
          left: 12,
          right: 81,
          bottom: 47,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2023-03-21",
            "2023-03-22",
            "2023-03-23",
            "2023-03-24",
            "2023-03-25",
            "2023-03-26",
            "2023-03-27",
          ],
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "新用户",
            type: "line",
            smooth: true,
            data: [320, 132, 201, 134, 90, 230, 210],
          },
          {
            name: "老用户",
            type: "line",
            smooth: true,
            data: [220, 182, 291, 234, 290, 330, 310],
          },
        ],
      };
      this.chart.setOption(chartdeal);
    },
  },
  mounted() {
    this.payChart();
  },
};
</script>

<style lang="scss" scoed>
.paying-box {
  .title {
    height: 19px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }

  .time {
    margin-left: 20px;
    line-height: 14px;
    font-size: 14px;
    color: #999999;
  }

  .dealview-items {
    .dealview-item {
      margin-right: 20px;
      padding-bottom: 24px;

      .text {
        line-height: 14px;
        font-size: 14px;
        color: #999999;
        margin: 22px 0;
      }

      .num-box {
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        .num {
          line-height: 23px;
          font-size: 30px;
          font-weight: bold;
          color: #333333;
          margin-right: 11px;
        }
      }

      img {
        width: 20px;
        height: 20px;
      }

      .yesterday {
        line-height: 14px;
        font-size: 14px;
        font-weight: bold;
        color: #666666;
      }
    }
  }
}
</style>