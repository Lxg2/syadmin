<template>
  <div class="edit-container">
    <el-form label-width="115px" label-position="left"> 
      <el-form-item label="支付平台">
        <el-select v-model="form.platform" placeholder="请选择支付平台">
          <el-option label="支付宝" value="zfb"></el-option>
          <el-option label="微信" value="wx"></el-option>
          <el-option label="Apple Pay" value="app"></el-option>
          <el-option label="数字人民币" value="rmb"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="接口类型">
        <el-select v-model="form.type" placeholder="请选择接口类型">
          <el-option label="手机网站支付" value="apit"></el-option>
          <!-- <el-option label="微信" value="wx"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="支付名称">
        <el-input v-model="form.name" placeholder="请填写支付名称"></el-input>
      </el-form-item>

      <el-form-item label="排序数字">
        <el-select v-model="form.sort" placeholder="请选择排序">
          <el-option label="1" value="one"></el-option>
          <el-option label="2" value="two"></el-option>
          <el-option label="3" value="three"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付宝AppID">
        <el-select v-model="form.type" placeholder="支付宝开放平台AppID">
          <el-option label="手机网站支付" value="zfb"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付宝公钥">
        <el-select v-model="form.type" placeholder="普通公钥方式的支付宝公钥RSA2">
          <el-option label="手机网站支付" value="zfb"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="应用私钥">
        <el-select v-model="form.type" placeholder="支付宝开放平台开发助手生成的应用私钥">
          <el-option label="手机网站支付" value="zfb"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="启用状态">
        <el-switch v-model="form.delivery" active-color="#1BD9A1" inactive-color="#D1D1D1"></el-switch>
      </el-form-item>

      <el-form-item class="underpart">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        form: {
          platform: '',
          type: '',
          name: '',
          sort: '',
          delivery: true
        }
      }
    },
    methods: {
      onSubmit() {
      }
    }
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 40px 70px 92px 40px;
  background: #FFFFFF;
}
.el-select, .el-input {
  width: 1448px;
  height: 48px;
  padding-bottom:30px;
}

.underpart {
  padding-top: 120px;
}
.el-button {
  width: 240px;
  height: 48px;
  border: 1px solid #D9D9D9;
  font-size: 16px;
  font-weight: 400;
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 54px;   
}

::v-deep .el-input--medium .el-input__inner {
  height: 48px;
  font-size: 16px;
}

::v-deep .el-switch__core {
  margin-top: 10px;
}
</style>