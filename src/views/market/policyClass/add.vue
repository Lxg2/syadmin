<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="分类标题" prop="categorytitle">
        <el-input v-model="ruleForm.categorytitle" placeholder="请输入分类标题"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序ID">
        <el-input v-model="ruleForm.sortid" placeholder="ID越小越靠前"></el-input>
      </el-form-item> -->
      <el-form-item :label="i.title" v-for="(i,index) in tagarr" :key="i.id">
              <el-tag
              :key="index2"
              class="mytag input-new-tag"
              v-for="(tag,index2) in i.items"
              closable
              :disable-transitions="false"
              @click.self.stop.prevent="tagclickfn(index,index2)"
              @close.stop.prevent="handleClose(tag,index2,index)">
              {{tag}}
            </el-tag>
          <el-input
            class="input-new-tag"
            v-if="i.inputVisible"
            v-model="i.inputValue"
            :ref="i.ref"
            size="small"
            @keyup.enter.native="handleInputConfirm(index)"
            @blur="handleInputConfirm(index)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(index,i.ref)" style="font-size: 13px !important;">+ 类型规格</el-button>
      </el-form-item>
      <!-- <el-form-item label="是否显示">
        <div style="margin-left: 10px;">
          <el-switch
            v-model="ruleForm.isshow"
            active-text="显示"
            inactive-text="隐藏">
          </el-switch>
        </div>
      </el-form-item> -->
      <!-- <el-form-item label="分类封面" prop="imgurl">
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
          <el-button type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
    <el-dialog
        title="修改规格"
        :visible.sync="changedialogVisible"
        width="30%"
        class="my-changetag"
        >
        <el-input v-model="changetagtext" placeholder="请输入分类名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button style="width: 100px;height: 40px !important;" @click="changedialogVisible = false">取 消</el-button>
          <el-button style="width: 100px;height: 40px !important;" type="primary" @click="confrimchangetagFn">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {allAddCategoryreq} from '@/api/user'
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
      changedialogVisible:false,
      tagarr:[{
        title:'服务',
        id:1,
        inputVisible: false,
        changeinput:false,
        inputValue: '',
        ref:'saveTagInput1',
        items:[]
      }],
      changetagtext:'',
      tagindex:1,
      tagindex2:2,
      fileList: [],
      upheaders:{},
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        categorytitle:'',
        dynamicTags:[],
        // sortid:'',
        // imgurl:'',
        // isshow:false,
      },
      rules: {
        categorytitle: [
            { required: true, message: '请输入分类标题', trigger: 'blur' },
          ],
          // imgurl: [
          //   { required: true, trigger: 'change', validator: validateImg, }
          // ],
      },
    };
  },
  mounted() {
    this.upheaders = {'Authorization':getToken()}
  },
  methods: {
      // 添加标签
      tagclickfn(index,index2){
      this.changedialogVisible = true
      this.tagindex = index
      this.tagindex2 = index2
     this.changetagtext = this.tagarr[index].items[index2]
    },
    confrimchangetagFn(){
      this.changedialogVisible = false
      this.$set(this.tagarr[this.tagindex].items,this.tagindex2,this.changetagtext)
    },
    // 添加标签
    handleInputConfirm(index){
      // this.$set(this.tagarr,index,this.tagarr[index].inputValue)
      let inputValue = this.tagarr[index].inputValue
        if (inputValue) {
          // 去重
          if(this.tagarr[index].items.length !== 0){
            !this.tagarr[index].items.includes(inputValue) && this.tagarr[index].items.push(inputValue);
          }else{
            this.tagarr[index].items.push(inputValue);
          }
        }
        this.tagarr[index].inputVisible = false;
        this.tagarr[index].inputValue = '';
    },
    handleClose(tag,index2,index){
      console.log(tag,index2,index2);
        this.tagarr[index].changeinput = false;
        this.tagarr[index].items.splice(index2, 1);
    },
    showInput(index,ref) {
      this.tagarr[index].inputVisible = true;
        this.$nextTick(_ => {
          this.$refs[ref][0].$refs.input.focus()
        });
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
          let res = await allAddCategoryreq({...this.ruleForm,channelname:this.$route.meta.channelname})
          if(res.status === 200){
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
