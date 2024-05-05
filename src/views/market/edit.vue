<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="供需标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入供需标题"></el-input>
      </el-form-item>
      <el-form-item label="供需类型" prop="supplytype">
        <el-select style="width: 100%;" v-model="ruleForm.supplytype" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.Categorytitle"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供需内容" prop="remarks">
        <!-- <Tinymce ref="editor" v-model="ruleForm.content" :height="300">
        </Tinymce> -->
        <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入供需信息"></el-input>
      </el-form-item>
      <!-- <el-form-item label="供应企业" v-if="ruleForm.supplytype === 0">
        <el-select style="width: 100%;" filterable v-model="ruleForm.categoryid" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.Title"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input v-model="ruleForm.communityusername " placeholder="请输入企业标题"></el-input>
      </el-form-item>
        <el-form-item label="联系人">
        <el-input v-model="ruleForm.communityusername " placeholder="请输入供需标题"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="ruleForm.communityusermobile" placeholder="请输入供需标题"></el-input>
        </el-form-item> -->
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
      <el-form-item label="供需图片" prop="filelist">
        <el-upload
          :action="$store.state.user.beseFile"
          list-type="picture-card"  
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
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
      options:[],
      options2:[
        {
          id: 0,
          Categorytitle: '供应'
        },
        {
          id: 1,
          Categorytitle: '需求'
        },
      ],
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      editflag:false,
      containertext:'',
      ruleForm: {
        communityusermobile:'',
        communityusername:'',
        title:'',
        remarks:'',
        hotstr:[],
        sortid:'',
        filelist:[],
        isshow:true,
        supplytype:'',
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
          filelist: [
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
      let {Title:title,
        Content:content,
        Hotstr:hotstr,
        Categoryid:categoryid,
        Sortid:sortid,
        Remarks:remarks,
        Fileslist:fileslist,
        Supplytype:supplytype,
        Isshow:isshow} = res.datalist
      this.ruleForm.title = title
      this.ruleForm.hotstr = hotstr.split(',')
      this.ruleForm.categoryid = categoryid
      this.editflag = true
      this.ruleForm.remarks = remarks
      this.ruleForm.sortid = sortid
      let arr = []
      fileslist.forEach(item=>arr.push({uid:Math.ceil(Math.random() * 10000000000000+Math.random(10)),url:item}))
      this.ruleForm.filelist = arr
      this.fileList = arr
      this.ruleForm.isshow = isshow? true : false
      this.ruleForm.supplytype = supplytype
       this.$nextTick(()=>{
        this.ruleForm.content = content
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
    handleSuccess(response, file) {
      // 多张
      this.ruleForm.filelist.push({url:response.filepath,uid:file.uid});
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
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let {hotstr,isshow,filelist} = this.ruleForm
          filelist = filelist.map(item => item.url).join(',')
          this.ruleForm.hotstr = hotstr.join(',')
          let res = await UpdateArticle({...this.ruleForm,filelist,id:this.$route.query.id,channelname:this.$route.meta.channelname,isshow:+isshow})
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
