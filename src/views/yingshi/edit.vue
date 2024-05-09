<template>
  <div class="container-box">
    <!-- 政策模块 -->
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="影视标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入影视标题"></el-input>
      </el-form-item>
     <el-form-item label="影视视频" prop="imgurl">
        <el-upload
          class="upload-demo"
          v-if="!ruleForm.imgurl"
          drag
          :action="$store.state.user.beseFile"
          :before-upload="beforeUploadvideo"
          :on-success="handleSuccess"
          :headers="upheaders"
          :limit="1"
          :on-error="handleError"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div v-else style="position: relative;">
          <video width="500"  controls :src="ruleForm.imgurl"></video>
          <i @click="ruleForm.imgurl = ''" class="el-icon-circle-close" style="font-size: 30px;position: absolute;top: -10px;left: 505px;cursor: pointer;"></i>
        </div>
     </el-form-item>
      <!-- <el-form-item label="发布单位">
        <el-input v-model="ruleForm.author" placeholder="请输入发布单位"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="发布时间" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入咨询标题"></el-input>
      </el-form-item> -->
      <el-form-item label="置顶/热门">
        <div style="margin-left: 10px;">
          <el-checkbox-group v-model="ruleForm.hotstr">
            <el-checkbox label="置顶" :value="1"></el-checkbox>
            <el-checkbox label="热门" :value="2"></el-checkbox>
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
        // content:'',
        hotstr:[],
        // categoryid:'',
        sortid:'',
        isshow:true,
        // author:'',
        imgurl:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入政策标题', trigger: 'blur' },
          ],
          // content: [
          //   { required: true, message: '请填写政策内容', trigger: 'change' }
          // ],
          // categoryId: [
          //   {  required: true, message: '请选择所属类别', trigger: 'change' }
          // ],
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
    // this.getselectlist()
  },
  mounted(){
    // 获取文章详情
    GetArtcileInfo({id:this.$route.query.id}).then(res=>{
      let {Title:title,Hotstr:hotstr,Sortid:sortid,Imgurl:imgurl,Isshow:isshow} = res.datalist
      this.ruleForm.title = title
      this.ruleForm.hotstr = hotstr.split(',')
      this.ruleForm.sortid = sortid
      this.ruleForm.isshow = isshow? true : false
      this.ruleForm.imgurl = imgurl
      this.fileList = [{url:imgurl}]
    })
  },
  methods: {
    beforeUploadvideo(file) {
     const isVideo = file.type.startsWith('video/');
      if (!isVideo) {  
        this.$message.error('请上传视频文件！');
        return false;  
      }  
      // 如果需要限制文件大小，可以在这里添加逻辑  
        return true;
      },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.ruleForm.imgurl = response.filepath;
      // 可以在这里处理上传成功后的逻辑，比如更新UI或存储文件信息等
    },
    // 文件上传失败时的钩子
    handleError(error, file, fileList) {
      this .$message.error('视频上传失败，请重试！'+error.msg);
      // 可以在这里处理上传失败后的逻辑，比如重试上传或显示更详细的错误信息
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
