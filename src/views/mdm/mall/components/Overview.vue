<template>
    <div class="overview-box card-box">
        <div class="top row mb24">
            <div class="title">{{ overviewObj.title }}</div>
            <div class="time">数据更新时间：{{ overviewObj.time }}</div>
        </div>
        <ul class="overview-items flex">
            <li class="overview-item flex1" v-for="(item, index) in overviewObj.data" :key="index">
                <div class="text">{{ item.text }}</div>
                <div class="num-box">
                    <div class="num">{{ item.num }}</div>
                    <img src="" alt="">
                </div>
                <div class="yesterday">昨日&nbsp;&nbsp;{{ item.yesterday }}</div>
            </li>
        </ul>
        <div class="Chart-box card-box mb32">
           <div id="situation"></div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'Overview',
    props: {
        overviewObj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    data() {
        return {
            chart: null,
        };
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
            this.chart = echarts.init(document.getElementById('situation'))
            const chartOptions = {
                color: ['#2B71FF', '#16D2A2'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [ '今日支付金额', '昨日支付金额'],
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
                        name: '今日支付金额',
                        type: 'line',
                        smooth: true,
                        data: [0.1,0.2, 0.4, 0.6, 0.2, 0.1, 0.3, 0.5,0.2, 0.5, 0.3, 0.4, 0.5, 0.3, 0.4]
                    },
                    {
                        name: '昨日支付金额',
                        type: 'line',
                        smooth: true,
                        data: [0.1,0.5, 0.3, 0.1, 0.3, 0.5, 0.6, 0.7,0.8, 0.6, 0.6, 0.4, 0.2, 0.3, 0.6]
                    }
                ]
            };
            this.chart.setOption(chartOptions)
        }
    },
};
</script>

<style lang="scss" scoped>
.overview-box {
    padding: 24px 4px 0 24px;

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

    .overview-items {

        .overview-item {
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
}

.Chart-box {
    padding: 24px 0 0 24px;

    #situation {
        width: 100%;
        height: 468px;
    }
}
</style>