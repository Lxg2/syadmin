<template>
  <div class="par-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="税收费用类型" prop="tax">
        <el-radio-group v-model="form.tax">
          <el-radio label="百分比"></el-radio>
          <el-radio label="固定金额"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="税收费用金额" prop="taxi">
        <el-input v-model="form.taxi"  placeholder="请输入金额" ></el-input>
      </el-form-item>

      <el-form-item label="订单确认通知" prop="aff">
        <el-radio-group v-model="form.aff">
          <el-radio label="关闭"></el-radio>
          <el-radio label="短信"></el-radio>
          <el-radio label="邮件"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="通知模版" prop="affi">
        <el-input v-model="form.affi"  type="textarea" :autosize="{ minRows: 2}" placeholder="必填" ></el-input>
      </el-form-item>

      <el-form-item label="订单发货通知" prop="del">
        <el-radio-group v-model="form.del">
          <el-radio label="关闭"></el-radio>
          <el-radio label="短信"></el-radio>
          <el-radio label="邮件"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="通知模版" prop="deli">
        <el-input v-model="form.deli"  type="textarea" :autosize="{ minRows: 2}" placeholder="必填" ></el-input>
      </el-form-item>

      <el-form-item label="订单完成通知" prop="ful">
        <el-radio-group v-model="form.ful">
          <el-radio label="关闭"></el-radio>
          <el-radio label="短信"></el-radio>
          <el-radio label="邮件"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="通知模版" prop="fuli">
        <el-input v-model="form.fuli"  type="textarea" :autosize="{ minRows: 2}" placeholder="必填" ></el-input>
      </el-form-item>
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
        tax: "",
        taxi: "",
        aff: "",
        affi: "",
        del: "",
        deli: "",
        ful: "",
        fuli: "",
      },
        rules: {
          tax: [
            { required: true, message: '请选择税收费用类型', trigger: 'blur' }
          ],
          taxi: [
            { type: 'number', required: true, message: '请填写数字', trigger: 'blur' }
          ],
          aff: [
            { required: true, message: '请选择订单确认通知', trigger: 'blur' }
          ],
          affi: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          del: [
            { required: true, message: '请选择订单发货通知', trigger: 'blur' }
          ],
          deli: [
            { type: 'date', required: true, message: '必填', trigger: 'blur' }
          ],
          ful: [
            { required: true, message: '请选择订单完成通知', trigger: 'blur' }
          ],
          fuli: [
            {  required: true, message: '必填', trigger: 'blur' }
          ]
        }
    };
  },
};
</script>

<style lang="scss" scoped>
.par-container {
  background: #ffffff;
  padding: 40px 40px 0 40px;

  .underpart {
    padding: 75px 0 62px 176px;
  }
    
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 54px;
}
  
  ::v-deep .el-radio__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 54px;
}
  
::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
}

::v-deep .el-textarea__inner {
  font-size: 16px;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #12dfa3 !important;
  background: #12dfa3 !important;
}

::v-deep .el-radio__input.is-checked + .el-radio__label{
  color: #333333 !important;
}
</style>