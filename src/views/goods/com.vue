<template>
  <div class="com-container">
    <div class="row-between mb32">
      <div>
        <span class="mr20">评论状态</span>
        <el-select
          placeholder="评论状态"
          v-model="region"
          class="mr20"
          style="width: 130px"
        >
          <el-option label="已评论" value="1"></el-option>
          <el-option label="未评论" value="2"></el-option>
        </el-select>
        <el-date-picker
          v-model="indate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-input
        v-model="listQuery.title"
        placeholder="输入关键词搜索"
        style="width: 360px; background: #f8f8f8"
        class="item-input"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <el-table v-loading="listLoading" :data="list" class="ranking_table">
      <el-table-column type="selection" align="center" />

      <el-table-column label="评价">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="author" width="306" label="商品名称">
        <template slot-scope="scope">
          <div class="flex">
            <el-image class="thumb" />
            <div class="content-box">
              <span class="onelines">{{ scope.row.author }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="226">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="164" label="发表时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="172" label="状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="130">
        <div class="operate">
          <el-button type="text" @click="showDetail">详情</el-button>
          <span class="line">|</span>
          <el-button type="text">删除</el-button>
        </div>
      </el-table-column>
    </el-table>

    <div class="underpart">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>

    <CommentPopover ref="CommentPop" />
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
import CommentPopover from "./components/CommentPopover";

export default {
  name: "ArticleList",
  components: { Pagination, CommentPopover },
  data() {
    return {
      indate: "",
      region: "",
      list: null,
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    showDetail() {
      this.$refs.CommentPop.showCommentDetail();
    },
  },
};
</script>

<style lang="scss" scoped>
.com-container {
  padding: 40px;
  background: #ffffff;

  .underpart {
    margin-top: 50px;
  }
}

.edit-input {
  padding-right: 100px;
}
.el-button--text {
  padding: 0;
  height: 18px;
  font-size: 16px;
  color: #096bed;
}
</style>
