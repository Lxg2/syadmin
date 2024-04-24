<template>
  <div class="role-container">
    <div class="filter-container row-between">
      <div>
        <el-button
          size="small"
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          <router-link :to="'/role/role-add'">新增</router-link>
        </el-button>
        <el-button size="small" class="filter-item">删除</el-button>
      </div>
      <el-input
        v-model="listQuery.title"
        placeholder="输入关键词搜索"
        style="width: 360px; background: #f8f8f8"
        class="filter-item item-input"
        @keyup.enter.native="handleFilter"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      class="ranking_table"
    >
      <el-table-column type="selection" align="center" />

      <el-table-column width="199px" label="管理员姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="210px" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="账号" width="216px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="密码" width="218px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="164px" label="所属部门">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="166px" label="状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template>
          <div class="operate">
            <el-button type="text">
              <router-link :to="'/role/add/'">编辑</router-link>
            </el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
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
  </div>
</template>

<script>
import Upload from "@/components/Upload/SingleImage2";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Upload,
  },
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
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        sort: "+id",
        value1: null,
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
  },
};
</script>

<style lang="scss" scoped>
.role-container {
  padding: 40px 40px 52px;
  background: #ffffff;

  .underpart {
    margin-top: 86px;
  }
}
</style>
