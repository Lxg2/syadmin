<template>
  <div class="details-container">
    <el-drawer :visible.sync="drawerVisible" :with-header="false" size="50%">
      <div class="top flex mb20">
        <el-image
          style="width: 140px; height: 95px; margin-right: 15px"
          src="@/assets/test.jpg"
        ></el-image>
        <div class="top-right column" style="justify-content: space-between">
          <div class="title">h5页面是什么？浅析H5页面设计思路与方法→买购网</div>
          <div class="time">2023.03.29 15:09:10</div>
        </div>
      </div>
      <h3 class="mb20">评论 208</h3>
      <div class="down flex">
        <el-avatar
          class="user"
          :size="44"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <div class="down-right">
          <div class="commenter column-between">
            <div class="name flex">
              <span class="flex1">热爱生活</span>
              <el-button type="text" size="mini" icon="el-icon-delete">
                删除</el-button
              >
            </div>
            <div class="time">2 小时前</div>
          </div>
          <div class="commentContent">大模型的权重可达100+GB</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "CommentDetails",
  data() {
    return {
      drawerVisible: false,
    };
  },
  methods: {
    showCommentDetail() {
      this.drawerVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .name .el-button {
  color: #2060e3;
}
</style>
