<template>
    <div class="container-box">
      <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="200px">
        <el-form-item label="石岩封面" prop="filelist">
          <el-upload
            :action="$store.state.user.beseFile"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :file-list="fileList"
            :headers="upheaders"
            multiple
          >
            <div slot="trigger" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">  
              <i style="font-size: 80px;" class="el-icon-picture-outline"></i>  
              <i style="font-size: 14px; margin-top: 10px;" class="el-icon-plus">添加封面</i>  
            </div>  
          </el-upload>
        </el-form-item>
        <el-form-item label="街道概况" prop="remarks" :rules="[{ required: true, message: '请填写内容', trigger: 'change' }]">
          <Tinymce ref="editor" :value="ruleForm.remarks" v-model="ruleForm.remarks" :height="250">
          </Tinymce>
        </el-form-item>
        <!-- <el-form-item label="地理位置" prop="hdAddress" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
          <el-input v-model="ruleForm.hdAddress" placeholder="请输入地理位置"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="视频宣传">
              <el-upload
                class="upload-demo"
                v-if="!ruleForm.title"
                drag
                :action="$store.state.user.beseFile"
                :before-upload="beforeUploadvideo"
                :on-remove="handleRemovevdeio"
                :on-success="videoHandleSuccess"
                :limit="1"
                :on-error="handleError"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
              </el-upload>
              <div v-else style="position: relative;">
                <video width="400" preload="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg" controls :src="ruleForm.title"></video>
                <i @click="ruleForm.title = ''" class="el-icon-circle-close" style="font-size: 30px;position: absolute;top: -10px;left: 36%;cursor: pointer;"></i>
              </div>
        </el-form-item> -->
        <el-form-item label="历史文化" prop="content" :rules="[{ required: true, message: '请填写内容', trigger: 'change' }]">
          <Tinymce ref="editor2" :value="ruleForm.content" v-model="ruleForm.content" :height="250">
          </Tinymce>
        </el-form-item>
        <el-form-item>
          <div class="but-b">
            <el-button @click="$router.go(-1)">取消</el-button>
            <el-button v-loading="editloadingflag" type="primary" @click="submitForm('myform')">保存</el-button>
           </div>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import ImageUpload from "@/components/Upload/ImageUpload.vue";
  import Tinymce from "@/components/Tinymce";
  import {GetArtcileInfo,UpdateArticle,allAddreq} from '@/api/user'
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
        editflag:false,
        editloadingflag:false,
        fileList: [],
        upheaders:{},
        imgdialogVisible:false,
        validateImg,
        dialogImageUrl:'',
        inputVisible: false,
        inputValue: '',
        ruleForm: {
          filelist:[],
          remarks:'',
          content:'',
        },
        rules: {
          title: [
              { required: true, message: '请输入', trigger: 'blur' },
            ],
            categoryid: [
              { required: true, message: '请选择', trigger: 'blur' },
            ],
            content: [
              { required: true, message: '请填写内容', trigger: 'change' }
            ],
            filelist: [
              { required: true, trigger: 'change', validator: validateImg, }
            ],
        },
      };
    },
    mounted(){
         // 获取详情
         GetArtcileInfo({id:'a507e0f8-e5f0-4d50-802e-a6742f6c7588'}).then(res=>{
          let {Content:content,Remarks:remarks,
            Fileslist:filelist,
          } = res.datalist
          // this.ruleForm.title = title
          let arr = []
          filelist.forEach(item=>arr.push({uid:Math.ceil(Math.random() * 100000+Math.random(10)),url:item}))
          this.ruleForm.filelist = arr
          this.fileList = arr
          // this.ruleForm.hdAddress = hdAddress
          this.editflag = true
          this.ruleForm.remarks = remarks
          this.ruleForm.content = content
          this.$nextTick(()=>{
            console.log(this.$refs.editor);
            console.log(this.$refs.editor2);
            this.$refs.editor.setContent(this.ruleForm.content)
            this.$refs.editor2.setContent(this.ruleForm.content)
          })
        })
    },
    methods: {
      // 视频验证逻辑
      beforeUploadvideo(file) {
     const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        this.$message.error('请上传视频文件！');
        return false;  
      }  
      // 如果需要限制文件大小，可以在这里添加逻辑  
        return true;
      },
      videoHandleSuccess(response, file, fileList){
        if(response.status === 200){
          this.ruleForm.title = response.filepath;
        }else{
          this.$message.error(response.msg);
        }
      },
      handleRemovevdeio(){
        this.ruleForm.title = ''
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
      handleSuccess(response, file, fileList) {
      if(response.status === 200){
        if (fileList.every(item => item.status == "success")) {
            //由于fileList是所有的文件包含之前已上传过的，这里需要做区分（带response的即为新上传的）
            fileList.map(item => {
              if(item.response){
                this.ruleForm.filelist.push({url:item.response.filepath,uid:item.uid});
              }
            })
          }
      }else{
        this.$message.error(response.msg);
      }
        // this.ruleForm.filelist.push({url:response.filepath,uid:file.uid});
      },
      handleError(error) {
        this.$message.error(error.msg);
        // 你可以在这里处理上传失败后的逻辑
      },  
      handleRemove(data) {
        // 排除
        let index = this.ruleForm.filelist.findIndex(item => item.uid === data.uid);
        this.ruleForm.filelist.splice(index, 1);
      },
      async getselectlist(){
        let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
        this.options = res.datalist
      },
       // 获取经纬度
       async getLatLng () {
        // const geocoder = new TMap.service.Geocoder({
        // });  
        let {filelist} = this.ruleForm
            if(filelist.length > 0){
              filelist = filelist.map(item => item.url).join(',')
              }
            let res = await allAddreq({...this.ruleForm,filelist,id:this.$route.query.id,channelname:this.$route.meta.channelname})
            if(res.status == 200){
              this.$message.success(res.msg)
            }
            this.editloadingflag = false
        // 调用 getLocation 方法解析地址
        // geocoder.getLocation({ address: this.ruleForm.hdAddress })
        //   .then(async(result) => {
        //     if (result.status === 0 && result.message === "Success") {
        //       // 解析成功，更新经纬度数据
        //       this.ruleForm.hdLat = result.result.location.lat;
        //       this.ruleForm.hdLng = result.result.location.lng;
              
        //       // 这里提交数据
        //     } else {
        //       // 解析失败或地址不完整等错误处理
        //       this.editloadingflag = false
        //       this.$message.error('地址解析失败，请重新输入地址');  
        //     }  
        //   })
        //   .catch((error) => {  
        //     // 网络错误或其他异常处理  
        //     this.editloadingflag = false
        //     this.$message.error(error.message);
        //   });
      }, 
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.editloadingflag = true
            this.getLatLng()
            // this.editloadingflag = false
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
  