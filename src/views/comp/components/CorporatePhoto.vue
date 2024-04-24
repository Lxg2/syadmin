<template>
  <div class="right-card flex1">
    <div class="photo-box wrap">
      <div class="photo-item" v-for="(item, index) in 10" :key="index">
        <img
          class="photo"
          src="https://t11.baidu.com/it/u=1464683011,2785164332&fm=58"
        />
        <i class="el-icon-error close pointer"></i>
      </div>
      <image-upload :showFileList="false" />
    </div>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
export default {
  components: {
    ImageUpload,
  },
};
</script>

<style lang="scss" scoped>
.photo-box {
  max-height: 100%;
  overflow-y: auto;
  .photo-item {
    width: 148px;
    height: 148px;
    border-radius: 12px;
    margin: 0 20px 20px 0;
    position: relative;
    .photo {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
    .close {
      font-size: 32px;
      position: absolute;
      top: 10px;
      right: 10px;
      color: #000;
      opacity: 0.5;
    }
  }
}
::v-deep {
  .el-upload--picture-card {
    margin-right: 20px;
  }
}
</style>
