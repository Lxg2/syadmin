<template>
  <div class="add-container  right-card">
    <Tinymce ref="editor" v-model="content" :height="481">
        <!-- <el-input v-model="caption" placeholder="请输入标题"></el-input>
        <el-divider></el-divider>
        <el-input v-model="matter" placeholder="请输入内容"></el-input>
        <el-divider></el-divider> -->
    </Tinymce>
    <div class="but-b">
        <el-button type="primary" @click="submitForm()">发布</el-button>
        <el-button @click="submitForm()">存草稿</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      content: '',
      caption: '',
      matter: ''
    };
  },
  methods: {
    submitForm() {},
  },
};
</script>

<style lang="scss" scoped>
.right-card {
  flex: 1;
  height: calc(100% - 20px);
  padding: 31px 36px 49px;
  margin-right: 24px 20px 0 0;
  background: #fcfcfc;
  overflow-y: scroll;
  .but-b {
    text-align: center;
    padding: 36px 520px;
  }
}
</style>
