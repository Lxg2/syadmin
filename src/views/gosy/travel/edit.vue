<template>
       <div class="container-box">
      <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="200px">
        <el-form-item label="封面" prop="filelist">
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
        <el-form-item label="景点名称" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入景点名称"></el-input>
        </el-form-item>
        <el-form-item label="景区描述" prop="remarks" :rules="[{ required: true, message: '请输入景点名称', trigger: 'blur' }]">
          <el-input type="textarea" v-model="ruleForm.remarks" placeholder="一句话描述景区"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" prop="worktime" :rules="[{ required: true, message: '请输入开放时间', trigger: 'blur' }]">
          <el-input v-model="ruleForm.worktime" placeholder="请输入开放时间"></el-input>
        </el-form-item>
        <el-form-item label="景区位置" prop="hdAddress" :rules="[{ required: true, message: '请输入景区位置', trigger: 'blur' }]">
          <el-input v-model="ruleForm.hdAddress" placeholder="请输入景区位置"></el-input>
        </el-form-item>
        <el-form-item label="景区简介" prop="content" :rules="[{ required: true, message: '请填写内容', trigger: 'change' }]">
          <Tinymce ref="editor" v-if="editflag" v-model="ruleForm.content" :height="250">
          </Tinymce>
        </el-form-item>
        <el-form-item label="置顶/热门">
          <div style="margin-left: 10px;">
            <el-checkbox-group v-model="ruleForm.hotstr">
              <el-checkbox label="置顶" :value="1"></el-checkbox>
              <el-checkbox label="热门" :value="2"></el-checkbox>
            </el-checkbox-group>
          </div>
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
        <el-form-item>
          <div class="but-b">
            <el-button @click="$router.go(-1)">取消</el-button>
            <el-button v-loading="editloadingflag" type="primary" @click="submitForm('myform')">发布</el-button>
           </div>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import ImageUpload from "@/components/Upload/ImageUpload.vue";
  import Tinymce from "@/components/Tinymce";
  import {GetArtcileInfo,GetSelectCategory,UpdateArticle,allAddreq} from '@/api/user'
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
          title:'',
          worktime:'',
          content:'',
          isshow:true,
          remarks:'',
          hotstr:[],
          sortid:'',
          filelist:[],
          hdAddress:'',
        },
        rules: {
          title: [
              { required: true, message: '请输入标题', trigger: 'blur' },
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
    created(){
      this.getclasslist()
         // 获取详情
         GetArtcileInfo({id:this.$route.query.id}).then(res=>{
          let {Title:title,Worktime:worktime,Content:content,Hotstr:hotstr,Sortid:sortid,Isshow:isshow,Remarks:remarks,Fileslist:filelist,HdAddress:hdAddress
          } = res.datalist
          this.ruleForm.title = title
          this.ruleForm.worktime = worktime
          let arr = []
          filelist.forEach(item=>arr.push({uid:Math.ceil(Math.random() * 100000+Math.random(10)),url:item}))
          this.ruleForm.filelist = arr
          this.fileList = arr
          this.ruleForm.hdAddress = hdAddress
          this.ruleForm.hotstr = hotstr.split(',')
          this.editflag = true
          this.ruleForm.sortid = sortid
          this.ruleForm.remarks = remarks
          this.ruleForm.isshow = isshow? true : false
          this.$nextTick(()=>{
            this.ruleForm.content = content
          })
        })
    },
    mounted(){
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
       getLatLng() {
        const geocoder = new TMap.service.Geocoder({
        });  
        // 调用 getLocation 方法解析地址
        geocoder.getLocation({ address: this.ruleForm.hdAddress })
          .then(async(result) => {
            if (result.status === 0 && result.message === "Success") {
              // 解析成功，更新经纬度数据
              this.ruleForm.hdLat = result.result.location.lat;
              this.ruleForm.hdLng = result.result.location.lng;
              let {hotstr,isshow,filelist} = this.ruleForm
                filelist = filelist.map(item => item.url).join(',')
                this.ruleForm.hotstr = hotstr.join(',')
                let res = await UpdateArticle({...this.ruleForm,filelist,id:this.$route.query.id,channelname:this.$route.meta.channelname,isshow:+isshow})
                if(res.status == 200){
                  this.$message.success(res.msg)
                  this.$router.go(-1)
                }
              this.editloadingflag = false
              // 这里提交数据
            } else {
              // 解析失败或地址不完整等错误处理
              this.editloadingflag = false
              this.$message.error('地址解析失败，请重新输入地址');  
            }  
          })
          .catch((error) => {  
            // 网络错误或其他异常处理  
            this.editloadingflag = false
            this.$message.error(error.message);
          });  
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
  