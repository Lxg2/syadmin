<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <!-- <el-form-item label="分类名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入分类名称"></el-input>
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
          callback(new Error('请上传宣传视频'));
        } else {
          callback();
        }
      };
    return {
      options:[],
      changetagtext:'',
      tagindex:1,
      tagindex2:2,
      fileList: [],
      upheaders:{},
      imgdialogVisible:false,
      changedialogVisible:false,
      validateImg,
      validatePhone,
      dialogImageUrl:'',
      tagarr:[{
        title:'综合排序',
        id:1,
        inputVisible: false,
        changeinput:false,
        inputValue: '',
        ref:'saveTagInput1',
        items:[]
      },{
        title:'服务',
        id:2,
        inputVisible: false,
        changeinput:false,
        inputValue: '',
        ref:'saveTagInput2',
        items:[]
      }],
      ruleForm: {
        dynamicTags:[],
        title:'',
        content:'',
        communityusermobile:'',
        imgurl:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入政策标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写政策内容', trigger: 'change' }
          ],
          imgurl: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
          communityusermobile: [
            { required: true, trigger: 'blur', validator: validatePhone, }
          ],
      },
    };
  },
  mounted() {
    this.upheaders = {'Authorization':getToken()}
    this.getclasslist()
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
    handleSuccess(response, file, fileList) {
      this.ruleForm.imgurl = response.filepath;
      // 可以在这里处理上传成功后的逻辑，比如更新UI或存储文件信息等  
    },  
    // 文件上传失败时的钩子  
    handleError(error, file, fileList) {
      this.$message.error('视频上传失败，请重试！'+error.msg);  
      // 可以在这里处理上传失败后的逻辑，比如重试上传或显示更详细的错误信息  
    },
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
    async getclasslist(index) {
      let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
      this.options = res.datalist
    },
    // 提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let res = await allAddreq({...this.ruleForm,channelname:this.$route.meta.channelname})
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
<style>
.my-changetag .el-dialog__footer{
  padding: 20px !important;
}
.input-new-tag{
  width: auto;
  min-width: 90px;
}
</style>
