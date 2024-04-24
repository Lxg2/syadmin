<template>
  <div class="add-container">
    <div class="title mb40">基础信息</div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px"
     class="demo-ruleForm" label-position="left">
      <el-form-item label="标题" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入内容标题"></el-input>
      </el-form-item>

      <el-form-item label="内容摘要" prop="digest">
        <el-input type="textarea" v-model="ruleForm.digest" placeholder="请输入内容摘要"
            maxlength="200" rows="3" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="上传视频" prop="digest">
        <el-upload
          class="avatar-uploader el-upload--text"
          action=""
          :show-file-list="false"
          :before-upload="beforeUploadVideo"
          :on-progress="uploadVideoProcess"
          style="border:1px solid #DCDFE6; border-radius: 4px; padding: 10px;"
          >
          <video v-if="videoSrc !='' && progressFlag == false " :src="videoSrc" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
          <i v-else-if="videoSrc == '' && progressFlag == false " class="el-icon-plus avatar-uploader-icon" ></i>
          <el-progress v-if="progressFlag == true" type="circle" :percentage="loadProgress" style="margin-top: 30px;" />
          <div slot="tip" class="el-upload__tip" style="color: #999999;" >视频最大不得超过1G,视频格式推荐mp4</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="内容详情" prop="content">
        <Tinymce ref="editor" :height="720" />
      </el-form-item>

      <el-form-item label="选择类别" prop="region" class="mt30">
        <el-select v-model="ruleForm.region" placeholder="请选择类别">
          <el-option label="类别一" value="1"></el-option>
          <el-option label="类别二" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="排序数字" prop="num">
        <el-input v-model="ruleForm.num" placeholder="请输入排序数字"></el-input>
      </el-form-item>

      <el-form-item label="浏览次数" prop="look">
        <el-input v-model="ruleForm.look"></el-input>
      </el-form-item>

      <el-form-item label="封面" prop="look">
        <div class="row-start">
          <image-upload />
          <span class="ml30" style="font-size: 14px;font-weight: 400;color: #999999;">最好上传3:2的图片,格式仅限JPG,PNG,JPEG,图片小于1M</span>
        </div>
      </el-form-item>

      <div class="title mb32" style="margin-top: 76px;">其他信息</div>

      <el-form-item label="外部链接" prop="look">
        <el-input v-model="ruleForm.look" placeholder="非必填"></el-input>
      </el-form-item>

      <el-form-item label="定时发布" required>
        <el-col :span="11" class="mr20">
          <el-form-item prop="timing1">
            <el-date-picker type="date" placeholder="请选择定时发布日期" v-model="ruleForm.timing1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="timing2">
            <el-time-picker placeholder="请选择定时发布时间" v-model="ruleForm.timing2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="允许评论" prop="critic">
        <el-switch v-model="ruleForm.critic"></el-switch>
      </el-form-item>
      
      <el-form-item style="margin-top: 160px;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button>存草稿</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import ImageUpload from "@/components/Upload/ImageUpload";

export default {
     components: { Tinymce, ImageUpload },
    data() {
      return {
        ruleForm: {
          name: '',
          digest: '',
          content: '',
          region: '',
          num: '',
          look: '',
          timing1: '',
          timing2: '',
          critic: '',
          resource: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入内容摘要', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          timing1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          timing2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          
        },
        progressFlag: false, //关闭进度条
        loadProgress: 0, //进度条初始化
        videoSrc: ''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //进度条
      uploadVideoProcess(event, file, fileList) {
        this.loadProgress = Math.floor(event.percent)
        if (this.loadProgress >= 100 ){
          this.loadProgress = 100
          // setTimeout(() => { this.progressFlag = false }, 1000) //一秒后关闭进度条
        }
      },
      //文件上传之前的处理
      beforeUploadVideo(file) {
        const isLt10M = file.size /1024 / 1024 < 10
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1){
          this.$message.error('请上传正确的视频格式')
          return false
        }
        if (!isLt10M) {
        this.$message.error('上传视频大小不能超过10MB哦!')
        return false
        }
        // 获取视频时长
        let url = URL.createObjectURL(file)
        let audioElement = new Audio(url)
        let duration
        audioElement.addEventListener('loadedmetadata', function(_event) {
          duration = audioElement.duration //时长为秒，小数
          this.$parent.$data.wDuration = parseInt(duration)
          console.log(duration)
        })
        new Promise(function(resolve, reject) {
          const _URL = window.URL || window.webkitURL
          const videoElement = document.createElement('video')
          // 当指定视频数据已加载时 会发生loadedmetadata事件 源数据包括时长 尺寸以及文本轨道
          videoElement.addEventListener('loadedmetadata', function(_event) {
            const duration = videoElement.duration // 视频时长
            const vaild = Math.floor(duration) <= 4
            vaild ? resolve() : reject()
          })
        videoElement.src = _URL.createObjectURL(file)
        }).then(() => {
          this.uploadImg(file) //调用上传接口
        },() => {
          this.$message.error('上传的视频时长过大，请重新上传')
          return Promise.reject()
        })
      },
      //上传接口
      async uploadImg(file) {
        this.progressFlag = true //显示进度条
        const fd = new FormData()
        fd.append('file', file)
        uploadImg(fd).then(response => {
          this.videoSrc = response.result.url
          this.progressFlag = false
          this.$emit('setFileSrc', this.videoSrc)
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.add-container {
    padding: 40px 70px 100px 28px;
    background: #FFFFFF;
    font-family: Microsoft YaHei;

    .title {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }

    .avatar-uploader {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 1534px;
      height: 620px;
      line-height: 620px;
      text-align: center;
    }

    .avatar {
      width: 100%;
      height: 620px;
      display: block;
    }
}
::v-deep .el-form-item__label {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
}

::v-deep .el-switch.is-checked .el-switch__core {
  border-color: #1BD9A1;
  background: #1BD9A1;
}

::v-deep .el-select {
    width: 100%;
  }

::v-deep .el-col {
    width: 240px;
}

::v-deep .el-upload--picture-card {
    width: 300px;
    height: 200px;
    background: #FAFAFA;
}
</style>