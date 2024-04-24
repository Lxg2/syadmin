<template>
  <div class="table-container">
    <div>
      <span style="font-weight: bold;">选择商品</span>
        <el-input placeholder="输入关键词搜索" @keyup.enter.native="handleSearch">
      <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
    </div>

    <el-table :data="list" fit highlight-current-row style="width: 100%; padding-top: 22px;">
      <el-table-column type="selection" align="center" />
      <el-table-column width="797" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="244" label="售价">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="235" label="库存">
        <template slot-scope="scope">
          <span>{{ scope.row.value1 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" label="状态">
        <template slot-scope="{ row }">
          <el-switch v-model="row.status" active-color="#1BD9A1" inactive-color="#D1D1D1"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";

export default {
   data() {
    return {
      total: 0,
      list: null,
      listQuery: {
        title: undefined,
        type: undefined,
        sort: '+id',
        value1: null,
        status: ''
      },
    }
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
  }
}
</script>

<style>

</style>