<template>
  <div class="add-container">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
     class="demo-ruleForm" label-position="left">
      <el-form-item label="类别名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="必填"></el-input>
      </el-form-item>

      <el-form-item label="上级分类" prop="region" class="mt30">
        <el-select v-model="ruleForm.region" placeholder="请选择,非必填">
          <el-option label="分类一" value="1"></el-option>
          <el-option label="分类二" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="排序数字" prop="num">
        <el-input v-model="ruleForm.num" placeholder="必填"></el-input>
      </el-form-item>

      <el-form-item label="调用标识" prop="caller">
        <el-input v-model="ruleForm.caller" placeholder="可空,只允许字母数字下划线"></el-input>
      </el-form-item>

      <el-form-item label="URL链接" prop="look">
        <el-input v-model="ruleForm.look" placeholder="可空,外部的URL链接"></el-input>
      </el-form-item>

      <el-form-item label="类别介绍" prop="textarea">
        <el-input type="textarea" :rows="2" placeholder="可空，分类的详细描述及介绍" v-model="textarea" />
      </el-form-item>

      <el-form-item label="启用状态" prop="critic">
        <el-switch v-model="ruleForm.critic"></el-switch>
      </el-form-item>
      
      <el-form-item style="margin-top: 160px;">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
     components: { Tinymce },
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          num: '',
          caller: '',
          look: '',
          textarea: '',
          critic: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          num: [
            { type: 'number', required: true, message: '请输入排序数字', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.add-container {
    padding: 40px 70px 124px 70px;
    background: #FFFFFF;
    font-family: Microsoft YaHei;

    .title {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }

}

::v-deep .el-form-item__label {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
}

::v-deep .el-switch.is-checked .el-switch__core {
  border-color: #1BD9A1;
  background: #1BD9A1;
}

::v-deep .el-select {
  width: 100%;
}

</style>