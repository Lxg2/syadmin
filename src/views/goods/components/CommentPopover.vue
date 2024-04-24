<template>
  <div class="details-container">
    <el-drawer :visible.sync="drawerVisible" :with-header="false" size="53%">
      <h3 class="mb20">评价详情</h3>

      <div class="top flex mb20">
        <el-image
          style="width: 140px; height: 95px; margin-right: 15px"
          src="@/assets/test.jpg"
        ></el-image>
        <div class="top-right column" style="justify-content: space-between">
          <div class="title">无敌可爱的MINI充电手持 小风扇，夏天必备</div>
          <div class="price">¥396.00</div>
        </div>
      </div>
      <div class="down flex">
        <el-avatar
          class="user"
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <div class="down-right">
          <div class="commenter row-between">
            <span class="flex1">热爱生活</span>
            <div class="time">2 小时前</div>
          </div>
          <el-rate v-model="star" show-text style="line-height: 52px"></el-rate>

          <div class="commentContent">
            东西收到，很满意！真的是超级好的卖家，解答疑问不厌其烦，细致认真，
            关键是东西好，而且货物发得超快，包装仔细，值得信赖！
          </div>

          <el-image src="@/assets/test.jpg"></el-image>
          <el-image src="@/assets/test.jpg"></el-image>
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
      star: 3,
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
::v-deep .el-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-right: 15px;
}
</style>
