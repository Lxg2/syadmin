<template>
    <div class="info-container">
      <!-- <div class="left-menu" style="border-right: 1px solid #eee;">
        <el-row class="tac">
        <el-col :span="12" style="width: 244px;">
          <el-menu default-active="1" :default-openeds="openeds" class="mymune el-menu-vertical-demo">
              <el-menu-item-group>
                <el-menu-item index="1-0">
                  <div class="mune-title" @click="tabGruop=true">
                    <i class="el-icon-plus" style="color: #2060e3;display: flex;align-items: center;font-size: 35px;"></i>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-1">
                  <div class="mune-title">
                    <span>
                      信用类产品
                    </span>
                    <i @click.stop.prevent="showGruop('999')" class="el-icon-edit" style="display: flex;align-items: center;"></i>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <div class="mune-title">
                    <span>
                      抵押类产品
                    </span>
                    <i class="el-icon-edit" style="display: flex;align-items: center;"></i>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <div class="mune-title">
                    <span>
                      其他类产品
                    </span>
                    <i class="el-icon-edit" style="display: flex;align-items: center;"></i>
                  </div>
                </el-menu-item>
                <el-menu-item index="1-4">
                  <div class="mune-title">
                    <span>
                      个人类产品
                    </span>
                    <i class="el-icon-edit" style="display: flex;align-items: center;"></i>
                  </div>
                </el-menu-item>
              </el-menu-item-group>
          </el-menu>
        </el-col>
        </el-row>
      </div> -->
      <div class="app-container">
        <TabSearchBox :btnText="'新增'" :routerName="'creditoradd'">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="已发布" name="2"></el-tab-pane>
          <el-tab-pane label="未发布" name="3"></el-tab-pane>
        </el-tabs>
      </TabSearchBox>
      <div class="cell" v-for="item in list" :key="item.id">
        <el-image
          style="width: 140px; height: 85px; margin-right: 15px"
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
              <el-button type="text" size="mini" @click="$router.push({name:'stockedit'})">编辑</el-button>
              <el-button type="text" size="mini">发布</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
      </div>
      <el-dialog :visible.sync="tabGruop" width="40%" title="添加推荐类目">
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
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { fetchList } from "@/api/article";
  import Pagination from "@/components/Pagination";
  import TabSearchBox from "@/components/TabSearchBox";
  
  export default {
    name: "InfoList",
    components: { Pagination, TabSearchBox },
    data() {
      return {
        activeName: "1",
        tabGruop:false,
        list: null,
        total: 0,
        listLoading: true,
        gruopForm:{
          name:''
        },
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
      // 分组
      showGruop(name){
        this.tabGruop = true;
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then((response) => {
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
  ::v-deep{
    .mymune .el-menu-item-group__title{
      padding: 0px !important;
    }
    .mymune .el-menu-item-group ul li:nth-child(1){
      border-bottom: 1px solid #eee;
    }
  }
  .mune-title{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    span{
      font-size: 16px;
      font-family: 'Microsoft YaHei';
    }
  }
  .info-container {
    display: flex;
    .app-container {
      width: 100%;
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
  