
<template>
  <div class="wayadd-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="配送名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入配送名称（必填）"
        ></el-input>
      </el-form-item>

      <el-form-item label="配送类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="先款后货"></el-radio>
          <el-radio label="货到付款"></el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="row-between">
        <el-form-item label="首重" prop="wei">
          <el-input placeholder="请填写首重" v-model="form.wei">
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>

        <el-form-item label="首重运费" prop="frei">
          <el-input placeholder="请填写首重运费" v-model="form.frei">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </div>

      <div class="row-between">
        <el-form-item label="续重" prop="rewei">
          <el-input placeholder="请填写续重" v-model="form.rewei">
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>

        <el-form-item label="续重运费" prop="refrei">
          <el-input placeholder="请填写续重费用" v-model="form.refrei">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </div>

      <el-form-item label="费用类型" prop="expen">
        <el-radio-group v-model="form.expen">
          <el-radio label="统一设置"></el-radio>
          <el-radio label="指定地区"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="配送地区" prop="area">
        <el-button plain size="small">+添加地区</el-button>
        <el-table :data="tableData" class="panel_table mt30">
          <el-table-column prop="deliveryarea" width="330" label="配送地区" />

          <el-table-column prop="firstweight" width="240" label="首重 (kg) " />

          <el-table-column prop="freight" width="240" label="运费（元）" />

          <el-table-column prop="renew" width="240" label="续费（元）" />

          <el-table-column prop="conweight" width="240" label="续重 (kg) " />

          <el-table-column width="130" label="操作">
            <div class="operate">
              <el-button type="text">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!--   <el-form-item label="其它默认" prop="other">
        <el-switch v-model="form.other"></el-switch>
      </el-form-item>

      <el-form-item label="物流保价" prop="guard">
        <el-switch v-model="form.guard"></el-switch>
      </el-form-item>

      <el-form-item label="备注说明" prop="explain">
        <el-input v-model="form.explain" type="textarea" :rows="3"></el-input>
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
      </el-form-item>

      <el-form-item label="是否启用" prop="start">
        <el-switch v-model="form.start"></el-switch>
      </el-form-item> -->
    </el-form>

    <div class="underpart">
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        type: "",
        wei: "",
        frei: "",
        rewei: "",
        expen: "",
        area: "",
        other: "",
        guard: "",
        explain: "",
        sort: "",
        start: "",
      },
      rules: {
        tax: [
          { required: true, message: "请选择税收费用类型", trigger: "blur" },
        ],
        taxi: [
          {
            type: "number",
            required: true,
            message: "请填写数字",
            trigger: "blur",
          },
        ],
        aff: [
          { required: true, message: "请选择订单确认通知", trigger: "blur" },
        ],
        affi: [{ required: true, message: "必填", trigger: "blur" }],
        del: [
          { required: true, message: "请选择订单发货通知", trigger: "blur" },
        ],
        deli: [
          { type: "date", required: true, message: "必填", trigger: "blur" },
        ],
        ful: [
          { required: true, message: "请选择订单完成通知", trigger: "blur" },
        ],
        fuli: [{ required: true, message: "必填", trigger: "blur" }],
      },
      tableData: [
        {
          deliveryarea: "广东",
          firstweight: 1.0,
          freight: 15.0,
          renew: 3.0,
          conweight: 3.0,
        },
        {
          deliveryarea: "广东",
          firstweight: 1.0,
          freight: 15.0,
          renew: 3.0,
          conweight: 3.0,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wayadd-container {
  width: 100%;
  height: 952px;
  background: #ffffff;
  padding: 52px 40px 95px 40px;
  font-size: 16px;
  color: #333333;

  .underpart {
    padding-top: 75px;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}

::v-deep .el-switch.is-checked .el-switch__core {
  border-color: #12dfa3 !important;
  background: #12dfa3 !important;
}

::v-deep .el-input-group--append .el-input__inner {
  width: 614px;
}

::v-deep .el-input--medium .el-input__inner {
  font-size: 16px;
  height: 48px;
}

::v-deep .el-radio__label {
  font-size: 16px;
  line-height: 28px;
}

::v-deep .el-table th,
.el-table td {
  border-bottom: 0;
}
</style>