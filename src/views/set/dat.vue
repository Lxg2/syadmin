<template>
  <div class="dat-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      label-position="left"
    >
        <el-form-item label="头像" prop="portrait">
          <image-upload><span slot="trigger">点击更换头像</span></image-upload>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" prop="depm">
          <el-select v-model="ruleForm.depm" placeholder="请选择所属部门">
            <el-option label="总经办" value="gmo"></el-option>
            <el-option label="财务部" value="acc"></el-option>
            <el-option label="人力资源部" value="hr"></el-option>
            <el-option label="技术部" value="it"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="btns-box">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
const validatePhone = (rule, value, callback) => {
  let phone = value.replace(/\s/g, "");
  let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
  if (!regs.test(phone)) {
    callback([new Error("手机号不合法")]);
  } else {
    callback();
  }
};
export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      ruleForm: {
        portrait: "",
        name: "",
        mobile: "",
        depm: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        depm: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
.dat-container {
  background: #FFFFFF;
  padding: 60px 0 115px 88px;
  .btns-box {
    margin-top: 165px;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 48px;
}

::v-deep .el-input__inner {
  height: 48px;
font-size: 16px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #333333;
line-height: 26px;
}

</style>
