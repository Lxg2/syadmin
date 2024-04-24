<template>
  <div class="sepc-container">
    <div class="row-between mb32">
      <div>
        <el-button
          size="small"
          class="filter-item mr20"
          type="primary"
          icon="el-icon-plus"
        >
          <router-link :to="'/goods/spec-add'">新增规格</router-link>
        </el-button>
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
        @keyup.enter.native="handleFilter"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <el-table v-loading="listLoading" :data="list">
      <el-table-column type="selection" align="center" />

      <el-table-column width="350" label="规格名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注说明">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="排序" width="254">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="268" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <div class="operate">
          <el-button type="text">
            <router-link :to="'/role/add/'">编辑</router-link>
          </el-button>
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
      indate: "",
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        sort: "+id",
        value1: null,
      },
      //statusOptions: ['published', 'draft', 'deleted'],
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
.sepc-container {
  padding: 40px 40px 48px;
  background: #ffffff;

  .underpart {
    margin-top: 50px;
  }
}
.el-button--text {
  padding: 0;
  height: 18px;
  font-size: 16px;
  color: #096bed;
}

::v-deep .el-table th {
  height: 44px;
  justify-content: flex-start;
  align-items: center;
  background: #f8f8f8;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

::v-deep .el-table .cell {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}

::v-deep .el-range-editor.el-input__inner {
  height: 40px;
}
</style>
