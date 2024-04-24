<template>
  <div class="ana-container">
    <div class="head-box flex mb32">
      <img src="" alt="">
      <div class="flex1">
          <div class="text towlines">大模型狂潮背后: AI基础设施的“老化”与改造工程</div>
          <div class="mid-content"><span>已上架</span></div>
          <div class="bot-content"><span>¥188.00</span></div>
      </div>
    </div>

    <div class="bar-box">
        <el-tabs v-model="name">
          <el-tab-pane label="交易分析" name="1"></el-tab-pane>
          <el-tab-pane label="流量分析" name="2"></el-tab-pane>
          <el-tab-pane label="客群分析" name="3"></el-tab-pane>
        </el-tabs>

        <div style="align-items: center; margin-top: 50px;">
          <div class="row-between">
            <div class="mr20 row">
                <el-radio-group v-model="radio" size="medium">
                  <el-radio-button label="1" border>近7天</el-radio-button>
                  <el-radio-button label="2" border>近14天</el-radio-button>
                  <el-radio-button label="3" border>近1个月</el-radio-button>
                </el-radio-group>
  
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                      v-model="value"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </div>
              </div>

              <div class="timer">统计时间: 2023-03-30</div>
            </div>
        </div>
    </div>

    <!-- <div class="chart-box">
        <div class="row-between">
          <div class="title">交易分析</div>
          <el-button type="text">导出</el-button>
        </div>

        <div class="flex">
          <div class="visit-box">
            <div class="title-bar">{{ visitObj.title }}</div>
              <ul class="ulitems">
                <li class="liitem mb20" v-for="(item, index) in visitObj.data" :key="index">
                    <div class="text">{{ item.text }}</div>
                    <div class="num-box">
                        <div class="num">{{ item.num }}</div>
                    </div>
                    <div class="yesterday">昨日&nbsp;&nbsp;
                      <img src="" alt="">
                      {{ item.yesterday }}
                    </div>
                </li>
              </ul>
          </div>

          <div class="order-box">
            <div class="title-bar">{{ orderObj.title }}</div>
              <ul class="ulitems">
                <li class="liitem mb20" v-for="(item, index) in orderObj.data" :key="index">
                    <div class="text">{{ item.text }}</div>
                    <div class="num-box">
                        <div class="num">{{ item.num }}</div>
                    </div>
                    <div class="yesterday">昨日&nbsp;&nbsp;
                      <img src="" alt="">
                      {{ item.yesterday }}
                    </div>
                </li>
              </ul>
          </div>
          
          <div class="pay-box">
            <div class="title-bar">{{ payObj.title }}</div>
              <ul class="ulitems">
                <li class="liitem mb20" v-for="(item, index) in payObj.data" :key="index">
                    <div class="text">{{ item.text }}</div>
                    <div class="num-box">
                        <div class="num">{{ item.num }}</div>
                    </div>
                    <div class="yesterday">昨日&nbsp;&nbsp;
                      <img src="" alt="">
                      {{ item.yesterday }}
                    </div>
                </li>
              </ul>
          </div>

        </div>

        <div id="goodsan"></div>
    </div>

    <div class="sku-box">
      <div class="row-between">
        <div class="title">sku分析</div>
        <el-button type="text">导出</el-button>
      </div>

      <div>

        <el-table style="width: 100%;">
          <el-table-column label="规格" width="274">
            <template>
              <span>{{ DltObj.headline }}</span>
            </template>
          </el-table-column>
  
          <el-table-column label="下单件数" width="220">
            <span>{{ DltObj.goodstype }}</span>
          </el-table-column>
  
          <el-table-column label="下单买家数" width="242">
            <span>{{ DltObj.pv }}</span>
          </el-table-column>
  
          <el-table-column label="付款件数" width="223">
            <span>{{ DltObj.numvis }}</span>
          </el-table-column>
  
          <el-table-column label="付款买家数" width="243">
            <span>{{ DltObj.numpay }}</span>
          </el-table-column>
  
          <el-table-column label="付款金额" width="224">
            <span>{{ DltObj.numm }}</span>
          </el-table-column>
  
          <el-table-column label="下单-支付转化率" width="178">
            <template>
              <span>{{ DltObj.paypc }}</span>
          </template>
          </el-table-column>
        </el-table>

        <ul>
          <li v-for="item in 10" :key="item" class="dtl-item row">
              <div class="onelines">蓝色-大号</div>
              <div class="goodstype">10089</div>
              <div class="pv">9089</div>
              <div class="numdtl">8089</div>
              <div class="numpay">4200</div>
              <div class="numm">80900.00</div>
              <div class="paypc">45%</div>
          </li>
        </ul>
      </div>

      <div class="foot">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"/>
      </div>
    </div> -->

    <DealAnalysis />
    <FlowAnalysis />
    <CustomerGroup />
  </div>
</template>

<script>
//import echarts from 'echarts';
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
import DealAnalysis from './components/DealAnalysis';
import FlowAnalysis from './components/FlowAnalysis';
import CustomerGroup from './components/CustomerGroup';

export default {
  name: 'DtlChart',
  components: { Pagination, DealAnalysis, FlowAnalysis, CustomerGroup },
    data() {
        return {
            chart: null,
            radio: '1',
            name: '1',
            value: '',
            seek: '',
            total: 0,
            listQuery: {
              page: 1,
              limit: 6,
            },
            visitObj: {
              title: "访问数据",
              data: [
                {
                  text: "访问量",
                  num: 4800,
                  yesterday: '25%',
                },
                {
                  text: "访客",
                  num: 3801,
                  yesterday: '25%',
                }
              ],
            },
            orderObj: {
              title: "下单数据",
              data: [
                {
                  text: "下单人数",
                  num: 2809,
                  yesterday: '25%',
                },
                {
                  text: "下单件数",
                  num: 3801,
                  yesterday: '25%',
                },
                {
                  text: "下单金额",
                  num: 280900.00  ,
                  yesterday: '25%',
                },
                {
                  text: "下单转化率",
                  num: '40%',
                  yesterday: '25%',
                },
              ],
            },
            payObj: {
              title: "支付数据",
              data: [
                {
                  text: "支付人数",
                  num: 28090 ,
                  yesterday: '25%',
                },
                {
                  text: "支付件数",
                  num: 20809 ,
                  yesterday: '25%',
                },
                {
                  text: "支付金额",
                  num: 28090.00 ,
                  yesterday: '25%',
                },
                {
                  text: "支付转化率",
                  num: '40%',
                  yesterday: '25%',
                },
                {
                  text: "客单价",
                  num: 28090.00 ,
                  yesterday: '25%',
                },
                {
                  text: "下单支付转化率",
                  num: '20%',
                  yesterday: '25%',
                }
              ],
            },
            DltObj: {
              data: [{
              onelines: "蓝色-大号",
              goodstype: 10089,
              pv: 9089 ,
              numdtl: 8089 ,
              numpay: 4200 ,
              numm: 80900.00 ,
              paypc: '45%' ,
          },
        ],
            }
        }
    },
   /*  mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    }, */
    created() {
    this.getList();
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
      /* initChart() {
        this.chart = echarts.init(document.getElementById('goodsan'))
        const chartOptions = {
          color: ['#096BED'],
          grid: {
                    left: 18,
                    right: 59,
                    bottom: 32,
                    containLabel: true
                },
          xAxis: {
            type: 'category',
            data: [
                '2023-03-10',
                '2023-03-11',
                '2023-03-12',
                '2023-03-13',
                '2023-03-14',
                '2023-03-15',
                '2023-03-16',
                '2023-03-17'
              ],
            axisLine: {
                show: true,
                lineStyle: {
                  color: '#E2E2E2',
                  type: "solid"
                }
              },
            axisLabel: {
              formatter: function(val) {
                var strs = val.split('')
                var str = ''
                    for (let i = 0, s ; s = strs[i++];) {
                      str += s;
                      if(!(i % 13))
                           str += '\n'
                    }
                    return str
              },
              fontSize: 14,
              color: '#999999'
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
              fontSize: 14
            }
          },
          series: [
            {
              data: [ 182, 120, 132, 101, 134, 90, 230, 210],
              type: 'line',
              smooth: true,
            }
          ]
        }
        this.chart.setOption(chartOptions)
      } */
    }
}
</script>

<style lang="scss" scoped>

.ana-container {
  font-family: Microsoft YaHei;

  .title {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }
  .head-box {
    height: 225px;
    padding: 41px 0 40px 42px;
    background: #FFFFFF; 

    img {
      width: 144px;
      height: 144px;
    }

    .text {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      margin: 8px 0 0 19px;
    }

    .mid-content {
      display: flex;
      span {
        color: #999999 ;
        font-size: 16px;
        font-weight: 400;
        margin: 22px;
      }
    }

    .bot-content {
      display: flex;
      span {
        font-size: 16px;
        font-weight: bold;
        color: #FE3131;
        margin: 30px 0 51px 20px;
      }
    }
  }

  .bar-box {
    height: 234px;
    background: #FFFFFF;
    padding: 40px 36px 47px 40px;

    .timer {
            font-size: 16px;
            font-weight: 400;
            color: #999999;
            line-height: 16px;
            margin-right: 36px;
          }
  }

  /* 

  .chart-box {
    padding: 40px 34px 56px 42px;
    background: #FFFFFF;
    margin: 30px 0;

    .title-bar {
        color: #096BED;
        margin: 50px 0 19px 0;
        font-size: 20px;
        font-weight: bold;
      }

    .ulitems {

      .liitem {
          width: 250px;
          padding: 23px;
          background: #F8F8F8;
          border-radius: 10px;
          display: inline-block;
          margin-right: 20px;

          &:hover {
            background-color: #EDF5FF;
          }
          .text {
              line-height: 14px;
              font-size: 14px;
              color: #999999;
              margin-bottom: 22px;
          }

          .num-box {
              margin-bottom: 15px;
              display: flex;
              align-items: center;
      
              .num {
                  line-height: 30px;
                  font-size: 30px;
                  font-weight: bold;
                  color: #333333;
              }
          }
      
          .yesterday {
              line-height: 14px;
              font-size: 14px;
              font-weight: bold;
              color: #666666;
          }
      
          img {
              width: 8px;
              height: 12px;
          }
      }
    }
  }

  #goodsan {
    width: 100%;
    height: 511px;
  }

  .sku-box {
    padding: 40px 34px 72px 40px;
    background-color: #ffffff;

    .dtl-item {
      margin-bottom: 50px;
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      line-height: 16px;

      .onelines {
        width: 72px;
      }

      .goodstype {
              margin: 0 180px 0 202px;
      }
      .numdtl {
          margin: 0 185px 0 204px;
      }
      .numm {
          margin: 0 160px 0 206px;
          }
        }
  }
 */
}

::v-deep .el-tabs__item {
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
}

::v-deep .el-tabs__item.is-active{
  font-weight: bold;
}
  
::v-deep .el-radio__input.is-checked .el-radio__inner {
  background-color: #fff;
}

::v-deep .el-radio-button--medium .el-radio-button__inner{
  margin-right: 20px;
  border: none;
  border-radius: 0;
}

::v-deep .el-radio-button__inner {
  background: #F8F8F8;
}

</style>