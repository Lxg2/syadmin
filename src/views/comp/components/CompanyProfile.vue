<template>
  <div style="width: 100%;height: 100%;" class="column">
  <div class="right-card" ref="rightCard">
    <Tinymce style="margin-right: 3px; height: 100%;" :height="'300px'" ref="editor" v-model="content"  />
  </div>
  <div class="confirm_btn">
    <el-button type="primary" class="but-b" @click="submitForm()">保存</el-button>
  </div>
</div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  components: {
    Tinymce,
  },
  // mounted(){
  //   this.$nextTick(() => {
  //    this.TinymceHeight = this.$refs.rightCard.getBoundingClientRect().height-220;
  //   });
  // },
  data() {
    return {
      content: "",
      TinymceHeight:260
    };
  },
  methods: {
    submitForm() {},
  },
};
</script>

<style lang="scss" scoped>
.right-card {
  padding: 30px 35px 0px 35px;
  margin-right: 24px 20px 0 0;
  background: #fcfcfc;
  // overflow-y: scroll;
  overflow-x: hidden;
}
.confirm_btn{
  text-align: left;
  margin-top: 30px;
  margin-left: 60px;
}
</style>
