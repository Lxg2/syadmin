<template>
    <div class="container-box">
      <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="150px">
        <el-form-item label="广告封面" prop="imgurl">
          <!-- <FilOrImgUpload :ismultiple="true" :limit="1" fileType='img' @backData="backData"> </FilOrImgUpload> -->
          <el-upload  
          :action="$store.state.user.beseFile"  
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-error="handleError"  
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
        >  
          <div slot="trigger" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">  
            <i style="font-size: 80px;" class="el-icon-picture-outline"></i>  
            <i style="font-size: 14px; margin-top: 10px;" class="el-icon-plus">添加封面</i>  
          </div>  
        </el-upload>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="跳转小程序链接" prop="gourl" :rules="[{ required: true, message: '请填写跳转路径', trigger: 'blur' }]">
          <el-input v-model="ruleForm.gourl" placeholder="请输入跳转小程序链接"></el-input>
        </el-form-item>
        <el-form-item label="显示位置" prop="channelname" :rules="[{ required: true, message: '请选择显示位置', trigger: 'change' }]">
          <el-select style="width: 100%;" v-model="ruleForm.channelname" placeholder="请选择显示位置">
            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
    <!-- <el-form-item label="显示">
        <el-switch v-model="ruleForm.Isdelete" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item> -->
        <el-form-item>
          <div class="but-b">
            <el-button @click="$router.go(-1)">取消</el-button>
            <el-button v-loading="loading" type="primary" @click="submitForm('myform')">发布</el-button>
           </div>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { getToken } from '@/utils/auth'
  import {GetSelectchannelname} from '@/api/user'
import {SubmitAd} from '@/api/user.js'
  export default {
    components: {
    },
    data() {
      // 图片验证规则
      var validateImg = (rule, value, callback) => {
            if (value === '' || value === undefined || value.length === 0) {
            callback(new Error('请上传封面'));
            } else {
            callback();
            }
        };
      return {
        options:[
            {
                name: '首页Banner',
                value:'index'
            },
            {
                name: '走进石岩',
                value:'zoujinshiyan'
            },
        ],
        fileList: [],
        upheaders:{},
        loading: false,
        imgdialogVisible:false,
        validateImg,
        dialogImageUrl:'',
        ruleForm: {
          gourl:'',
          channelname:'',
          title:'',
          imgurl:'',
        },
        rules: {
            title: [
              { required: true, message: '请选择标题', trigger: 'blur' },
            ],
            gourl: [
              { required: true, message: '请填写跳转路径', trigger: 'change' }
            ],
            imgurl: [
                 { required: true, trigger: 'change', validator: validateImg, }
            ],
        },
      };
    },
    mounted() {
      this.upheaders = {'Authorization':getToken()}
    },
    methods: {
      backData(val){
        this.ruleForm.Filepath = val
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.loading = true;
            // let {Isdelete} = this.ruleForm
            let res = await SubmitAd({...this.ruleForm})
            if(res.status === 200){
              this.$message.success(res.msg)
              this.$router.go(-1)
            }
            this.loading = false
          }
        });
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
      console.log(this.ruleForm);
    },  
    handleError(error) {  
      this.$message.error(error.msg);  
      // 你可以在这里处理上传失败后的逻辑  
    },  
    handleRemove() {
      this.ruleForm.imgurl = '';
      this.fileList = [];
    },
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
  