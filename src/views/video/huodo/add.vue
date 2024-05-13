<template>
    <div class="container-box">
      <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="content">
          <Tinymce ref="editor" v-model="ruleForm.content" :height="300">
          </Tinymce>
        </el-form-item>
        <el-form-item label="置顶/热门">
          <div style="margin-left: 10px;">
            <el-checkbox-group v-model="ruleForm.hotstr">
              <el-checkbox label="置顶" value="1"></el-checkbox>
              <el-checkbox label="热门" value="2"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <!-- <el-form-item label="所属分类" :prop="categoryid">
          <el-select style="width: 100%;" v-model="ruleForm.categoryid" clearable placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.Categorytitle"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="排序ID">
          <el-input v-model="ruleForm.sortid" placeholder="ID越小越靠前"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <div style="margin-left: 10px;">
            <el-switch
              v-model="ruleForm.isshow"
              active-text="显示"
              inactive-text="隐藏">
            </el-switch>
          </div>
        </el-form-item>
        <el-form-item label="活动封面" prop="imgurl">
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
              <i style="font-size: 14px; margin-top: 10px;" class="el-icon-plus">添加封面</i>  
            </div>  
          </el-upload>
        </el-form-item>
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
  import ImageUpload from "@/components/Upload/ImageUpload.vue";
  import Tinymce from "@/components/Tinymce";
  import {allAddreq} from '@/api/user'
  import { getToken } from '@/utils/auth'
  import {GetSelectCategory} from '@/api/user'
  
  export default {
    components: {
      ImageUpload,
      Tinymce
    },
    data() {
      // 图片验证规则
      var validateImg = (rule, value, callback) => {
          if (value === '' || value === undefined) {
            callback(new Error('请上传封面'));
          } else {
            callback();
          }
        };
      return {
        options:[],
        fileList: [],
        upheaders:{},
        imgdialogVisible:false,
        validateImg,
        dialogImageUrl:'',
        loading: false,
        ruleForm: {
          title:'',
          content:'',
          hotstr:[],
          sortid:'',
          imgurl:'',
          isshow:true,
          // categoryid:''
        },
        rules: {
          title: [
              { required: true, message: '请输入标题', trigger: 'blur' },
            ],
            // categoryid: [
            //   { required: true, message: '请选择分类', trigger: 'blur' },
            // ],
            content: [
              { required: true, message: '请填写内容', trigger: 'change' }
            ],
            imgurl: [
              { required: true, trigger: 'change', validator: validateImg, }
            ],
        },
      };
    },
    mounted() {
      this.upheaders = {'Authorization':getToken()}
      this.getclasslist()
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
            this.loading = true;
            let {isshow,hotstr} = this.ruleForm
            let res = await allAddreq({...this.ruleForm,isshow:+isshow,hotstr:hotstr.join(','),channelname:this.$route.meta.channelname})
            if(res.status === 200){
              this.$message.success(res.msg)
              this.$router.go(-1)
            }
            this.loading = false;
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
  