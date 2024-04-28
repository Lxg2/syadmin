<template>
    <div class="com-container">
      <!-- <div class="filter-container row-between">
        <div class="flex" style="align-items: center;">
          <span class="mr20 commentDate">评论时间</span>
          <el-button round @click="changeCommentBtnFn(0)" :class="{btnactive:btnDate==0}" type="text">全部</el-button>
          <el-button round @click="changeCommentBtnFn(7)" :class="{btnactive:btnDate==7}" type="text">7日内</el-button>
          <el-button round @click="changeCommentBtnFn(14)" :class="{btnactive:btnDate==14}" type="text">15日内</el-button>
          <el-button round @click="changeCommentBtnFn(30)" :class="{btnactive:btnDate==30}" type="text">1个月内</el-button>
          <el-button round @click="changeCommentBtnFn(90)" :class="{btnactive:btnDate==90}" type="text">3个月内</el-button>
        </div>
        <div>
          <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          <el-button size="small" type="primary">确定</el-button>
        </div>
      </div> -->
  
      <div class="client-info" v-for="index in 3" :key="index">
        <ul class="client-table">
          <li class="goods-info mt30 row-between">
            <div class="flex flex1">
              <el-avatar
                class="user"
                :size="40"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
  
              <div class="down-right">
                <div class="name flex">
                  <span class="flex1">热爱生活</span>
                </div>
                <div class="time">2 小时前</div>
              </div>
            </div>
          </li>
  
          <li class="commentContent">
            大模型的权重可达100+GB,而目前的开发工具却还没跟上,使用起来十分费力,部署时往往要等上好几分钟甚至好几小时,这已经成为AI工程师的隐痛,不但浪费工程师的时间，降低工作效率。
          </li>
  
          <li>
            <div class="statusbar">
              <span class="el-icon-document ml20"
                >《H5页面是什么?浅析H5页面的设计思路与方法→买购网》</span
              >
              <div class="line"></div>
            </div>
          </li>
        </ul>
      </div>
  
      <div class="underpart">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </div>
  </template>
    <script>
  import { fetchList } from "@/api/article";
  import Pagination from "@/components/Pagination";
  
  export default {
    name: "ArticleList",
    components: { Pagination },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: "success",
          draft: "info",
          deleted: "danger",
        };
        return statusMap[status];
      },
    },
    data() {
      return {
        list: null,
        btnDate:0,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
        },
      };
    },
    created() {
      this.getList();
    },
    methods: {
      // 切换时间
      changeCommentBtnFn(date){
        this.btnDate = date
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then((response) => {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .btnactive{
    width: 100px !important;
    background-color: #c9e3fd;
    text-align: center;
    color: #000;
  }
  .commentDate{
    color: #999;
    font-size: 18px;
    font-weight: 600;
  }
  .com-container {
    padding: 30px 40px 52px 50px;
    background: #ffffff;
    font-family: Microsoft YaHei;
  
    .underpart {
      margin-top: 70px;
    }
  }
  .el-button.el-button--text {
    width: 80px;
    height: 36px;
    text-align: center;
  }
  
  ::v-deep .el-range-editor.el-input__inner {
    height: 36px;
    margin: 0 20px;
  }
  </style>
    