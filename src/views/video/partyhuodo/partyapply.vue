<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <router-link :to="'/comp/adedit'">
        <el-button type="primary" size="small" icon="el-icon-plus">
        新增
        </el-button>
    </router-link>
      <div class="search-right" style="align-items: center;display: flex;">
        <el-input
          v-model="listQuery.title"
          placeholder="标题"
          style="width: 200px"
          class="mr20"
          @keyup.enter.native="handleFilter"
        />
        <el-select
          v-model="listQuery.type"
          placeholder="状态"
          clearable
          class="mr20"
          style="width: 130px"
        >
          <el-option
            v-for="item in calendarTypeOptions"
            :key="item.key"
            :label="item.display_name + '(' + item.key + ')'"
            :value="item.key"
          />
        </el-select>
        <el-date-picker
          v-model="listQuery.value1"
          class="mr20"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-button size="small" type="primary">
          搜索
        </el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%"
      class="ranking_table"
    >
      <el-table-column type="selection" align="center" />

      <el-table-column width="208px" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="177px" label="图片">
        <template>
          <el-image class="thumb" />
        </template>
      </el-table-column>

      <el-table-column label="跳转链接">
        <template>
          <span>https://www.baidu.com</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="153px" label="状态" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>

      <el-table-column width="135px" label="创建时间">
        <template slot-scope="scope">
          <span>{{
            scope.row.timestamp
          }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div class="operate">
            <el-button type="text">
              <router-link :to="'/comp/adedit/' + scope.row.id">
              编辑
            </router-link>
            </el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="row-center">
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style lang="scss" scoped>

.comp-container {
  padding: 40px 40px 55px;
  background: #FFFFFF;

  .row-center {
    margin-top: 52px;
  }

  .tab-box {

    .thumb {
      width: 88px;
      height: 64px;
      border-radius: 4px;
    }
  }
}

</style>
