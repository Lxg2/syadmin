<template>
  <div class="container-box">
    <!-- 政策模块 -->
    <el-form class="my-form" :rules="rules" ref="myform" :model="form" label-width="100px">
      <el-form-item label="政策标题" prop="zcTitle">
        <el-input v-model="form.zcTitle" placeholder="请输入政策标题"></el-input>
      </el-form-item>
      <el-form-item label="政策内容" prop="content">
        <Tinymce ref="editor" v-model="form.content" :height="300">
        </Tinymce>
      </el-form-item>
      <el-form-item label="发布时间" prop="zcTime">
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
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="form.categoryId" clearable placeholder="请选择分类" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序ID">
        <el-input v-model="form.zcId" placeholder="ID越小越靠前"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="imgUrl">
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
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      ruleForm: {
        zcTitle:'',
        content:'',
        zcTime:'',
        isTop:[],
        zcId:'',
        imgUrl:'',
        categoryId:''
      },
      rules: {
        zcTitle: [
            { required: true, message: '请输入政策标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写政策内容', trigger: 'change' }
          ],
          zcTime: [
            { type: 'date', required: true, message: '请选择发布日期', trigger: 'change' }
          ],
          categoryId: [
            {  required: true, message: '请选择所属类别', trigger: 'change' }
          ],
          imgUrl: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
      },
    options:[
      { value: 1, label: '分类1' },
      { value: 2, label: '分类2' },
      { value: 3, label: '分类3' },
    ]
    }
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
