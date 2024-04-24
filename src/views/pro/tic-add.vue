<template>
  <div class="ticadd-container">
    <div class="title mb20">基础信息</div>
    <el-form
      label-width="88px"
      :model="ruleForm"
      ref="ruleForm"
      label-position="left"
    >
      <el-form-item label="优惠券名">
        <el-input
          v-model="ruleForm.name"
          placeholder="请选择填写优惠券名（必填）"
        />
      </el-form-item>

      <el-form-item label="优惠面额">
        <el-input v-model="ruleForm.address" placeholder="请填写优惠面额">
          <template slot="append">元</template></el-input
        >
      </el-form-item>

      <el-form-item label="消费门槛">
        <el-input v-model="ruleForm.telephone" placeholder="请填写消费门槛金额">
          <template slot="append">元</template></el-input
        >
      </el-form-item>

      <el-form-item label="发现数量">
        <el-cascader v-model="ruleForm.dis" placeholder="请选择活动对象" />
      </el-form-item>

      <el-form-item label="有效期">
        <div class="block">
          <el-date-picker
            v-model="indates"
            type="date"
            placeholder="请选择开始时间"
          />
          <span>至</span>
          <el-date-picker
            v-model="indaten"
            type="date"
            placeholder="请选择截至时间"
          />
        </div>
      </el-form-item>

      <el-form-item label="领取时间">
        <el-input v-model="ruleForm.telephone" />
      </el-form-item>

      <el-form-item label="使用时间">
        <el-input v-model="ruleForm.telephone" />
      </el-form-item>

      <el-form-item label="适用范围">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="全场"></el-radio>
          <el-radio label="指定分类"></el-radio>
          <el-radio label="指定商品"></el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="mb32">
        <span class="title mr20">商品</span>
        <el-button class="ml30" type="primary" size="small" icon="el-icon-plus">
          <router-link :to="'/pro/goodsad'">新增</router-link>
        </el-button>
      </div>

      <el-table :data="tableData" class="ranking_table">
        <el-table-column type="selection" align="center" />

        <el-table-column prop="visname" label="商品名称">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.visname }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="original" label="售价" width="200" />

        <el-table-column prop="inventory" label="库存" width="200" />

        <el-table-column align="center" label="操作" width="200">
          <div class="operate">
            <el-button type="text">编辑</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </el-form>

    <div class="underpart">
      <el-button>取 消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        num: "",
        dis: "",
        address: "",
        rank: "",
        explain: "",
        state: "",
        resource: "",
      },
      tableData: [
        {
          visname: "无敌可爱的MINI充电手持 小风扇， 夏天必备",
          original: "¥218.00",
          inventory: 118,
        },
        {
          visname: "无敌可爱的MINI充电手持 小风扇， 夏天必备",
          original: "¥218.00",
          inventory: 118,
        },
      ],
      startTime: "",
      endTime: "",
      indates: "",
      indaten: "",
    };
  },
};
</script>
  
<style lang="scss" scoped>
.ticadd-container {
  padding: 40px 40px 100px;
  background: #ffffff;
  font-family: Microsoft YaHei;
  color: #333333;

  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 54px;
  }

  .block {
    span {
      margin: 0 26px;
      font-size: 16px;
    }
  }
  .underpart {
    padding: 100px 0 100px 128px;
  }
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #12dfa3 !important;
  background: #12dfa3 !important;
}

::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #333333 !important;
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 54px;
}

::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  line-height: 54px;
}

::v-deep .el-range-input {
  font-size: 16px;
}

::v-deep .el-range-separator {
  font-size: 16px;
}

::v-deep .el-radio__label {
  font-size: 16px;
  line-height: 54px;
}
</style>