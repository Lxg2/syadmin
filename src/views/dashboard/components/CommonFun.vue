<template>
    <div class="panel-box mb32 card-box">
        <div class="title">常用功能</div>
        <ul class="flex">
            <li v-for="(item, index) in panelData" :key="index" style="width: 25%;">
                <router-link :to="item.path" class="img-box panel-item row" >
                    <div class="img-box row-center" :style="{ background: item.color }">
                    <img src="" alt="">
                    </div>
                    <div class="content-box flex">
                        <span class="text">{{ item.text }}</span>
                        <span class="explain">{{ item.explain }}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CommonFun',
    data() {
        return {
            panelData: [{
                icon: '', color: '#606DF6', text: '发布资讯', explain: '实时了解行业资讯',path: '/dashboard/news/publish'
            }, {
                icon: '', color: '#FCB546', text: '发布视频', explain: '提高企业影响力',path: '/dashboard/news/publish'
            }, {
                icon: '', color: '#2B71FF', text: '上传资料', explain: '方便共享资料',path: '/dashboard/news/publish'
            }, {
                icon: '', color: '#12DFC9', text: '新增案例', explain: '提高说服力',path: '/dashboard/news/publish'
            }]
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>
.panel-box {
    padding: 24px 0;

    .title {
        margin: 0 0 24px 24px;
        line-height: 19px;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }

    .panel-item {
        flex: 1;
        padding-left: 24px;

        .img-box {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }

    .content-box {
        flex-direction: column;
        justify-content: flex-start;

        .text {
            line-height: 19px;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 15px;
        }

        .explain {
            line-height: 14px;
            font-size: 14px;
            color: #999999;
        }
    }
}
</style>
