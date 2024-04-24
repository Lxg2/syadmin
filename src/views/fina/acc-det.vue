<template>
  <div class="acc-container">
    <div class="express-box flex summary-box mb24">
      <div class="express-info">
        <div class="title">交易信息</div>
        <ul class="logist">
          <li class="logistics">
            <span>订单编号：</span>
            20202009029090902909
          </li>
          <li class="logistics">
            <span>支付流水号：</span>
            20202009029090902909
          </li>
          <li class="logistics">
            <span>结算时间：</span>
            2023-03-21 23:00:28
          </li>
          <li class="logistics">
            <span>支付方式：</span>
            支付宝
          </li>
        </ul>
      </div>

      <div class="express-info">
        <div class="title">买家信息</div>
        <ul class="logist">
          <li class="logistics">
            <span>买家昵称：</span>
            黄龙钟
          </li>
          <li class="logistics">
            <span>联系电话：</span>
            15609890890
          </li>
          <li class="logistics">
            <span>邮件：</span>
            hang1658@163.com
          </li>
          <li class="logistics">
            <span>账号信息：</span>
            15609890890
          </li>
        </ul>
      </div>

      <div class="express-info">
        <div class="title">物流信息</div>
        <ul class="logist">
          <li class="logistics">
            <span>收货地址 :</span>
            北京 北京市 朝阳区
          </li>
          <li class="logistics">
            <span>物流名称 :</span>
            顺丰快递
          </li>
          <li class="logistics">
            <span>快递单号 :</span>
            2090902090290
          </li>
        </ul>
      </div>
    </div>

    <div>
      <el-table :data="PopObj" class="ranking_table">
        <el-table-column prop="paview" label="商品名称">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.onelines }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="paysta" label="状态" width="240">
          <template slot-scope="scope">
            <div
              :style="{
                color: scope.row.payStatus ? 'red' : '#16D2A2',
              }"
            >
              {{ PAY_STATUS[scope.row.payStatus] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="goodstype" label="单价" width="240" />

        <el-table-column prop="pv" label="数量" width="240" />

        <el-table-column prop="numpay" label="优惠" width="240" />

        <el-table-column prop="paypc" label="商品总价" width="224" />
      </el-table>

      <div class="express-fee">
        <ul class="logisti">
          <li class="logist">
            <span>快递费：</span>
            15.00
          </li>
          <li class="logist">
            <span>实付：</span>
            215.00
          </li>
        </ul>
      </div>

      <el-button type="primary" class="ml30 mt30">返回</el-button>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    const PAY_STATUS = {
      0: "交易失败",
      1: "交易成功",
    };
    return {
      PAY_STATUS,
      PopObj: [
        {
          onelines: "无敌可爱的MINI充电手持 小风扇， 夏天必备",
          payStatus: 1,
          goodstype: 100.0,
          pv: 2,
          numpay: "--",
          paypc: 200.0,
        },
        {
          onelines: "无敌可爱的MINI充电手持 小风扇， 夏天必备",
          payStatus: 0,
          goodstype: 100.0,
          pv: 2,
          numpay: "--",
          paypc: 200.0,
        },
      ],
    };
  },
};
</script>
  
<style lang="scss" scoped>
.acc-container {
  width: 100%;
  padding: 40px 40px 120px;
  background: #ffffff;
  font-family: Microsoft YaHei;

  .express-box {
    font-size: 16px;
    color: #333333;
    .express-info {
      width: 33.33%;
      padding: 40px;
      position: relative;
      background: #f8f8f8;
      .title {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 33px;
      }
      .logist {
        .logistics {
          margin-bottom: 22px;
          display: flex;
          span {
            margin-right: 20px;
            color: #999999;
            min-width: 65px;
            display: inline-block;
          }
        }
      }
    }
  }

  .express-fee {
    position: relative;
    .logisti {
      right: 130px;
      min-width: 155px;
      position: absolute;
      align-items: center;
      .logist {
        margin-bottom: 35px;
        display: flex;
        color: #ff5a5a;
        span {
          color: #333333;
          min-width: 65px;
          display: inline-block;
        }
      }
    }
  }
}
</style>