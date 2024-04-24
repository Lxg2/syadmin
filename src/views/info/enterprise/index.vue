
<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <router-link :to="'/financing/enterpriseadd'">
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
        <el-button size="small" type="primary">
          搜索
        </el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>
   <el-table :data="tableData" class="panel_table">
        <el-table-column prop="day" label="日期" />
        <el-table-column prop="paview" label="访问量" />
        <el-table-column prop="visitor" label="访客数"/>
        <el-table-column prop="user" label="新增用户"/>
        <el-table-column prop="time" label="支付人数"/>
        <el-table-column prop="usum" label="累计支付人数"/>
      </el-table> 
    <div class="row-center">
      <pagination
        v-show="total < listQuery.limit"
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
  min-height: 100%;
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