<template>
    <div class="surveyChart-box card-box mb32">
        <div class="top row-between mb24">
            <div class="row">
                <div class="title">流量看板</div>
                <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
            </div>
            <el-button type="text">
                <router-link :to="'/mdm/flow'">查看更多</router-link>
            </el-button>
        </div>
        <div class="row">
            <div id="content"></div>
         <div>
            <div class="pageview mb40">
                <div class="infor">
                    <div class="informa">访问量</div>
                    <div class="num-box">
                        <div class="num">10000</div>
                        <img src="" alt="">
                    </div>
                    <div class="yesterday">昨日&nbsp;&nbsp;10909</div>
                </div>
            </div>
            <div class="pageview">
                <div class="infor">
                    <div class="informa">访问量</div>
                    <div class="num-box">
                        <div class="num">10000</div>
                        <img src="" alt="">
                    </div>
                    <div class="yesterday">昨日&nbsp;&nbsp;10909</div>
                </div>
            </div>
         </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'SurveyChart',

    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('content'))
            const chartOptions = {
                color: ['#723DF5', '#16D2A2'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['访问量', '访客数'],
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
                        name: '访客数',
                        type: 'line',
                        smooth: true,
                        data: [2000, 2200, 1820, 1910, 2340, 2900, 3300, 3100, 1500, 2320, 2010, 1540, 1900, 3300, 410]
                    }
                ]
            };
            this.chart.setOption(chartOptions)
        }
    }
};
</script>

<style lang="scss" scoped>
.surveyChart-box {
    padding: 31px 32px 55px 25px;

    .title {
        line-height: 54px;
        font-size: 20px;
        font-weight: bold;
        color: #333333;

    }
    .time {
        margin-left: 9px;
        line-height: 14px;
        font-size: 14px;
        color: #999999;
    }

    #content {
        width: 100%;
        height: 468px;
    }

    .pageview {
        width: 480px;
        height: 200px;
        background: #F8F8F8;
        padding: 33px 150px 33px 20px;

        .infor {
            margin: 23px 171px 23px 24px;
        }
        .informa {
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
                    margin-right: 24px;
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
</style>