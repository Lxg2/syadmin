<template>
  <div class="com-container">
    <div class="filter-container row-between">
      <span style="font-weight: bold">自定义字段应用在资料分类上</span>
      <div>
        <el-input
          v-model="listQuery.title"
          placeholder="输入关键词搜索"
          style="width: 360px"
          class="filter-item item-input"
          @keyup.enter.native="handleFilter"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i
        ></el-input>
        <el-button
          class="filter-item"
          style="margin-left: 40px"
          size="small"
          type="primary"
        >
          <router-link to="/datum/com-add">新增分类</router-link>
        </el-button>
      </div>
    </div>

    <el-table v-loading="listLoading" :data="list" class="sort_table">
      <el-table-column type="selection" align="center" />
      <el-table-column label="类别名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="325" label="启用状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>

      <el-table-column width="319" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <div class="operate">
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini">删除</el-button>
          <el-button type="text" size="mini">添加子类</el-button>
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
        style="margin-top: 48px"
      />
    </div>
  </div>
</template>
  
  <script>
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];
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
      total: 0,
      calendarTypeOptions,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        value1: null,
        status: "",
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
.com-container {
  padding: 40px;
  background: #ffffff;

  .underpart {
    margin-top: 35px;
  }
}
.edit-input {
  padding-right: 100px;
}

::v-deep .operate .el-button {
  color: #2060e3;
}
::v-deep .el-table th.is-leaf,
.el-table td {
  border-bottom: none;
}

::v-deep .el-table th > .cell {
  height: 44px;
  background: #f8f8f8;
  line-height: 44px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
</style>
  