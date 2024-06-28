<template>
  <div class="container-box">
    <!-- 政策模块 -->
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="历史沿革时间" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入历史沿革标题"></el-input>
      </el-form-item>
      <el-form-item label="历史沿革内容" prop="content">
        <!-- <Tinymce v-if="editflag" ref="editor" v-model="ruleForm.content" :height="300">
        </Tinymce> -->
        <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入历史沿革沿革内容"></el-input>
      </el-form-item>
      <el-form-item label="置顶/热门">
        <div style="margin-left: 10px;">
          <el-checkbox-group v-model="ruleForm.hotstr">
            <el-checkbox label="置顶" :value="1"></el-checkbox>
            <el-checkbox label="热门" :value="2"></el-checkbox>
          </el-checkbox-group>
        </div>
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
      <el-form-item label="排序ID">
        <el-input v-model="ruleForm.sortid" placeholder="ID越小越靠前"></el-input>
      </el-form-item>
      <!-- <el-form-item label="历史沿革封面" prop="imgurl">
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
        title:'',
        content:'',
        hotstr:[],
        categoryid:'',
        sortid:'',
        isshow:true,
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
      let {Title:title,Content:content,Hotstr:hotstr,Categoryid:categoryid,Sortid:sortid,Isshow:isshow} = res.datalist
      this.ruleForm.title = title
      this.editflag = true
      this.ruleForm.hotstr = hotstr.split(',')
      this.ruleForm.categoryid = categoryid
      this.ruleForm.sortid = sortid
      this.ruleForm.isshow = isshow? true : false
      this.ruleForm.content = content
      //  this.$nextTick(()=>{
      //   console.log(this.$refs.editor);
      // // 获取富文本内容
      // })
    })
  },
  methods: {
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
