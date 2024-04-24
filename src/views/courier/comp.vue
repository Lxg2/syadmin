<template>
  <div class="list-container">
    <div class="search-box row-between">
      <div>
        <el-button type="primary" size="small" icon="el-icon-plus">
          <router-link :to="'/courier/comp-add'">新增</router-link>
        </el-button>
        <el-button size="small">删除</el-button>
      </div>
      <div class="search-right">
        <el-input
          v-model="listQuery.seek"
          placeholder="输入关键词搜索"
          style="width: 360px; background: #f8f8f8"
          class="filter-item item-input"
          @keyup.enter.native="handleFilter"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>

    <el-table :data="list" class="ranking_table">
      <el-table-column type="selection" align="center" />

      <el-table-column width="202" label="物流名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="223" label="物流编号">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column max-width="343" label="物流网站">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="154" label="启用" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="排序" width="142">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="181" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template>
          <div class="operate">
            <el-button type="text">编辑</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="row-end">
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
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

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
      form: {},
      dialogVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: ["change", "blur"],
          },
        ],
        address: [
          {
            required: true,
            message: "请输入公司地址",
            trigger: ["change", "blur"],
          },
        ],
        telephone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: ["change", "blur"],
          },
        ],
      },
      list: null,
      total: 0,
      calendarTypeOptions,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
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
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("submit!");
        }
      });
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
.list-container {
  overflow: auto;
  .row-end {
    margin: 86px 0 72px 0;
  }
}

::v-deep .el-table td {
  border-bottom: 0;
}
</style>
