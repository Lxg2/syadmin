<template>
    <ul class="panel-box card-box flex mb32" :style="customStyle">
        <li v-for="(item, index) in panelData" :key="index" class="panel-item row">
            <div class="img-box row-center" :style="{ background: item.color }">
                <img src="" alt="">
            </div>
            <div class="content-box flex">
                <span class="num">{{ item.num }}</span>
                <span class="text">{{ item.text }}</span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Panel',

    props: ['panelData', 'customStyle'],

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
.panel-box {
    height: 192px;

    .panel-item {
        flex: 1;
        padding-left: 24px;

        .img-box {
            width: 64px;
            height: 64px;
            border-radius: 10px;
            margin-right: 24px;
        }
    }

    .content-box {
        flex-direction: column;
        justify-content: flex-start;

        .num {
            font-size: 36px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 32px;
            line-height: 27px;
        }

        .text {
            font-size: 14px;
            line-height: 14px;
            color: #666666;
        }
    }
}
</style>
