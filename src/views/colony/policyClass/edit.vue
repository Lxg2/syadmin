<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="推荐企业" prop="title" :rules="[{ required: true, message: '请输入推荐企业', trigger: 'blur' }]">
        <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="企业标签">
        <el-tag
          :key="tag"
          v-for="tag in ruleForm.tags"
          closable
          :disable-transitions="false"
          @close="colseitem(tag)">
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
          v-if="!ruleForm.companyname"
          drag
          :action="$store.state.user.beseFile"
          :before-upload="beforeUploadvideo"
          :on-success="handleSuccessvideo"
          :limit="1"
          :on-error="handleErrorvideo"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div v-else style="position: relative;">
          <video width="500"  controls :src="ruleForm.companyname"></video>
          <i @click="ruleForm.companyname = ''" class="el-icon-circle-close" style="font-size: 30px;position: absolute;top: -10px;left: 505px;cursor: pointer;"></i>
        </div>
      </el-form-item>
      <el-form-item label="企业简介">
        <Tinymce ref="editor" v-if="editflag" v-model="ruleForm.content" :height="300">
        </Tinymce>
        <!-- <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.remarks">
        </el-input> -->

      </el-form-item>
      <el-form-item label="产业定位" prop="categoryid">
        <!-- <el-input v-model="ruleForm.categorytitle" placeholder="请输入产业定位标题"></el-input>
         -->
          <el-select style="width: 100%;" v-model="ruleForm.categoryid" clearable placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.Categorytitle"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="成立时间">
        <el-input v-model="ruleForm.worktime" placeholder="请输入成立时间"></el-input>
      </el-form-item>
      <el-form-item label="企业地址">
        <el-input v-model="ruleForm.hdAddress" placeholder="请输入企业地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="ruleForm.tellphone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
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
          <el-button v-loading="editloading" type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {GetArtcileInfo,GetCategoryInfo,UpdateCategory,UpdateArticle} from '@/api/user'
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
      editloading:false,
      editflag:false,
      fileList: [],
      options:[
        {
          id:1,
          Categorytitle:'超高清视频产业'
        },
        {
          id:2,
          Categorytitle:'新能源产业'
        },
        {
          id:3,
          Categorytitle:'智能终端产业'
        },
        {
          id:4,
          Categorytitle:'半导体与集成电路产业'
        }
      ],
      upheaders:{},
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        sortid:'',
        title:'',
        companyname:'',
        imgurl:'',
        categoryid:'',
        isshow:true,
        content:'',
        tags:[],
        tellphone:'',
        hdAddress:'',
        worktime:'',
      },
      rules: {
        categoryid: [
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
    handleSuccessvideo(response, file, fileList) {
      this.ruleForm.companyname = response.filepath;
      // 可以在这里处理上传成功后的逻辑，比如更新UI或存储文件信息等
    },  
    // 文件上传失败时的钩子  
    handleErrorvideo(error, file, fileList) {
      this.$message.error('视频上传失败，请重试！'+error.msg);
      // 可以在这里处理上传失败后的逻辑，比如重试上传或显示更详细的错误信息
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    colseitem(tag){
        this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag), 1);
      },
            // 添加标签
      handleInputConfirm(){
      let inputValue = this.inputValue;
        if (inputValue) {
          // 去重
          if(this.ruleForm.tags.length !== 0){
            !this.ruleForm.tags.includes(inputValue) && this.ruleForm.tags.push(inputValue);
          }else{
            this.ruleForm.tags.push(inputValue);
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    async getinfofn(){
      let {datalist:{Content:content,Companyname:companyname,Title:title,Sortid:sortid,Categoryid:categoryid,Isshow:isshow,Imgurl:imgurl,Tags:tags,Tellphone:tellphone,HdAddress:hdAddress,Worktime:worktime}} = await GetArtcileInfo({id:this.$route.query.id,})
      this.$nextTick(()=>{
        this.ruleForm.content = content
      })
      this.editflag = true
      this.ruleForm.companyname = companyname
      this.ruleForm.categoryid = categoryid
      if(tags && tags.length !== 0){
        this.ruleForm.tags = tags.split(',')
      }
      this.ruleForm.tellphone = tellphone
      this.ruleForm.hdAddress = hdAddress
      this.ruleForm.worktime = worktime
      this.ruleForm.title = title
      this.ruleForm.sortid = sortid
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
          this.editloading = true
          let {isshow,tags} = this.ruleForm
          if(tags && tags.length !== 0){
            tags = tags.join(',')
          }
          let res = await UpdateArticle({...this.ruleForm,tags,isshow:+isshow,channelname:this.$route.meta.channelname,id:this.$route.query.id})
          if(res.status === 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }
          this.editloading = false
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
