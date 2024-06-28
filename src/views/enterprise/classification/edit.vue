<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="200px">
      <el-form-item label="岗位" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入招聘岗位"></el-input>
      </el-form-item>
      <el-form-item label="招聘人数">
        <el-input type="number" v-model="ruleForm.jobpersoncount" placeholder="请输入招聘人数"></el-input>
      </el-form-item>
      <el-form-item label="企业">
        <el-input v-model="ruleForm.companyname" placeholder="请输入企业"></el-input>
      </el-form-item>
      <el-form-item label="职务福利">
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
      <!-- <el-form-item label="发布单位" prop="categoryid">
        <el-select style="width: 100%;" v-model="ruleForm.categoryid" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.Categorytitle"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="招聘简介" prop="content">
        <Tinymce ref="editor" v-if="editflag" v-model="ruleForm.content" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="ruleForm.hdAddress" placeholder="请输入地区"></el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-select style="width: 100%;" v-model="ruleForm.educational" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options2"
            :key="item.Categorytitle"
            :label="item.Categorytitle"
            :value="item.Categorytitle">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经验要求">
        <el-select style="width: 100%;" v-model="ruleForm.workexperience" clearable placeholder="请选择经验">
          <el-option
            v-for="item in options3"
            :key="item.Categorytitle"
            :label="item.Categorytitle"
            :value="item.Categorytitle">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="工作年限(单位：年)">
       <div>
        <el-slider
          v-model="ruleForm.salary2"
          range
          show-stops
          :max="20">
        </el-slider>
        <span style="font-size: 18px;">
          {{ ruleForm.salary2.join('-') }}年&nbsp;<span style="color: red;font-size: 14px;">(注:默认为不限)</span>
        </span>
       </div>
      </el-form-item> -->
      <el-form-item label="薪资(单位：K/月)">

        <el-select style="width: 100%;" v-model="ruleForm.salary" clearable placeholder="请选择薪资">
          <el-option
            v-for="item in options4"
            :key="item.Categorytitle"
            :label="item.Categorytitle"
            :value="item.Categorytitle">
          </el-option>
        </el-select>
        <!-- <el-input type="number" v-model="ruleForm.salary" placeholder="请输入薪资"></el-input> -->
       <!-- <div>
        <el-slider
          v-model="salary"
          range
          show-stops
          >
        </el-slider>
       
       </div> -->
       <!-- <span style="font-size: 18px;">
        <span style="color: red;font-size: 14px;">(注:默认不填为面议)</span>
        </span> -->
      </el-form-item>
      <!-- <el-form-item label="薪资范围(单位：K/月)">
       <div>
        <el-slider
          v-model="salary"
          range
          show-stops
          >
        </el-slider>
        <span style="font-size: 18px;">
          {{ salary.join('-') }}k&nbsp;<span style="color: red;font-size: 14px;">(注:默认为面议)</span>
        </span>
       </div>
      </el-form-item> -->
      <el-form-item label="联系方式">
        <el-input v-model="ruleForm.tellphone" placeholder="请输入联系方式"></el-input>
      </el-form-item>
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
      <!-- <el-form-item label="资讯封面" prop="imgurl">
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
      </el-form-item> -->
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button v-loading="submitLoading" type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {allAddreq,GetArtcileInfo,UpdateArticle} from '@/api/user'
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
      submitLoading:false,
      editflag:false,
      options4:[
        {
          Categorytitle:'面议'
        },
        {
          Categorytitle:'1-3k'
        },
        {
          Categorytitle:'3-5k'
        },
        {
          Categorytitle:'5-8k'
        },
        {
          Categorytitle:'8-12k'
        },
        {
          Categorytitle:'12-16k'
        },
        {
          Categorytitle:'16-25k'
        },
        {
          Categorytitle:'25-50k'
        },
        {
          Categorytitle:'50k以上'
        },
      ],
      options3:[{
        id:1,
        Categorytitle:'不限'
      },
      {
        id:7,
        Categorytitle:'应届毕业生'
      },
      {
        id:2,
        Categorytitle:'1年以下'
      },
      {
        id:3,
        Categorytitle:'1-3年'
      },
      {
        id:4,
        Categorytitle:'3-5年'
      },
      {
        id:5,
        Categorytitle:'5-10年'
      },
      {
        id:6,
        Categorytitle:'10年以上'
      }],
      options2:[
      {
          id:1,
          Categorytitle:'不限'
        },
        {
          id:7,
          Categorytitle:'初中及以下'
        },
        {
          id:8,
          Categorytitle:'中专/中技'
        },
        {
          id:2,
          Categorytitle:'高中'
        },
        {
          id:4,
          Categorytitle:'大专'
        },
        {
          id:5,
          Categorytitle:'本科'
        },
        {
          id:6,
          Categorytitle:'硕士'
        },
        {
          id:7,
          Categorytitle:'博士'
        },
        
      ],
      fileList: [],
      upheaders:{},
      imgdialogVisible:false,
      inputVisible: false,
      inputValue: '',
      validateImg,
      dialogImageUrl:'',
      salary: [0,0],
      editflag:false,
      ruleForm: {
        title:'',
        tags:[],
        salary:'',
        jobpersoncount:'',
        companyname:'',
        content:'',
        hdAddress:'',
        workexperience:'',
        educational:'',
        tellphone:'',
        hotstr:[],
        sortid:'',
        isshow:true,
        // categoryid:''
      },
      rules: {
        title: [
            { required: true, message: '请输入岗位', trigger: 'blur' },
          ],
          categoryid: [
            { required: true, message: '请选择企业', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写内容', trigger: 'change' }
          ],
          // imgurl: [
          //   { required: true, trigger: 'change', validator: validateImg, }
          // ],
      },
    };
  },
  created(){
    // this.getclasstypelist()
    this.getinfofn()
  },
  mounted() {
    this.upheaders = {'Authorization':getToken()}
    // this.getclasslist()
  },
  methods: {
    // async getclasstypelist() {
    //   let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
    //   this.options2 = res.datalist
    // },
    async getinfofn(){
      let {datalist:{
        Title:title,
        Tags:tags,
        Content:content,
        Jobpersoncount:jobpersoncount,
        Companyname:companyname,
        Hotstr:hotstr,
        Sortid:sortid,
        Isshow:isshow,
        HdAddress:hdAddress,
        Workexperience:workexperience,
        Educational:educational,
        Tellphone:tellphone,
        Salary:salary,
        // Salarybegin:salarybegin,
        // Salaryend:salaryend,
      }} = await GetArtcileInfo({id:this.$route.query.id})
      this.ruleForm.title = title
      if(tags){
        this.ruleForm.tags = tags.split(',')
      }
      this.ruleForm.tellphone = tellphone
      this.ruleForm.companyname = companyname
      this.ruleForm.jobpersoncount = jobpersoncount
      this.ruleForm.hdAddress = hdAddress
      this.ruleForm.educational = educational
      this.ruleForm.workexperience = workexperience
      this.editflag = true
      this.ruleForm.salary = salary
      // this.salary = [salarybegin,salaryend]
      this.ruleForm.hotstr = hotstr.split(',')
      this.ruleForm.sortid = sortid
      this.$nextTick(()=>{
        this.ruleForm.content = content
      })
      this.ruleForm.isshow = isshow?true:false
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
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
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
            let {isshow,hotstr,tags} = this.ruleForm
          hotstr = hotstr.join(',')
          tags = tags.join(',')
          let res = await UpdateArticle({...this.ruleForm,hotstr,tags,isshow:+isshow,channelname:this.$route.meta.channelname,id:this.$route.query.id})
          if(res.status === 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }else{
            this.$message.error(res.msg)
          }
            this.submitLoading = false
            // 这里提交数据
          } else {
            // 解析失败或地址不完整等错误处理
            this.submitLoading = false
            this.$message.error('地址解析失败，请重新输入地址');  
          }  
        })
        .catch((error) => {  
          // 网络错误或其他异常处理  
          this.submitLoading = false
          this.$message.error('地址解析错误，请检查后再试');
        });  
    },  
    // 提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.submitLoading = true
          this.getLatLng()
          // this.submitLoading = false
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
  padding: 3.038% 20px 1%;
  box-sizing: border-box;
}
</style>
