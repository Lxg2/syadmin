<template>
  <div class="godad-container">
    <div>
      <div class="title">选择商品</div>
      <el-input placeholder="输入关键词搜索" @keyup.enter.native="handleSearch">
        <i slot="prefix" class="el-input__icon el-icon-search"></i
      ></el-input>
    </div>

    <el-table :data="tableData" class="ranking_table mt30">
      <el-table-column type="selection" align="center" />

      <el-table-column prop="visname" label="商品名称">
        <template slot-scope="scope">
          <div class="flex">
            <el-image class="thumb" />
            <div class="content-box">
              <span class="onelines">{{ scope.row.visname }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="original" label="售价" width="244" />

      <el-table-column prop="inventory" label="库存" width="244" />

      <el-table-column width="160" label="状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>
    </el-table>

    <div class="underpart">
      <el-button>取 消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
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
        sort: "+id",
        value1: null,
        status: "",
      },
      tableData: [
        {
          visname: "无敌可爱的MINI充电手持 小风扇， 夏天必备",
          original: "¥218.00",
          inventory: 118,
        },
        {
          visname: "无敌可爱的MINI充电手持 小风扇， 夏天必备",
          original: "¥218.00",
          inventory: 118,
        },
      ],
    };
  },
  methods: {
    getList() {
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
.godad-container {
  padding: 40px 40px 100px;
  background: #ffffff;

  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 54px;
  }
  .underpart {
    padding: 150px 0 100px 128px;
  }
}

::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
}

::v-deep .el-input__icon {
  font-size: 18px;
}
</style>