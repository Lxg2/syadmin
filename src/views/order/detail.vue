<template>
  <div class="order-container">
    <div class="order-info">
      <ul class="order-head flex">
        <li class="row-start">
          <span class="other">订单号：</span>
          261729195337
          <span class="other">何先生</span>
        </li>
        <li>下单时间</li>
        <li>支付状态</li>
        <li>配送状态</li>
      </ul>
      <ul class="order-table flex">
        <li class="goods-info row-between">
          <div class="flex flex1">
            <img
              src="https://img.alicdn.com/imgextra/i1/4322415569/O1CN01BLxziH1r0eWkzXZsm_!!0-saturn_solar.jpg_468x468q75.jpg_.webp"
            />
            <div class="text-box">
              <p class="towlines">无敌可爱的MINI充电手持 小风扇， 夏天必备</p>
              <span>小</span>
              <span style="margin-left: 12px">红色</span>
            </div>
          </div>
          <span>¥72.40</span>
          <span>X2</span>
        </li>
        <li>
          <span class="text-center" style="width: 90px"
            >2023-03-30 15:00:09</span
          >
        </li>
        <li>
          <span class="text-center" style="width: 60px">实付 ¥144.80</span>
        </li>
        <li class="status">待发货</li>
      </ul>
      <div class="order-panel row-between">
        <template v-for="(activity, index) in activities">
          <div
            class="panel-item"
            :class="{ active: activity.selected }"
            :key="index"
          >
            <i :class="activity.icon"></i>
            <p class="content text-center">
              {{ activity.content }}
            </p>
            <span class="time flex text-center">{{ activity.timestamp }}</span>
          </div>
          <div class="line" :key="index" v-if="index != 4">
            <img
              :src="
                require(`@/assets/line_${
                  activity.selected ? 'active' : 'normal'
                }.png`)
              "
            />
          </div>
        </template>
      </div>
    </div>

    <!-- 快递信息 -->
    <div class="express-box flex">
      <div class="express-info">
        <div class="title">快递信息</div>
        <ul class="logist">
          <li class="logistics">
            <span>物流公司</span>
            顺丰快递
          </li>
          <li class="logistics">
            <span>快递单号</span>
            SF 107682 122 7456
          </li>
        </ul>
      </div>
      <div class="express-data">
        <el-timeline>
          <el-timeline-item
            v-for="(time, index) in timer"
            :key="index"
            :text="time.text"
            :timestamp="time.timestamp"
            placement="top"
            :class="{ active: time.selected }"
          >
            <h4>{{ time.content }}</h4>
            <p>{{ time.text }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <!-- 货物信息 -->
    <div class="express-box flex summary-box">
      <div class="express-info">
        <div class="title">收货人信息</div>
        <span class="edit">编辑</span>
        <ul class="logist">
          <li class="logistics">
            <span>收货人姓名</span>
            何先生
          </li>
          <li class="logistics">
            <span>收货地址</span>
            <p>广东省深圳市南山区科 苑路15号科兴科学园c3 -11f</p>
          </li>
          <li class="logistics">
            <span>电话号码</span>
            18090800890
          </li>
        </ul>
      </div>
      <div class="express-info">
        <div class="title">配送信息</div>
        <ul class="logist">
          <li class="logistics">
            <span>配送方式</span>
            顺丰快递
          </li>
        </ul>
      </div>
      <div class="express-info">
        <div class="title">支付信息</div>
        <ul class="logist">
          <li class="logistics">
            <span>支付方式</span>
            微信支付
          </li>
          <li class="logistics">
            <span>支付时间</span>
            2023.03.30 15:00:09
          </li>
        </ul>
      </div>
      <div class="express-info">
        <div class="title">金额统计</div>
        <ul class="logist">
          <li class="logistics">
            <span>商品总价</span>
            ¥144.80
          </li>
          <li class="logistics">
            <span>运费</span>
            ¥14.80
          </li>
          <li class="logistics">
            <span>优惠</span>
            ¥14.80
          </li>
          <li class="logistics total">
            <span>订单总额</span>
            ¥144.80
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          content: "提交订单",
          timestamp: "2023-03-30 15:00:09",
          icon: "el-icon-tickets",
          selected: 1,
        },
        {
          content: "付款成功",
          timestamp: "2023-03-30 15:00:09",
          icon: "el-icon-wallet",
          selected: 1,
        },
        {
          content: "配送出库",
          icon: "el-icon-sell",
        },
        {
          content: "等待收货",
          icon: "el-icon-takeaway-box",
        },
        {
          content: "交易完成",
          icon: "el-icon-document-checked",
        },
      ],
      timer: [
        {
          content: "配送出库",
          timestamp: "2023.03.30  15:00:09",
          text: "从【广州转换中心】正发往【猎德三部】",
          selected: 1,
        },
        {
          content: "支付成功",
          timestamp: "2023.03.30  15:00:09",
          text: "买家已经支付成功",
        },
        {
          content: "提交订单",
          timestamp: "2023.03.30  15:00:09",
          text: "买家提交了订单",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  background: #ffffff;
  padding: 40px 40px 88px 40px;
  font-family: Microsoft YaHei;
  color: #333333;
  font-size: 14px;
  .order-info {
    border: 1px solid #dddddd;
    border-radius: 4px;
    ul {
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:nth-of-type(1) {
          flex: 1;
        }
        &:nth-of-type(2) {
          width: 17.52%;
        }
        &:nth-of-type(3) {
          width: 20.04%;
        }
        &:nth-of-type(4) {
          width: 16.18%;
        }
      }
    }

    .order-head {
      height: 48px;
      line-height: 48px;
      background: #f8f8f8;

      .other {
        color: #999999;
        margin-left: 59px;
      }
    }

    .order-table {
      height: 128px;
      li {
        border-right: 1px solid #dddddd;
        padding-top: 24px;
        font-size: 16px;
        &:last-of-type {
          border: none;
        }
        &.status {
          color: #ff5858;
        }
        span {
          line-height: 20px;
        }
        &.goods-info {
          padding: 24px 21px;
          align-items: flex-start !important;
          img {
            width: 80px;
            height: 80px;
            border-radius: 4px;
            margin-right: 20px;
          }
          .text-box {
            width: 183px;
            p {
              line-height: 22px;
              margin-bottom: 18px;
            }
          }
          span {
            color: #999999;
          }
          > span {
            margin-right: 70px;
          }
        }
      }
    }

    .order-panel {
      border-top: 1px solid #dddddd;
      padding: 54px 7.92% 32px;
      align-items: flex-start;
      .panel-item {
        width: 78px;
        position: relative;
        i {
          font-size: 40px;
          color: #999999;
          margin: 0 16px 30px;
        }
        .content {
          margin-bottom: 13px;
        }

        &.active {
          i {
            color: #1bd9a1;
          }
        }
      }
      .line {
        flex: 1;
        margin: 0 -3px;
        margin-top: 14px;
        img {
          width: 100%;
        }
      }
    }
  }
  .express-box {
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-top: 40px;
    font-size: 16px;
    color: #333333;
    .express-info {
      width: 28.87%;
      border-right: 1px solid #dddddd;
      padding: 40px 52px;
      position: relative;
      .title {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 67px;
      }
      .logist {
        .logistics {
          margin-bottom: 40px;
          display: flex;
          span {
            margin-right: 20px;
            color: #999999;
            min-width: 65px;
            display: inline-block;
          }
          p {
            line-height: 30px;
            margin-top: -7px;
          }
          &.total {
            color: #ff5858;
            font-weight: bold;
            span {
              color: #333333;
            }
          }
        }
      }
      .edit {
        position: absolute;
        right: 40px;
        top: 41px;
        color: #096bed;
        cursor: pointer;
      }
    }
    .express-data {
      padding: 41px 6.03%;
      width: 100%;
      height: 413px;
      .el-timeline {
        position: relative;
        padding: 70px 0 0 190px;
        .el-timeline-item {
          padding-bottom: 38px;
          position: static;
          &:last-of-type {
            padding: 0;
          }
          h4 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 12px;
          }
          p {
            font-size: 16px;
            color: #999999;
          }
          ::v-deep {
            .el-timeline-item__tail {
              top: 0;
              height: 108%;
              left: 190px;
              border-left: 1px solid #ddd;
            }
            .el-timeline-item__node {
              left: 184px;
              width: 14px;
              height: 14px;
              background: #ffffff;
              border: 1px solid #e0e0e0;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9;
              &::before {
                content: "";
                display: inline-block;
                width: 6px;
                height: 6px;
                background: #e0e0e0;
                border-radius: 50%;
              }
            }
            .el-timeline-item__wrapper {
              padding-left: 38px;

              .el-timeline-item__timestamp {
                position: absolute;
                left: -190px;
                font-weight: bold;
                color: #999999;
                font-size: 16px;
              }
            }
          }
          &.active {
            ::v-deep {
              .el-timeline-item__node {
                border: 1px solid #1bd9a1;
                &::before {
                  background-color: #1bd9a1;
                }
              }
            }
          }
        }
      }
    }
  }

  .summary-box {
    .express-info {
      width: unset;
      flex: 1;
      &:last-of-type {
        border: none;
      }
    }
  }
}
</style>
