<template>
  <div class="container-box">
    <!-- 政策模块 -->
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="100px">
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入活动标题"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" prop="content">
        <Tinymce v-if="editflag" ref="editor" v-model="ruleForm.content" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item label="发布单位">
        <el-input v-model="ruleForm.author" placeholder="请输入发布单位"></el-input>
      </el-form-item>
      <el-form-item label="活动地点" prop="hdAddress">
        <el-input v-model="ruleForm.hdAddress" placeholder="请输入活动地点"></el-input>
      </el-form-item>
      <el-form-item label="活动人数">
        <el-input v-model="ruleForm.limitusercount" placeholder="默认为不限"></el-input>
      </el-form-item>
      <el-form-item label="置顶/热门">
        <div style="margin-left: 10px;">
          <el-checkbox-group v-model="ruleForm.hotstr">
            <el-checkbox label="置顶" :value="1"></el-checkbox>
            <el-checkbox label="热门" :value="2"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="活动开始时间" prop="begintime">
        <el-date-picker
        style="width: 100%;"
        v-model="ruleForm.begintime"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        placeholder="选择日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryid">
        <el-select v-model="ruleForm.categoryid" clearable placeholder="请选择分类" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.Categorytitle"
            :value="item.id">
          </el-option>
        </el-select>
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
      <el-form-item label="活动封面" prop="imgurl">
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
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button v-loading="btnloading" type="primary" @click="submitForm('myform')">发布</el-button>
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
      btnloading:false,
      form:{},
      fileList:[],
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      editflag:false,
      containertext:'',
      ruleForm: {
        title:'',
        content:'',
        hdAddress:'',
        hotstr:[],
        categoryid:'',
        sortid:'',
        isshow:true,
        author:'',
        imgurl:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入政策标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写政策内容', trigger: 'change' }
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
      let {Author:author,HdAddress:hdAddress,Limitusercount:limitusercount,Begintime:begintime,Title:title,Content:content,Hotstr:hotstr,Categoryid:categoryid,Sortid:sortid,Imgurl:imgurl,Isshow:isshow} = res.datalist
      this.ruleForm.title = title
      this.editflag = true
      this.ruleForm.author = author
      this.ruleForm.limitusercount = limitusercount
      this.ruleForm.begintime  = begintime
      this.ruleForm.hotstr = hotstr.split(',')
      this.ruleForm.categoryid = categoryid
      this.ruleForm.sortid = sortid
      this.ruleForm.hdAddress = hdAddress
      this.ruleForm.isshow = isshow? true : false
      this.ruleForm.imgurl = imgurl
      this.fileList = [{url:imgurl}]
       this.$nextTick(()=>{
        this.ruleForm.content = content
        console.log(this.$refs.editor);
      // 获取富文本内容
      })
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
            let {hotstr,isshow} = this.ruleForm
            this.ruleForm.hotstr = hotstr.join(',')
            let res = await UpdateArticle({...this.ruleForm,id:this.$route.query.id,channelname:this.$route.meta.channelname,isshow:+isshow})
            if(res.status == 200){
              this.$message.success(res.msg)
              this.$router.go(-1)
            }else{
              this.$message.error(res.msg)
            }
            this.btnloading = false
            // 这里提交数据
          } else {
            // 解析失败或地址不完整等错误处理
            this.btnloading = false
            this.$message.error('地址解析失败，请重新输入地址');  
          }  
        })
        .catch((error) => {  
          // 网络错误或其他异常处理  
          this.btnloading = false
          this.$message.error('地址解析错误，请检查后再试');
        });  
    },  
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.btnloading = true
          this.getLatLng()
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
