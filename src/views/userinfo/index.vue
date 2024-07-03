<template>
    <div class="container-box">
      <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
        <el-form-item label="账户头像" prop="imgurl">
          <el-upload
            :action="$store.state.user.beseFile"  
            list-type="picture-card"  
            :on-success="handleSuccess"
            :on-error="handleError"  
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :file-list="fileList"
            :headers="upheaders"
            :limit="1"
          >  
            <div slot="trigger" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">  
              <i style="font-size: 80px;" class="el-icon-picture-outline"></i>  
              <i style="font-size: 14px; margin-top: 10px;" class="el-icon-plus">添加头像</i>  
            </div>  
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.title" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="zh">
          <el-input v-model="ruleForm.zh" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pas">
          <el-input type="password" show-password v-model="ruleForm.pas" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pas">
          <el-input type="password" show-password v-model="ruleForm.pas" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="but-b">
            <el-button type="primary" @click="submitForm('myform')">保存</el-button>
           </div>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import ImageUpload from "@/components/Upload/ImageUpload.vue";
  
  export default {
    components: {
      ImageUpload,
    },
    data() {
      // 图片验证规则
      var validateImg = (rule, value, callback) => {
          if (value === '' || value === undefined) {
            callback(new Error('请上传头像'));
          } else {
            callback();
          }
        };
      return {
        validateImg,
        fileList:[],
        ruleForm: {
          title:'',
          zh:'',
          pas:'',
          imgurl:'',
        },
        rules: {
            pas: [
              { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            zh: [
              { required: true, message: '请填写账号', trigger: 'change' }
            ],
            imgurl: [
              { required: true, trigger: 'change', validator: validateImg, }
            ],
        },
      };
    },
    mounted() {
    },
    methods: {
      async getclasslist() {
        let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
        this.options = res.datalist
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';  
        const isPNG = file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }  
        if (!isLt10M) {
          this.$message.error('上传图片大小不能超过 10MB!');
        }  
        return isJPG || isPNG && isLt10M;
      },  
      handleSuccess(response) {
        this.ruleForm.imgurl = response.filepath;
      },  
      handleError(error) {  
        this.$message.error(error.msg);  
        // 你可以在这里处理上传失败后的逻辑  
      },  
      handleRemove() {
        this.ruleForm.imgurl = '';
        this.fileList = [];
        // 你可以在这里处理删除文件后的逻辑，比如更新fileList  
      },
      // 提交表单
      async submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let {isshow,hotstr} = this.ruleForm
            let res = await allAddreq({...this.ruleForm,isshow:+isshow,hotstr:hotstr.join(','),channelname:this.$route.meta.channelname})
            if(res.status === 200){
              this.$message.success(res.msg)
              this.$router.go(-1)
            }
          }
        });
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  ::v-deep {
    .my-form .el-form-item .el-form-item__label{
      font-size: 17px !important;
  }
  }
  .container-box {
    min-height: 100%;
    height: auto !important;
    padding: 3.038% 3.038% 1%;
    box-sizing: border-box;
  }
  </style>
  