<template>
  <div class="add-container">

    <div class="flex mb20" title="添加地址" width="100%" :before-close="handleClose">
        <el-form label-width="88px" label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" class="flex1">
          <el-form-item label="物流名称">
            <el-input v-model="ruleForm.name" placeholder="请输入物流名称（必填）" />
          </el-form-item>

          <el-form-item label="物流编号">
            <el-input v-model="ruleForm.num" placeholder="请输入物流编号（必填）" />
          </el-form-item>

          <el-form-item label="物流网址">
            <el-input v-model="ruleForm.address" placeholder="可空,以hppt://开头" />
          </el-form-item>

          <el-form-item label="排序">
            <el-cascader v-model="ruleForm.rank" placeholder="请输入排序"/>
          </el-form-item>

          <el-form-item label="备注说明">
            <el-input type="textarea" v-model="ruleForm.explain" :rows="3"/>
          </el-form-item>

          <el-form-item label="是否启用">
          <el-switch v-model="ruleForm.state" active-color="#1BD9A1" inactive-color="#D1D1D1"></el-switch>
        </el-form-item>
        </el-form>
     </div>

     <div class="underpart">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary">确定</el-button>
     </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          ruleForm: {
            name: '',
            num: '',
            address: '',
            rank:'',
            explain: '',
            state: ''
        },
        rules: {
        name: [
          {
            required: true, message: "请输入物流名称", trigger: "blur",
          },
        ],
        num: [
          {
            required: true, message: "请输入物流编号", trigger: "blur",
          },
        ]
      },
      }
  },
  methods: {
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.add-container {
  background: #FFFFFF;
  padding: 40px 40px 62px;
  font-size: 16px;
  color: #333333;

  .underpart {
    margin: 160px 0 60px 100px;
  }
}

::v-deep .el-form-item__label{
font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #333333;
}

::v-deep .el-input__inner {
height: 48px;
font-size: 16px;
}
</style>