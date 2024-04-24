<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    :list-type="listType"
    :show-file-list="showFileList"
  >
    <i class="el-icon-picture"></i><span class="pic">点击上传图片</span>
    <div slot="tip" class="el-upload__tip">
      <slot />
    </div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    showFileList: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String,
      default: "picture-card",
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-upload--picture-card {
    background: #fafafa;
    border-radius: 12px;
    border: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    line-height: unset;
    font-size: 14px;
    color: #999999;
    .el-icon-picture {
      font-size: 64px;
      color: #e9e9e9;
      margin-bottom: 15px;
    }
  }
  .el-upload__tip {
    font-size: 14px;
    color: #999999;
    margin: 0;
  }
}
</style>
