<template>
  <div class="details-container">
    <el-drawer :visible.sync="drawerVisible" :with-header="false" size="50%">
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
          <div class="starXin" v-for="(item,index) in list" :key='index'>
            <div @click="star(index)"><img :src="xing>index?stara:starb"/></div>
          </div>
          <div class="commentContent">东西收到，很满意！真的是超级好的卖家，解答疑问不厌其烦，细致认真，
            关键是东西好，而且货物发得超快，包装仔细，值得信赖！</div>
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
      drawerVisible: fals,
      list:[0,1,2,3,4],
      stara:'../../../../static/tabbar/mine/star_a.png',//亮星星
      starb:'../../../../static/tabbar/mine/star_b.png',//暗星星
      xing:0
    };
  },
  methods: {
    showCommentDetail() {
      this.drawerVisible = true;
    },
    star(val){
      this.xing = val+1
      console.log("点击了"+(val+1)+"颗星")
      }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .name .el-button {
  color: #2060e3;
}

.star{
    width: 90%;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
     span{
      width: 21%;
      height: auto;
      font-size:15px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
     }
     .starXin{
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      line-height: 20px;
      div{
        margin-left:15px;
      }
     }
}
</style>
