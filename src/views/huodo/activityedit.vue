<template>
  <div class="container-box">
    <!-- 政策模块 -->
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="130px">
      <el-form-item label="活动标题" prop="zcTitle">
        <el-input v-model="form.zcTitle" placeholder="请输入活动标题"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" prop="content">
        <Tinymce ref="editor" v-model="form.content" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item label="活动地点" prop="houdodidian">
        <el-input v-model="form.houdodidian" placeholder="请输入活动地点"></el-input>
      </el-form-item>
      <el-form-item label="报名人数">
        <el-input v-model="form.num" placeholder="默认为不限"></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间" prop="zcTime">
        <el-date-picker
        style="width: 100%;"
        v-model="form.zcTime"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="置顶/热门">
        <div style="margin-left: 10px;">
          <el-checkbox-group v-model="ruleForm.isTop">
            <el-checkbox label="置顶"></el-checkbox>
            <el-checkbox label="热门"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="排序ID">
        <el-input v-model="form.zcId" placeholder="ID越小越靠前"></el-input>
      </el-form-item>
      <el-form-item label="活动封面" prop="imgUrl">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          >
         <div style="display: flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
          <i style="font-size: 80px;" class="el-icon-picture-outline"></i>
          <i style="font-size: 14px;margin-top: 10px;" class="el-icon-plus">添加封面</i>
         </div>
        </el-upload>
        <el-dialog :visible.sync="imgdialogVisible">
          <img width="100%" :src="form.imgUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <div class="but-b">
          <el-button >取消</el-button>
          <el-button type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
export default {
  components: {
    ImageUpload,
    Tinymce
  },
  data() {
    // 图片验证规则
    var validateImg = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请上传活动封面'));
        } else {
          callback();
        }
      };
    return {
      form:{},
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      ruleForm: {
        zcTitle:'',
        houdodidian:'',
        content:'',
        zcTime:'',
        isTop:[],
        zcId:'',
        imgUrl:''
      },
      rules: {
        zcTitle: [
            { required: true, message: '请输入活动标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写活动内容', trigger: 'change' }
          ],
          houdodidian: [
            { required: true, message: '请输入活动地点', trigger: 'blur' },
          ],
          zcTime: [
            { type: 'date', required: true, message: '请选择活动开始时间', trigger: 'change' }
          ],
          imgUrl: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
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
