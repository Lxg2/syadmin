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
          :headers="upheaders"
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
          <el-button v-loading="loading" type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {allAddreq} from '@/api/user'
import { getToken } from '@/utils/auth'
import {GetSelectCategory,GetArtcileList} from '@/api/user'

export default {
  components: {
    ImageUpload,
    Tinymce
  },
  data() {
    // 图片验证规则
    var validateImg = (rule, value, callback) => {
      console.log(value);
        if (value === '' || value === undefined) {
          callback(new Error('请上传封面'));
        } else {
          callback();
        }
      };
    return {
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
      fileList: [],
      upheaders:{},
      loading: false,
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        // dynamicTags:[],
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
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          categoryid: [
            { required: true, message: '请选择分类', trigger: 'blur' },
          ],
          supplytype: [
            { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          remarks: [
            { required: true, message: '请填写内容', trigger: 'change' }
          ],
          filelist: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
      },
    };
  },
  mounted() {
    this.upheaders = {'Authorization':getToken()}
    this.getclasslist()
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
    async getclasslist() {
      let res = await GetArtcileList({channelname:'qiye',...{page: 1,pageSize: 10,keywords:'',}})
      this.options = res.datalist.datalist
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';  
      const isPNG = file.type === 'image/png';  
      const isLt10M = file.size / 1024 / 1024 < 20;
      if (!isJPG && !isPNG) {  
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 20MB!');
      }  
      return isJPG || isPNG && isLt10M;
    },  
    handleSuccess(response, file) {
      // 多张
      this.ruleForm.filelist.push({filepath:response.filepath,uid:file.uid});
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
    // 提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true;
          let {isshow,hotstr,filelist} = this.ruleForm
          filelist = filelist.map(item => item.filepath).join(',')
          let res = await allAddreq({...this.ruleForm,filelist,isshow:+isshow,hotstr:hotstr.join(','),channelname:this.$route.meta.channelname})
          if(res.status === 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }
          this.loading = false;
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
