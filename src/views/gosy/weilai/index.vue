<template>
  <div class="container-box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="战略目标" name="zlmb">
        <el-form class="my-form" :rules="rules" ref="zlmb" :model="ruleForm" label-width="130px">
      <el-form-item label="战略目标" prop="zlmb" :rules="[{ required: true, message: '请输入战略目标', trigger: 'blur' }]">
        <Tinymce ref="zlmbedit" v-model="ruleForm.zlmb" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="submitForm('zlmb')">保存</el-button>
        </div>
      </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="未来规划(工业上楼规划)" name="gysl">
        <el-form class="my-form" :rules="rules" ref="gysl" :model="ruleForm" label-width="130px">
      <el-form-item label="工业上楼规划" prop="gysl" :rules="[{ required: true, message: '请输入工业上楼规划', trigger: 'blur' }]">
        <Tinymce ref="gysledit" v-model="ruleForm.gysl" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="submitForm('gysl')">保存</el-button>
        </div>
      </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="未来规划(新型工业化)" name="xxgy">
        <el-form class="my-form" :rules="rules" ref="xxgy" :model="ruleForm" label-width="130px">
      <el-form-item label="新型工业化" prop="xxgy" :rules="[{ required: true, message: '请输入新型工业化', trigger: 'blur' }]">
        <Tinymce ref="xxgyedit" v-model="ruleForm.xxgy" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="submitForm('xxgy')">保存</el-button>
        </div>
      </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="未来规划(百旺空间规划)" name="bwkj">
        <el-form class="my-form" :rules="rules" ref="bwkj" :model="ruleForm" label-width="130px">
      <el-form-item label="百旺空间规划" prop="bwkj" :rules="[{ required: true, message: '请输入百旺空间规划', trigger: 'blur' }]">
        <Tinymce ref="bwkjedit" v-model="ruleForm.bwkj" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="submitForm('bwkj')">保存</el-button>
        </div>
      </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {GetSelectCategory,UpdateContent,GetContentInfo,SubmitContent} from '@/api/user'
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
      form: {},
      fileList: [],
      imgdialogVisible: false,
      editflag: false,
      activeName: 'zlmb',
      validateImg,
      dialogImageUrl: '',
      zlmb: '',
      gysl: '',
      xxgy: '',
      bwkj: '',
      ruleForm: {
        zlmb: '',
        gysl: '',
        xxgy: '',
        bwkj: '',
      },
      // rules: {
      //   title: [
      //     { required: true, message: '请输入标题', trigger: 'blur' },
      //   ],
      //   content: [
      //     { required: true, message: '请填写内容', trigger: 'change' }
      //   ],
      //   categoryId: [
      //     { required: true, message: '请选择所属类别', trigger: 'change' }
      //   ],
      //   imgurl: [
      //     { required: true, trigger: 'change', validator: validateImg, }
      //   ],
      // },
      options: [
      ],
      tabsobj:{
        zlmb:'81726738276152374653',//战略目标
        gysl:'09129381765421726374',//工业上楼规划
        xxgy:'12381736473777322266',//工业上楼规划
        bwkj:'99132627372364374384'//百旺空间规划
      }
    }
  },
  created() {
    // 获取分类无分页
    // this.getselectlist()
    this.getdetailinfo(this.tabsobj[this.activeName])
  },
  mounted() {
    // 获取文章详情
    // GetArtcileInfo({id:this.$route.query.id}).then(res=>{
    //   let {Content:content} = res.datalist
    //   this.ruleForm.content = content
    //    this.$nextTick(()=>{
    //   // 获取富文本内容
    //     this.$refs.editor.setContent(content)
    //   })
    // })
  },
  watch:{
    activeName(val){
      this.getdetailinfo(this.tabsobj[val])
    }
  },
  methods: {
    async getdetailinfo(id) {
      this[this.activeName] = ''
      let res = await GetContentInfo({ typename: id })
      if (res.status === 200) {
        let {Content} = res.datalist
        this.ruleForm[this.activeName] = Content
        this[this.activeName] = Content
        this.$nextTick(() => {
          this.$refs[this.activeName +'edit'].setContent(Content)
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null
          if (this[this.activeName]) {
            res = await UpdateContent({ Content:this.ruleForm[this.activeName], typename: this.tabsobj[this.activeName] })
          } else {
            res = await SubmitContent({ Content:this.ruleForm[this.activeName], typename: this.tabsobj[this.activeName]  })
            this.containertext = this.ruleForm.content
            this[this.activeName] = this.ruleForm[this.activeName]
          }
          if (res.status == 200) {
            this.$message.success(res.msg)
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .my-form .el-form-item .el-form-item__label {
    font-size: 17px !important;
  }
  .el-tabs__item{
    font-size: 18px;
    font-weight: bold;
  }
}

.container-box {
  min-height: 100%;
  height: auto !important;
  padding: 3.038% 3.038% 1%;
  box-sizing: border-box;
}
</style>
