<template>
  <div class="about-right" ref="textCard">
    <el-input
      placeholder="请输入内容"
      type="textarea"
      v-model="value"
      :style="{'--size':Height}"
    ></el-input>
    <el-button type="primary" class="but-a">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Height:'300px',
      value:
        "互联网技术研发；计算机软硬件开发、计算机信息技术咨询服务；从事广告业务；企业管理咨询；工商登记代理服务。软件开发。(除依法须经批准项目外，凭营业执照依法自主开展经营活动）；法律咨询（不含依法须律师事务所执业许可的业务）。除依法须经批准的项目外，凭营业执照依法自主开展经营活动，许可经营项目是：增值电信业务经营。",
    };
  },
  mounted(){
    this.$nextTick(() => {
     this.Height = this.$refs.textCard.getBoundingClientRect().height-160+'px';
    });
  },
};
</script>

<style lang="scss" scoped>
.about-right {
  flex: 1;
  padding: 40px 35px 0;
  ::v-deep .el-textarea__inner {
    width: 100%;
    height: var(--size);
    max-height: 400px;
    background: #ffffff;
    border: 1px solid #dddddd;
    padding: 35px;
    font-size: 16px;
    line-height: 32px;
    border-radius: 0;
    margin-bottom: 60px;
  }
  .but-a {
    margin-left: 20px;
  }
}
</style>
