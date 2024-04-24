<template>
  <div class="dealview-box card-box">

      <!-- 漏斗图 -->
      <div class="Chart-box card-box flex">

        <div class="left-component">
          <div class="hopper blue" v-for="(VisObj, index) in VisObj.data" :key="index">
            <div class="text">{{ VisObj.text }}</div>
            <div class="num">{{ VisObj.num }}</div>
          </div>

          <div class="hopper green" v-for="(VisObj, index) in VisObj.data" :key="index">
            <div class="text">{{ VisObj.text }}</div>
            <div class="num">{{ VisObj.num }}</div>
          </div>

          <div class="hopper yellow" v-for="(VisObj, index) in VisObj.data" :key="index">
            <div class="text">{{ VisObj.text }}</div>
            <div class="num">{{ VisObj.num }}</div>
          </div>
          
        <!-- 
          <div class="numberVisitors" v-for="(VisObj, index) in VisObj.data" :key="index">
            <div class="text">{{ VisObj.text }}</div>
            <div class="num">{{ VisObj.num }}</div>
          </div> 
            <div class="placeOrder" v-for="(OrderObj, index) in OrderObj.data" :key="index">
            <div class="text">{{ OrderObj.text }}</div>
            <div class="num">{{ OrderObj.num }}</div>
          </div>

          <div class="payoutStatus" v-for="(payObj, index) in payObj.data" :key="index">
            <div class="text">{{ payObj.text }}</div>
            <div class="num">{{ payObj.num }}</div>
          </div> 
        -->
        </div>

        <div id="funnel"></div>
      </div>

      <div class="Chart-box card-box mb32">
        <div class="flex mb40" style="align-items: center;">
          <div class="mr20">
            <el-radio-group v-model="radio" size="medium">
              <el-radio-button label="1" border>近7天</el-radio-button>
              <el-radio-button label="2" border>近14天</el-radio-button>
              <el-radio-button label="3" border>近1个月</el-radio-button>
            </el-radio-group>
          </div>
          <div class="block mr20">
            <span class="demonstration"></span>
            <el-date-picker v-model="value" type="daterange" range-separator="至"
               start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>

         <div id="Payment overview"></div>
      </div>

      <!-- 数据列表 -->
      <div>
            <div class="row-between">
                <div class="title">数据列表</div>
            <div class="row">
                <div class="block">
                <span class="demonstration"></span>
                <el-date-picker v-model="value" type="daterange" range-separator
                ="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                </div>
                <el-button size="small" class="ml20" plain>导出数据</el-button>
            </div>
            </div>

            <el-table :data="tableData" style="width: 100%">
                
              <el-table-column prop="day" label="日期" width="320">
                <!-- 
                    <template slot-scope="scope">
                      <span>{{ scope.row.day }}</span>
                    </template>
                 -->
              </el-table-column>

              <el-table-column prop="paview" label="访问量" width="298">
              </el-table-column>

              <el-table-column prop="visitor" label="访客数" width="200">
              </el-table-column>

              <el-table-column prop="user" label="新增用户" width="252">
              </el-table-column>

              <el-table-column prop="time" label="支付人数" min-width="270">
              </el-table-column>

              <el-table-column prop="usum" label="累计支付人数" width="190">
              </el-table-column>

            </el-table>
        </div>

        <!-- 分页 -->
        <div class="foot">
          <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" 
            :limit.sync="listQuery.limit" @pagination="getList"/>
        </div>

        <!-- 付费用户 -->
        <div class="top row mb24">
          <div class="title">交易构成</div>
          <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
        </div>
        <ul class="dealview-items flex">
          <li class="dealview-item flex1" v-for="(item, index) in dealviewObj.data" :key="index">
              <div class="text">{{ item.text }}</div>
              <div class="num-box">
                  <div class="num">{{ item.num }}</div>
              </div>
          </li>
        </ul>

      <div class="mb24">
        <div class="flex mb40" style="align-items: center;">
          <div class="mr20">
            <el-radio-group v-model="radio" size="medium">
              <el-radio-button label="1" border>近7天</el-radio-button>
              <el-radio-button label="2" border>近14天</el-radio-button>
              <el-radio-button label="3" border>近1个月</el-radio-button>
            </el-radio-group>
          </div>
          <div class="block mr20">
            <span class="demonstration"></span>
            <el-date-picker v-model="value" type="daterange" range-separator="至"
               start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>

          <div class="title">订单金额分布</div>
        </div>

      <div class="Chart-box card-box mb32">
         <div id="payuser"></div>
      </div>

  </div>
</template>

<script>
import echarts from 'echarts'
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  name: 'Dealview',
  components: { Pagination },
  data() {
      return {
        chart: null,
        value: '',
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        radio: '',
        VisObj: {
          data: [{
            text: '访客数',
            num: 56000
          }]
        },/* 
        OrderObj: {
          data: [{
            text: '下单人数',
            num: 20590
          },
          {
            text: '下单笔数',
            num: 23000
          },
          {
            text: '下单金额',
            num: 43000.00
          }
        ]
        },
        PayObj: {
          data: [{
            text: '支付人数',
            num: 18590
          },
          {
            text: '支付订单数',
            num: 1956
          },
          {
            text: '支付金额',
            num: 38009.00
          },
          {
            text: '客单价',
            num: 400.00
          }]
        }, */
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
            num: 2938 ,
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
          }],
        },
        UserviewObj: {
        title: "交易构成",
        time: "2023-03-28 11:42:01",
        data: [
          {
            user: 5600,
            bargains: '75%',
            pct: 280.00,
            pay: 280000.00,
            bargains: '65%',
          },
          {
            user: 3600,
            bargains: '45%',
            pct: 248.00,
            pay: 178089.00,
            bargains: '40%',
          },
          {
            user: 2000,
            bargains: '30%' ,
            pct: 248.00,
            pay: 178089.00,
            bargains: '25%',
          }],
        },
        tableData: [{
            day: '2023-03-02',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-04',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-01',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-03',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-02',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-04',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-01',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          },
          {
            day: '2023-03-03',
            paview: '100089',
            visitor: '1200',
            user: '1200',
            time: '00:12:45',
            usum: '200000',
          }]
      };
  },
  created() {
    this.getList();
  },
  mounted() {
      this.funnelChart(),
      this.PaymentChart(),
      this.payChart()
  },
  beforeDestroy() {
      if (!this.chart) {1
          return
      }
      this.chart.dispose()
      this.chart = null
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
        funnelChart() {
          this.chart = echarts.init(document.getElementById('funnel'))
          const chartdeal = {
            title: {
            text: 'Funnel'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
          },
          series: [
            {
              name: 'Funnel',
              type: 'funnel',
              left: '10%',
              top: 60,
              bottom: 60,
              width: '80%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: [
                { value: 60, name: 'Visit' },
                { value: 40, name: 'Inquiry' },
                { value: 20, name: 'Order' },
                { value: 80, name: 'Click' },
                { value: 100, name: 'Show' }
              ]
            }
           ]
          };
          this.chart.setOption(chartdeal)
      },
    PaymentChart() {
          this.chart = echarts.init(document.getElementById('Payment overview'))
          const chartOptions = {
              color: ['#1DC3FF', '#2B71FF', '#16D2A2', '#FFBD3D'],
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: [ '新增用户', '浏览量', '访客数', '支付人数'],
                  right: 87,
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
                  left: 12,
                  right: 81,
                  bottom: 47,
                  containLabel: true
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: [
                        '2023-03-21',
                        '2023-03-22',
                        '2023-03-23',
                        '2023-03-24',
                        '2023-03-25',
                        '2023-03-26',
                        '2023-03-27'
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
                  /* axisLabel: {
                    show: true,
                    interval: 0,
                    color: '#999999',
                    fontSize: 14,
                    formatter: '{value}%',
                  } */
              },
              toolbox: {
                  show: false,
              },
              series: [
                    {
                        name: '访客数',
                        type: 'line',
                        smooth: true,
                        data: [320, 132, 201, 134, 90, 230, 210]
                    },
                    {
                        name: '新增用户',
                        type: 'line',
                        smooth: true,
                        data: [220, 182, 291, 234, 290, 330, 310]
                    },
                    {
                        name: '浏览量',
                        type: 'line',
                        smooth: true,
                        data: [350, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '支付人数',
                        type: 'line',
                        smooth: true,
                        data: [130, 252, 191, 254, 210, 230, 310]
                    }
              ]
          };
          this.chart.setOption(chartOptions)
      },
    payChart() {
          this.chart = echarts.init(document.getElementById('payuser'))
          const chartdeal = {
              color: ['#2B71FF', '#16D2A2'],
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: [ '新用户', '老用户'],
                  right: 87,
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
                  left: 12,
                  right: 81,
                  bottom: 47,
                  containLabel: true
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: [
                        '2023-03-21',
                        '2023-03-22',
                        '2023-03-23',
                        '2023-03-24',
                        '2023-03-25',
                        '2023-03-26',
                        '2023-03-27'
                  ]
              },
              yAxis: {
                  type: 'value',
                  splitLine :{
                      lineStyle :{
                          type:'dashed'
                      }
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
                        data: [320, 132, 201, 134, 90, 230, 210]
                    },
                    {
                        name: '老用户',
                        type: 'line',
                        smooth: true,
                        data: [220, 182, 291, 234, 290, 330, 310]
                    }
              ]
          };
          this.chart.setOption(chartdeal)
      }
  },
};
</script>

<style lang="scss" scoped>
.dealview-box {
  padding: 31px 47px 0 25px;
  font-family: Microsoft YaHei;

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
 
  .left-component {
    flex-wrap: wrap;
    height: 432px;

    .hopper {
      flex-basis: calc(100% / 3);
      height: 30%;
      &.blue::before {
        background: #F8FBFF;
      }
      &.green::before {
        background: #F2FAF3;
      }
      &.yellow::before {
        background: #FEF7E9;
      }
      

      .text {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 54px;
        margin: 22px 0;
      }
      .num {
        line-height: 30px;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        margin-right: 11px;
      }
    }

    /* 
      &::before {
        content: "";
        position: relative;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
    }
     */
    /* .numberVisitors {
      flex-basis: calc(100% / 3);
      height: 30%;
      background: #F8FBFF;
    }
    .placeOrder {
      flex-basis: calc(100% / 3);
      height: 30%;
      background: #F2FAF3;
    }
    .payoutStatus {
      flex-basis: calc(100% / 3);
      height: 30%;
      background: #FEF7E9;
    } */

  }
}

.Chart-box {
  padding: 24px 0 0 24px;

  #Payment #payuser {
      width: 100%;
      height: 310px;
  }

  #funnel {
    width: 500px;
    height: 100%;
  }
}

.row-between {
        margin: 90px 78px 37px 31px ;
    }

.foot {
  padding: 64px 73px 65px 965px ;
}

::v-deep .el-radio-button--medium .el-radio-button__inner {
  margin-right: 20px;
  border: none;
  border-radius: 0;
}
</style>