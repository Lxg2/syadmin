<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="分类标题" prop="categorytitle">
        <el-input v-model="ruleForm.categorytitle" placeholder="请输入分类标题"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序ID">
        <el-input v-model="ruleForm.sortid" placeholder="ID越小越靠前"></el-input>
      </el-form-item> -->
      <el-form-item label="是否显示">
        <div style="margin-left: 10px;">
          <el-switch
            v-model="ruleForm.isshow"
            active-text="显示"
            inactive-text="隐藏">
          </el-switch>
        </div>
      </el-form-item>
      <el-form-item label="分类封面" prop="imgurl">
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
          <el-button type="primary" @click="submitForm('myform')">修改</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {allAddCategoryreq,GetCategoryInfo,UpdateCategory} from '@/api/user'
import { getToken } from '@/utils/auth'

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
      fileList: [],
      upheaders:{},
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      ruleForm: {
        categorytitle:'',
        // sortid:'',
        imgurl:'',
        isshow:false,
      },
      rules: {
        categorytitle: [
            { required: true, message: '请输入分类标题', trigger: 'blur' },
          ],
          // imgurl: [
          //   { required: true, trigger: 'change', validator: validateImg, }
          // ],
      },
    };
  },
  created(){
    this.getinfofn()
  },
  mounted() {
    this.upheaders = {'Authorization':getToken()}
  },
  methods: {
    async getinfofn(){
      let {datalist:{Categorytitle:categorytitle,Isshow:isshow,Imgurl:imgurl}} = await GetCategoryInfo({id:this.$route.query.id})
      this.ruleForm.categorytitle = categorytitle
      this.ruleForm.isshow = isshow?true:false
      this.ruleForm.imgurl = imgurl
      if(imgurl){
        this.fileList = [{url:imgurl}]
      }
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.imgurl = res.filepath;
      this.fileList = [{url:imgurl}]
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
          let {isshow} = this.ruleForm
          let res = await UpdateCategory({...this.ruleForm,isshow:+isshow,channelname:this.$route.meta.channelname,id:this.$route.query.id})
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
  padding: 3.038% 0px 1%;
  box-sizing: border-box;
}
</style>
