<template>
  <div class="flowview-box card-box">
    <div class="top row mb24">
      <div class="title">流量数据概况</div>
      <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
    </div>
    <ul class="flowview-items flex">
      <li
        class="flowview-item flex1"
        v-for="(item, index) in flowviewObj.data"
        :key="index"
      >
        <div class="text">{{ item.text }}</div>
        <div class="num-box">
          <div class="num">{{ item.num }}</div>
          <img src="" alt="" />
        </div>
        <div class="yesterday">昨日&nbsp;&nbsp;{{ item.yesterday }}</div>
      </li>
    </ul>
    <!-- 图表 -->
    <div class="Chart-box mb32 mt20" style="position: relative;">
      <el-scrollbar class="data-scroll" style="align-items: center;width: 55%;overflow: hidden;margin-right: 20px !important;padding-right: 10px;">
        <div class="flex mr20" style="flex-wrap: nowrap;box-sizing: border-box;">
        <div class="mr20">
          <el-radio-group v-model="radio" size="medium" style="display: flex !important;">
            <el-radio-button label="1" border>近7天</el-radio-button>
            <el-radio-button label="2" border>近14天</el-radio-button>
            <el-radio-button label="3" border>近1个月</el-radio-button>
          </el-radio-group>
        </div>
        <div class="block">
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
      </el-scrollbar>
      <!-- <Myecharts :options="chartOptions" height="450px"></Myecharts> -->
    </div>
    <!-- 数据列表 -->
    <div>
      <div class="row-between">
        <div class="title">数据列表</div>
        <div class="row">
          <div class="block">
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
          <el-button size="small" class="ml20" plain>导出数据</el-button>
        </div>
      </div>

      <el-table :data="tableData" class="panel_table">
        <el-table-column prop="day" label="日期" />
        <el-table-column prop="paview" label="访问量" />
        <el-table-column prop="visitor" label="访客数"/>
        <el-table-column prop="user" label="新增用户"/>
        <el-table-column prop="time" label="支付人数"/>
        <el-table-column prop="usum" label="累计支付人数"/>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="foot">
      <pagination
        style="justify-content: flex-end;"
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>

    <!-- 付费用户 -->
    <div class="top row mb24">
      <div class="title">付费用户</div>
      <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
    </div>
    <div v-for="s in 3" :key="s">
      <ul class="flowview-items flex">
        <li
          class="flowview-item flex1"
          v-for="(item, index) in flowviewObj.data"
          :key="index"
        >
          <div class="text" v-if="s <= 1" style="margin-left: 50px;">{{ item.text }}</div>
          <div class="num-box">
            <div class="num flex" style="align-items: center;"><span style="font-size: 14px;color: #999999;width: 50px;">{{ item.istitle && s === 1? '标题1' : item.istitle && s === 2? '标题2' : item.istitle && s === 3 ? '标题3' : '' }}</span>{{ item.num }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mb10 mt20">
      <div class="flex mb40" style="align-items: center;margin-top: 60px;">
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
      <div style="position: relative;">
     <div class="new-old-chart">
        <div class="title">新老用户成交趋势</div>
        <el-radio-group style="transform: translateY(4px);" v-model="radioGroup">
          <el-radio :label="3">用户数</el-radio>
          <el-radio :label="6">客单价</el-radio>
          <el-radio :label="9">支付金额</el-radio>
          <el-radio :label="9">支付转化率</el-radio>
        </el-radio-group>
        <span></span>
     </div>
      <!-- 图表 -->
      <Myecharts :options="chartOptions2" height="450px"></Myecharts>
    </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
import Myecharts from '@/components/Echarts'

export default {
  name: "Flowview",
  components: { Pagination,Myecharts },
  data() {
    return {
      radioGroup:'',
       chartOptions : {
                color: ['#723DF5', '#16D2A2','#ff9900','#FFC0CB'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['访问量', '访客数', '新增用户', '支付人数'],
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
                    bottom: 0,
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
                        name: '访问量',
                        type: 'line',
                        smooth: true,
                        data: [1000, 1200, 1320, 1010, 1340, 900, 2300, 2100, 2200, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                    {
                        name: '新增用户',
                        type: 'line',
                        smooth: true,
                        data: [1210, 100, 1220, 1110, 1040, 1000, 1300, 1500, 2200, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                    {
                        name: '支付人数',
                        type: 'line',
                        smooth: true,
                        data: [2000, 1600, 1120, 1410, 1140, 1500, 1000, 1100, 1800, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                    {
                        name: '访客数',
                        type: 'line',
                        smooth: true,
                        data: [2000, 2200, 1820, 1910, 2340, 2900, 3300, 3100, 1500, 2320, 2010, 1540, 1900, 3300, 410]
                    }
                ]
            },
      chartOptions2 : {
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
      radio: "2",
      flowviewObj: {
        title: "商店实时概况",
        time: "2023-03-28 11:42:01",
        data: [
    
          {
            text: "访问量",
            num: 5600,
            yesterday: 5364,
            istitle: true,
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
      UserviewObj: {
        title: "付费用户",
        time: "2023-03-28 11:42:01",
        data: [
          {
            user: 5600,
            bargains: "75%",
            pct: 280.0,
            pay: 280000.0,
            bargains: "65%",
          },
          {
            user: 3600,
            bargains: "45%",
            pct: 248.0,
            pay: 178089.0,
            bargains: "40%",
          },
          {
            user: 2000,
            bargains: "30%",
            pct: 248.0,
            pay: 178089.0,
            bargains: "25%",
          },
        ],
      },
      tableData: [
        {
          day: "2023-03-02",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-04",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-01",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-03",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-02",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-04",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-01",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-03",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.trafficChart(), this.payChart();
  },
  beforeDestroy() {
    if (!this.chart) {
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
    trafficChart() {
      this.chart = echarts.init(document.getElementById("trafficdata"));
      const chartOptions = {
        color: ["#1DC3FF", "#2B71FF", "#16D2A2", "#FFBD3D"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新增用户", "浏览量", "访客数", "支付人数"],
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
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            fontSize: 14,
            color: "#999999",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#E2E2E2",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            color: "#999999",
            fontSize: 14,
            formatter: "{value}%",
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "访客数",
            type: "line",
            smooth: true,
            data: [320, 132, 201, 134, 90, 230, 210],
          },
          {
            name: "新增用户",
            type: "line",
            smooth: true,
            data: [220, 182, 291, 234, 290, 330, 310],
          },
          {
            name: "浏览量",
            type: "line",
            smooth: true,
            data: [350, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "支付人数",
            type: "line",
            smooth: true,
            data: [130, 252, 191, 254, 210, 230, 310],
          },
        ],
      };
      this.chart.setOption(chartOptions);
    },
    payChart() {
      this.chart = echarts.init(document.getElementById("payuser"));
      const chartFlow = {
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
      this.chart.setOption(chartFlow);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.data-scroll .el-scrollbar__wrap{
  overflow-y:hidden;
}
.flowview-box {
  padding: 31px 47px 0 25px;

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

  .flowview-items {
    padding: 0px 20px;
    .flowview-item {
      margin-right: 20px;
      padding-bottom: 24px;

      .text {
        line-height: 14px;
        font-size: 14px;
        color: #999999;
        margin: 30px 0;
      }

      .num-box {
        margin-bottom: 15px;
        margin-top: 10px;
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

  .row-between {
    margin: 90px 0px 37px 10px;
  }

  .foot {
    padding: 64px 0px 65px 0px;
  }
}

.Chart-box {
  padding: 24px 0 0 24px;
  #trafficdata #payuser {
    width: 100%;
    height: 310px;
  }
}
::v-deep .el-radio-button--medium .el-radio-button__inner {
  margin-right: 20px;
  border: none;
  border-radius: 0;
}
.new-old-chart{
  width: 100%;
  position: absolute;
  height: 40px;
  justify-content: space-between;
  display: flex; align-items: center;
}
</style>