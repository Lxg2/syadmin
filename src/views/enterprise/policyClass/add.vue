<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="150px">
      <el-form-item label="服务名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入服务名称"></el-input>
      </el-form-item>
      <el-form-item label="标签展示">
        <el-tag
          :key="tag"
          v-for="tag in ruleForm.tags"
          closable
          :disable-transitions="false"
          @close="(tag)=>{
            ruleForm.tags.splice(ruleForm.tags.indexOf(tag), 1);
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
      <!-- <el-form-item label="所属企业" prop="categoryid">
        <el-select style="width: 100%;" v-model="ruleForm.categoryid" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.Categorytitle"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="服务简介" prop="remarks">
        <!-- <Tinymce ref="editor" v-model="ruleForm.content" :height="300">
        </Tinymce> -->
        <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item label="服务类型" prop="categoryid">
        <el-select style="width: 100%;" v-model="ruleForm.categoryid" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.Categorytitle"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务详情描述" prop="content">
        <Tinymce ref="editor" v-model="ruleForm.content" :height="250">
        </Tinymce>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="ruleForm.communityusername" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="ruleForm.communityusermobile" placeholder="请输入电话"></el-input>
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
      <el-form-item label="封面" prop="imgurl">
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
      // options:[],
      options2:[
        // {
        //   id:0,
        //   Categorytitle:'科技社会法律服务'
        // },
        // {
        //   id:1,
        //   Categorytitle:'维修、养护、保养服务'
        // },
        // {
        //   id:2,
        //   Categorytitle:'人才、培训服务'
        // },
        // {
        //   id:3,
        //   Categorytitle:'集成电路测试服务'
        // },
        // {
        //   id:4,
        //   Categorytitle:'其他服务'
        // },
      ],
      fileList: [],
      upheaders:{},
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      loading: false,
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        remarks:'',
        tags:[],
        title:'',
        content:'',
        hotstr:[],
        sortid:'',
        imgurl:'',
        communityusermobile:'',
        communityusername:'',
        isshow:true,
        categoryid:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          categoryid: [
            { required: true, message: '请选择分类', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写内容', trigger: 'change' }
          ],
          imgurl: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
      },
    };
  },
  created() {
    this.getclasstypelist()
  },
  mounted() {
    this.upheaders = {'Authorization':getToken()}
    this.getclasslist()
  },
  methods: {
    async getclasstypelist() {
      let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
      this.options2 = res.datalist
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
    // 提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          let {isshow,hotstr,tags} = this.ruleForm
          tags = tags.join(',')
          let res = await allAddreq({...this.ruleForm,tags,isshow:+isshow,hotstr:hotstr.join(','),channelname:this.$route.meta.channelname})
          if(res.status === 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }
          this.loading = false
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
