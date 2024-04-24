<template>
  <div class="pub-container">
    <div class="head">
      <el-button
        class="filter-item mb24 el-icon-plus"
        style="width: 144px"
        size="small"
      >
        上传资料</el-button
      >
      <span
        class="ml20"
        style="font-weight: 400; color: #999999; line-height: 54px"
        >支持批量上传</span
      >
    </div>

    <div class="main">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <div class="btn-box row-center">
      <el-button class="filter-item mr24">取消</el-button>
      <el-button class="filter-item" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.pub-container {
  padding: 40px 40px 90px;
  background: #ffffff;
  font-family: Microsoft YaHei;

  .btn-box {
    margin-top: 54px;
    .el-button {
      width: 240px;
      height: 48px;
    }
  }
}

::v-deep .upload-demo {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 32.96%;
  .el-upload {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

::v-deep .el-upload-dragger {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>