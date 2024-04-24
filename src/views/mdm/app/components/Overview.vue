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
                    <i class="el-icon-bottom" style="font-size: 19px;font-weight: 900;color: red;"></i>
                    <i class="el-icon-top" style="font-size: 19px;font-weight: 900;color: yellowgreen;"></i>
                </div>
                <div class="yesterday">昨日&nbsp;&nbsp;{{ item.yesterday }}</div>
            </li>
        </ul>
    </div>
</template>

<script>

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

        };
    },
    mounted() {

    },

    methods: {

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
</style>