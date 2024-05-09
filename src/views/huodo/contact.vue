<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <router-link :to="'/activity/hdclassadd'">
        <el-button type="primary" size="small" icon="el-icon-plus">
        新增
        </el-button>
    </router-link>
      <div class="search-right" style="align-items: center;display: flex;">
        <el-input
          v-model="listQuery.keywords"
          placeholder="标题"
          style="width: 200px"
          class="mr20"
          @keyup.enter.native="handleFilter"
        />
        <el-button size="small" @click="getList" type="primary">
          搜索
        </el-button>
        <el-button size="small" @click="resetListdata">重置</el-button>
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
    <el-table-column align="center" width="10" />
      <el-table-column width="108px" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" prop="Categorytitle">
      </el-table-column>

      <el-table-column min-width="153px" label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ 
            row.Isshow?'显示':'隐藏'
            }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{
            scope.row.Createtime
          }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div class="operate">
            <el-button type="text" @click="$router.push({path:'/activity/hdclassedit',query:{id:scope.row.id}})">
              编辑
            </el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="row-center" v-if="total < listQuery.limit">
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
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];
import { getClasslistreq } from "@/api/article";
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
      list: [],
      total: 0,
      calendarTypeOptions,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keywords:'',
        channelname:''
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    resetListdata(){
      this.listQuery.keywords = ''
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.getList()
    },
    getList() {
      this.listLoading = true;
      getClasslistreq({...this.listQuery,channelname:this.$route.meta.channelname}).then((response) => {
        this.list = response.datalist.datalist;
        this.total = response.datalist.totalcount;
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
