<template>
    <div class="hotNews-box card-box">
        <div class="title">热门资讯TOP5</div>
        <ul>
            <li v-for="item in 6" :key="item" class="hotNews-item row">
                <div class="index-box row-center">
                    <img src="" alt="" v-if="item < 4">
                    <span v-else>{{ item }}</span>
                </div>
                <img src="" alt="" class="thumb">
                <div class="content-box flex">
                    <span class="text onelines">大模型狂潮背后：AI基础设施的...</span>
                    <span class="explain">浏览&nbsp;&nbsp;4008</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HotNews',

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
.hotNews-box {
    width: 416px;
    height: 612px;
    padding: 31px 21px 40px 25px;

    .title {
        line-height: 19px;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 42px;


    }

    .hotNews-item {
        margin-bottom: 40px;

        .index-box {
            width: 40px;
            height: 40px;
            border-radius: 2px;
            margin-right: 24px;

            img {
                width: 100%;
                height: 100%;
            }

            span {
                line-height: 17px;
                font-size: 24px;
                font-weight: 800;
                color: #333333;
            }
        }

        .thumb {
            width: 60px;
            height: 40px;
            border-radius: 2px;
            margin-right: 10px;
        }

        .content-box {
            flex-direction: column;
            justify-content: flex-start;

            .text {
                line-height: 17px;
                font-size: 16px;
                color: #333333;
                margin-bottom: 10px;
            }

            .explain {
                line-height: 13px;
                font-size: 14px;
                color: #999999;
            }
        }
    }
}
</style>