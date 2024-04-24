
<template>
  <div class="way-container">
    <div class="filter-container row-between">
      <div>
        <el-button
          size="small"
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          <router-link :to="'/courier/way-add'">新增</router-link>
        </el-button>
        <el-button size="small" class="filter-item">删除</el-button>
      </div>
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

    <el-table v-loading="listLoading" :data="tableData" class="ranking_table"
      ><el-table-column type="selection" align="center" />

      <el-table-column prop="distribut" width="254" label="配送方式" />

      <el-table-column prop="support" width="220" label="物流保价">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.support"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="arrived" width="220" label="货到付款">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.arrived"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="launch" width="220" label="启用">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="排序" prop="ordering" width="240" />

      <el-table-column label="创建时间" prop="settime" />

      <el-table-column align="center" label="操作">
        <template>
          <div class="operate">
            <el-button type="text">
              <router-link :to="'/courier/way-add'"> 编辑 </router-link>
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
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      tableData: [
        {
          distribut: "在线支付",
          ordering: 99,
          settime: "2023-03-22  15:00",
        },
        {
          distribut: "在线支付",
          ordering: 99,
          settime: "2023-03-22  15:00",
        },
        {
          distribut: "虚拟物品",
          ordering: 99,
          settime: "2023-03-22  15:00",
        },
        {
          distribut: "在线支付",
          ordering: 99,
          settime: "2023-03-22  15:00",
        },
      ],
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
.way-container {
  padding: 40px 40px 52px;
  background: #ffffff;

  .row-center {
    margin-top: 180px;
  }
}
</style>