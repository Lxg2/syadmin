<template>
  <div class="card-box">
    <div class="flex panel-box">
      <div class="left-panel flex1 column">
        <div
          class="panel-items row-between flex1"
          v-for="(value, key) in VisObj"
          :key="key"
        >
          <ul class="row-start">
            <li class="panel-item" v-for="(item, index) in value" :key="index">
              <span>{{ item.text }}</span>
              <p>{{ item.num }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="funnel-box flex">
        <ul class="funnel-items flex1 column">
          <li class="funnel-item">
            <svg-icon icon-class="user" />
            <span>访客</span>
          </li>
          <li class="funnel-item">
            <svg-icon icon-class="info" />
            <span>下单</span>
          </li>
          <li class="funnel-item">
            <svg-icon icon-class="fina" />
            <span>支付</span>
          </li>
        </ul>
        <ul class="rate-box column">
          <li class="rate-item">
            <span>下单转化率</span>
            <p>34%</p>
          </li>
          <li class="rate-item">
            <span>下单转化率</span>
            <p>34%</p>
          </li>
          <li class="rate-item">
            <span>下单转化率</span>
            <p>34%</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 图表 -->
    <div class="Chart-box mb32 mt20" style="position: relative;">
      <el-scrollbar class="data-scroll" style="align-items: center;position: absolute;z-index: 9999;width: 55%;overflow: hidden;margin-right: 20px !important;padding-right: 10px;">
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
      <Myecharts :options="chartOptions" height="450px"></Myecharts>
    </div>
  </div>
</template>

<script>
import Myecharts from '@/components/Echarts'
import { fetchList } from "@/api/article";

export default {
  components: { Myecharts },
  data() {
    return {
      chartOptions : {
                color: ['#723DF5', '#16D2A2','#ff9900','#FFC0CB','#FF5722'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['支付金额', '支付人数', '下单人数', '下单金额','访客数'],
                    top:8,
                    right: 0,
                    itemGap: 40,
                    itemWidth: 12,
                    itemHeight: 12,
                    icon: "circle",
                    textStyle: {
                        fontSize: 14,
                        padding: [0, 0, 0, 1],
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
                        name: '支付金额',
                        type: 'line',
                        smooth: true,
                        data: [1000, 1200, 1320, 1010, 1340, 900, 2300, 2100, 2200, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                    {
                        name: '支付人数',
                        type: 'line',
                        smooth: true,
                        data: [1210, 100, 1220, 1110, 1040, 1000, 1300, 1500, 2200, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                    {
                        name: '下单人数',
                        type: 'line',
                        smooth: true,
                        data: [2000, 1600, 1120, 1410, 1140, 1500, 1000, 1100, 1800, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                    {
                        name: '下单金额',
                        type: 'line',
                        smooth: true,
                        data: [2000, 2200, 1820, 1910, 2340, 2900, 3300, 3100, 1500, 2320, 2010, 1540, 1900, 3300, 410]
                    },
                    {
                        name: '访客数',
                        type: 'line',
                        smooth: true,
                        data: [1400, 1200, 1820, 1910, 2140, 2900, 3300, 3100, 1500, 2320, 2010, 1540, 1900, 3300, 410]
                    }
                ]
            },
      value: "",
      radio: "",
      VisObj: {
        data1: [
          {
            text: "访客数",
            num: 56000,
          },
        ],
        data2: [
          {
            text: "访客数",
            num: 56000,
          },
          {
            text: "访客数",
            num: 56000,
          },
          {
            text: "访客数",
            num: 56000,
          },
        ],
        data3: [
          {
            text: "访客数",
            num: 56000,
          },
          {
            text: "访客数",
            num: 56000,
          },
          {
            text: "访客数",
            num: 56000,
          },
          {
            text: "访客数",
            num: 56000,
          },
        ],
      },
    };
  },
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
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
::v-deep.data-scroll .el-scrollbar__wrap{
  overflow-y:hidden;
}
.panel-box {
  width: 100%;
  height: 432px;
  padding-bottom: 6.32%;
  box-sizing: content-box;
  .left-panel {
    height: 100%;
    .panel-items {
      padding-left: 25px;
      padding-right: 2.43%;
      margin-right: -60px;
      &:nth-of-type(1) {
        background-color: #f8fbff;
      }
      &:nth-of-type(2) {
        background-color: #f2faf3;
      }
      &:nth-of-type(3) {
        background-color: #fef7e9;
      }
      ul {
        width: 100%;
        .panel-item {
          width: 21.207%;
          display: flex;
          padding-left: 24px;
          flex-direction: column;
          span {
            font-size: 14px;
            color: #999999;
            margin-bottom: 20px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            color: #333333;
            line-height: 30px;
          }
        }
      }
    }
  }
  .funnel-box {
    width: 30.32%;
    height: 100%;
    background: url("~@/assets/funnel.png") no-repeat;
    background-size: 100% 100%;
    .funnel-items {
      justify-content: center;
      align-items: center;
      .funnel-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .svg-icon {
          font-size: 32px;
        }
        span {
          font-size: 16px;
          color: #ffffff;
          line-height: 17px;
          opacity: 0.9;
          margin-top: 10px;
        }
      }
    }
    .rate-box {
      width: 40%;
      padding: 132px 5px 124px 0;
      justify-content: space-between;
      .rate-item {
        display: flex;
        flex-direction: column;
        &:nth-of-type(1) {
          margin-left: 36px;
        }
        &:nth-of-type(2) {
          align-items: flex-end;
        }
        &:nth-of-type(3) {
          margin-left: 16px;
        }
        span {
          font-size: 16px;
          color: #333333;
          margin-bottom: 10px;
        }
        p {
          font-size: 20px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }
}
</style>