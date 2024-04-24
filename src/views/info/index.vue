<template>
  <div class="info-container">
    <div class="left-menu" style="border-right: 1px solid #eee;">
      <el-row class="tac">
      <el-col :span="12" style="width: 244px;">
        <el-menu default-active="2" :default-openeds="openeds" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title"><span>焦点资讯</span></template>
            <el-menu-item-group>
              <el-menu-item index="1-1">行情</el-menu-item>
              <el-menu-item index="1-2">财经</el-menu-item>
              <el-menu-item index="1-3">科技</el-menu-item>
              <el-menu-item index="1-4">政策</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-5">
              <template slot="title">政府政策</template>
              <el-menu-item index="1-5-1">教育政策</el-menu-item>
              <el-submenu index="1-5-2">
              <template slot="title">补贴政策</template>
              <el-menu-item index="1-5-2-1">创业补贴</el-menu-item>
            </el-submenu>
            </el-submenu>
            <el-menu-item index="1-6">
            <span slot="title">初创企业补贴</span>
          </el-menu-item>
          <el-menu-item index="1-7">
            <span slot="title">社会保险补贴</span>
          </el-menu-item>
          <el-menu-item index="1-8">
            <span slot="title">创业租金补贴</span>
          </el-menu-item>
          <el-menu-item index="1-9">
            <span slot="title">创业带动就业补贴</span>
          </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      </el-row>
    </div>
    <div class="app-container">
      <TabSearchBox :btnText="'新增'" :routerName="'rzadd'">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="1"></el-tab-pane>
        <el-tab-pane label="已发布" name="2"></el-tab-pane>
        <el-tab-pane label="未发布" name="3"></el-tab-pane>
      </el-tabs>
    </TabSearchBox>

    <div class="cell" v-for="item in list" :key="item.id">
      <el-image
        style="width: 140px; height: 95px; margin-right: 15px"
        :src="item.image_uri"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i></div
      ></el-image>
      <div class="content">
        <div class="top-content">
          <span class="title">{{ item.title }}</span>
          <span class="time">{{ item.display_time }}</span>
        </div>
        <div class="down-content">
          <div class="number">
            <span> <i class="el-icon-view"></i> {{ item.pageviews }} </span>
            <span> <i class="el-icon-chat-dot-square"></i> 7893 </span>
            <span> <i class="el-icon-position"></i> 8761 </span>
            <span> <i class="el-icon-price-tag"></i> 焦点资讯 </span>
          </div>
          <div class="operate">
            <el-button type="text" size="mini" @click="$router.push({name:'rzedit'})">编辑</el-button>
            <el-button type="text" size="mini">发布</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    <CommentDetails ref="comDetails" />
    </div>
    <!-- <el-dialog :visible.sync="tabGruop" width="40%" title="添加推荐类目">
    <el-form :model="gruopForm" ref="gruopForm" label-width="100px"  class="my-form demo-dynamic">
      <el-form-item
        prop="name"
        label="推荐类目"
        :rules="[
          { required: true, message: '请输入推荐类目', trigger: 'blur' },
        ]"
      >
        <el-input v-model="gruopForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <div style="text-align: right;">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="resetForm('dynamicValidateForm')">添加</el-button>
      </div>
      </el-form-item>
    </el-form>              
    </el-dialog> -->
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
import TabSearchBox from "@/components/TabSearchBox";
import CommentDetails from "./components/CommentDetails.vue";

export default {
  name: "InfoList",
  components: { Pagination, TabSearchBox, CommentDetails },
  data() {
    return {
      activeName: "1",
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      openeds:['1'],
      uniqueOpened: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        console.log(response.data.items);
        this.list = response.data.items;
        this.total = response.data.total;

        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    showDetail() {
      this.$refs.comDetails.showCommentDetail();
    },

    handleClick(tab, event) {},

    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.info-container {
  display: flex;
  .app-container {
    width: 85%;
  }
}
::v-deep .item-input .el-input__inner {
  background: #f8f8f8;
}
::v-deep .operate .el-button {
  color: #2060e3;
}
::v-deep .el-menu {
  border: none;
  background: #FFFFFF;
}
</style>
