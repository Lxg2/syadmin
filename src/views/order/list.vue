<template>
  <div class="order-container">
    <div class="header row-between">
      <div class="ml40">
        <span class="mr20">订单编号</span>
        <el-input class="filter-item mr40" style="width: 179px" placeholder="请输入商品名称"></el-input>
        <span class="mr20">商品类型</span>
        <el-select v-model="listQuery.type" placeholder="商品类型" class="filter-item" style="width: 130px">
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
        <el-date-picker v-model="listQuery.value" class="filter-item ml40" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"/>
      </div>
      <el-input v-model="listQuery.title" placeholder="输入关键词搜索" style="width: 360px; background: #f8f8f8" class="filter-item item-input mr40" @keyup.enter.native="handleFilter">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <div class="baselist">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="mb20">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="待支付" name="pay"></el-tab-pane>
        <el-tab-pane label="待发货" name="awa"></el-tab-pane>
        <el-tab-pane label="待评价" name="eva"></el-tab-pane>
        <el-tab-pane label="已发货" name="alr"></el-tab-pane>
        <el-tab-pane label="已完成" name="fin"></el-tab-pane>
      </el-tabs>

      <ul class="order-head flex">
        <li class="row-start pl20">
          <el-checkbox v-model="allChecked"></el-checkbox>商品
        </li>
        <li>订单详情</li>
        <li>收货人</li>
        <li>金额</li>
        <li>订单状态</li>
        <li>操作</li>
      </ul>
      
      <div class="order-info" v-for="(item, index) in 5" :key="index">
        <ul class="order-head">
          <li class="row-start pl20">
            <el-checkbox v-model="item.checked"></el-checkbox>
            <span class="other">订单号：</span>261729195337
            <span class="other time">2023-02-28 20:54:01</span>
          </li>
          <li><span class="other">何先生</span></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul class="order-table">
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
          </li>
          <li class="price"><span>¥72.40</span> <span>X2</span></li>
          <li><span>韩寒</span></li>
          <li>
            <span class="text-center" style="width: 50px">应付 ¥72.40</span>
          </li>
          <li class="status">
            <span style="color: #ff5858">待付款</span>
            <span>订单详情</span>
          </li>
          <li class="operate p0 row-center">
            <el-button type="text">编辑</el-button>
            <span class="line">|</span>
            <el-button type="text">查看</el-button>
          </li>
        </ul>
      </div>

      <div class="row-center">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
          style="margin-top: 58px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
const calendarTypeOptions = [
  { key: "pay", display_name: "待支付" },
  { key: "awa", display_name: "待发货" },
  { key: "eva", display_name: "待评价" },
  { key: "alr", display_name: "已发货" },
  { key: "fin", display_name: "已完成" },
];

import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      calendarTypeOptions,
      activeName: "all",
      total: 0,
      calendarTypeOptions,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        value: null,
      },
      tableData: [{}, {}],
      allChecked: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleClick(tab, event) {},
    getList() {
    this.listLoading = true;
    fetchList(this.listQuery).then((response) => {
      this.list = response.data.items;
      this.total = response.data.total;
      this.listLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  font-family: Microsoft YaHei;

  .header {
    height: 120px;
    background: #fff;
    margin-bottom: 10px;
  }

  .baselist {
    background-color: #fff;
    padding: 28px 40px 72px 40px;

    ul {
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 10.37%;
        &:nth-of-type(1) {
          flex: 1;
        }
        &:nth-of-type(2) {
          align-items: flex-start;
          width: 17.08%;
        }
        &:nth-of-type(5) {
          width: 12.33%;
        }
        &:nth-of-type(6) {
          width: 19.6%;
        }
      }
    }

    .order-head {
      height: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #f8f8f8;

      li {
        color: #666666;
      }

      .other {
        color: #999999;
      }

      .time {
        margin-left: 38px;
      }
    }

    .order-info {
      border: 1px solid #dddddd;
      border-radius: 4px;
      margin-top: 21px;

      .order-table {
        height: 128px;
        display: flex;
        li {
          border-right: 1px solid #dddddd;
          padding-top: 24px;
          font-size: 16px;
          &:first-of-type,
          &:last-of-type {
            border: none;
          }
          span {
            line-height: 24px;
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
          }

          &.price {
            flex-direction: row;
            span {
              color: #999999;
              flex: 1;
            }
          }
        }
      }
    }
  }
}

::v-deep .el-checkbox__inner {
  width: 20px;
  height: 20px;
  border: 1px solid #dddddd;
  margin-right: 20px;

  &::after {
    height: 9px;
    left: 7px;
    top: 2px;
    width: 5px;
  }
}

::v-deep .el-tabs__item.is-active {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  line-height: 58px;
}

::v-deep .el-tabs__item {
  font-size: 16px;
  font-weight: 400;
}

::v-deep .el-input--medium .el-input__inner {
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 54px;
}

::v-deep .el-range-editor.el-input__inner {
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 54px;
}
</style>
