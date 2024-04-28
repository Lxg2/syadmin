<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="直播标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入政策标题"></el-input>
      </el-form-item>
      <el-form-item label="标签展示">
        <el-tag
          :key="tag"
          v-for="tag in ruleForm.dynamicTags"
          closable
          :disable-transitions="false"
          @close="(tag)=>{
            ruleForm.dynamicTags.splice(ruleForm.dynamicTags.indexOf(tag), 1);
          }">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput" style="font-size: 13px !important;">+ 类型标签</el-button>
      </el-form-item>
      <el-form-item label="直播宣传片">
        <el-upload
          class="upload-demo"
          v-if="!ruleForm.imgurl"
          drag
          :action="$store.state.user.beseFile"
          :before-upload="beforeUploadvideo"
          :on-success="handleSuccess"
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
      <el-form-item label="直播简介" prop="content">
        <Tinymce ref="editor" v-if="editflag" v-model="ruleForm.content" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item label="咨询电话" prop="communityusermobile">
        <el-input v-model="ruleForm.communityusermobile" placeholder="请输入电话"></el-input>
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
import Tinymce from "@/components/Tinymce";
import {GetArtcileInfo,GetSelectCategory,UpdateArticle} from '@/api/user'
export default {
  components: {
    ImageUpload,
    Tinymce
  },
  data() {
     // 图片验证规则
     var validatePhone = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请输入咨询号码'));
        } else {
          let s = /^(?:(?:\+?86)?1\d{10})|(?:(?:\d{3,4}-)?\d{7,8})(?:-\d+)?$/;
          if(!s.test(value)){
           return callback(new Error('请输入正确号码'));
          }
          callback();
        }
      };
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
      validateImg,
      validatePhone,
      dialogImageUrl:'',
      editflag:false,
      containertext:'',
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        dynamicTags:[],
        title:'',
        content:'',
        // hotstr:[],
        communityusermobile:'',
        // sortid:'',
        imgurl:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入政策标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写政策内容', trigger: 'change' }
          ],
          communityusermobile: [
            { required: true, trigger: 'blur', validator: validatePhone, }
          ],
          // categoryId: [
          //   {  required: true, message: '请选择所属类别', trigger: 'change' }
          // ],
          // imgurl: [
          //   { required: true, trigger: 'change', validator: validateImg, }
          // ],
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
    GetArtcileInfo({id:this.$route.meta.queryid}).then(res=>{
      let {Title:title,Content:content,Imgurl:imgurl,Communityusermobile:communityusermobile} = res.datalist
      this.ruleForm.title = title
      this.ruleForm.communityusermobile = communityusermobile
      this.editflag = true
      this.ruleForm.imgurl = imgurl
      this.fileList = [{url:imgurl}]
       this.$nextTick(()=>{
        this.ruleForm.content = content
      // 获取富文本内容
      })
    })
  },
  methods: {
     // 添加标签
     handleInputConfirm(){
      let inputValue = this.inputValue;
        if (inputValue) {
          // 去重
          if(this.ruleForm.dynamicTags.length !== 0){
            !this.ruleForm.dynamicTags.includes(inputValue) && this.ruleForm.dynamicTags.push(inputValue);
          }else{
            this.ruleForm.dynamicTags.push(inputValue);
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
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
      this.$message.error('视频上传失败，请重试！'+error.msg);  
      // 可以在这里处理上传失败后的逻辑，比如重试上传或显示更详细的错误信息  
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
          let res = await UpdateArticle({...this.ruleForm,id:this.$route.meta.queryid,channelname:this.$route.meta.channelname,isshow:+isshow})
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
