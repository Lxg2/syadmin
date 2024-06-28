<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="100px">
      <el-form-item label="区位交通" prop="content">
        <Tinymce ref="editor" v-model="ruleForm.content" :height="300">
        </Tinymce>
      </el-form-item>
      <!-- <el-form-item label="资讯封面" prop="imgurl">
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
      </el-form-item> -->
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {GetArtcileInfo,GetSelectCategory,UpdateArticle} from '@/api/user'
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
      form:{},
      fileList:[],
      imgdialogVisible:false,
      editflag:false,
      validateImg,
      dialogImageUrl:'',
      containertext:'',
      ruleForm: {
        content:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写内容', trigger: 'change' }
          ],
          categoryId: [
            {  required: true, message: '请选择所属类别', trigger: 'change' }
          ],
          imgurl: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
      },
    options:[
    ]
    }
  },
  created(){
    // 获取分类无分页
    this.getselectlist()
  },
  mounted(){
    // 获取文章详情
    GetArtcileInfo({id:this.$route.query.id}).then(res=>{
      let {Content:content} = res.datalist
      this.ruleForm.content = content
       this.$nextTick(()=>{
      // 获取富文本内容
        this.$refs.editor.setContent(content)
      })
    })
  },
  methods: {
    async getselectlist(){
      let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
      this.options = res.datalist
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let {hotstr,isshow} = this.ruleForm
          this.ruleForm.hotstr = hotstr.join(',')
          let res = await UpdateArticle({...this.ruleForm,id:this.$route.query.id,channelname:this.$route.meta.channelname,isshow:+isshow})
          if(res.status == 200){
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
