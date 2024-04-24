<template>
  <div class="hotPay-box card-box">
    <div class="top row-between mb20">
      <div class="row">
        <div class="title">支付排行榜</div>
        <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
      </div>
      <el-button type="text">
        <router-link :to="'/mdm/pay'">查看更多</router-link>
      </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" class="ranking_table">
      <el-table-column label="排名" width="304">
        <template slot-scope="scope">
          <div class="index-box">
            <img class="pic" src="../../../../assets/logo.png" v-if="scope.$index < 3" />
            <span v-else>
              {{ scope.$index + 1 }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="visname" label="商品名称">
        <template slot-scope="scope">
          <div class="flex" style="height: 100%;align-items: center;">
            <div>
             <el-image class="thumb" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']" />
            </div>
            <div class="onelies-box">
              <span class="onelines">{{ scope.row.proname }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="paynum" label="支付人数" width="332">
        <template slot-scope="scope">
          <span style="color: #096bed">{{ scope.row.paynum }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="payment" label="支付金额" width="162" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HotPay",
  data() {
    return {
      tableData: [
        {
          proname: "无敌可爱的MINI充电手持小风扇,夏天必备无敌可爱的MINI充电手持小风扇,夏天必备无敌可爱的MINI充电手持小风扇,夏天必备",
          paynum: 20000,
          payment: 180900.0,
        },
        {
          proname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          paynum: 20000,
          payment: 180900.0,
        },
        {
          proname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          paynum: 20000,
          payment: 180900.0,
        },
        {
          proname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          paynum: 20000,
          payment: 180900.0,
        },
      ],
    };
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.index-box{
  text-align: center;
}
.hotPay-box {
  height: 737px;
  padding: 31px 32px 54px 25px;

  .title {
    line-height: 54px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }

  .time {
    margin-left: 8px;
    line-height: 14px;
    font-size: 14px;
    color: #999999;
  }
}
</style>