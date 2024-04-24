<template>
  <div class="goods-container flex">
    <div class="left-menu mr32">
      <el-row class="tac">
        <el-col :span="12" style="width: 244px">
          <el-menu
            default-active="2"
            :default-openeds="openeds"
            class="el-menu-vertical-demo"
            @open="handleOpen"
          >
            <el-submenu index="1">
              <template slot="title"><span>商品列表</span></template>
              <el-menu-item-group>
                <el-menu-item index="1-1">数码</el-menu-item>
                <el-menu-item index="1-2">生鲜</el-menu-item>
                <el-menu-item index="1-3">家居日用</el-menu-item>
                <el-menu-item index="1-4">玩具乐器</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-5">
                <template slot="title">数码</template>
                <el-menu-item index="1-5-1">运动耳机</el-menu-item>
                <el-submenu index="1-5-2">
                  <template slot="title">影音娱乐</template>
                  <el-menu-item index="1-5-2-1">音响</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="1-6">
                <span slot="title">美妆护肤</span>
              </el-menu-item>
              <el-menu-item index="1-7">
                <span slot="title">家用电器</span>
              </el-menu-item>
              <el-menu-item index="1-8">
                <span slot="title">手机配件</span>
              </el-menu-item>
              <el-menu-item index="1-9">
                <span slot="title">电脑办公</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div class="right-list">
      <div class="search-box row-between">
        <div>
          <el-input
            v-model="listQuery.title"
            placeholder="请输入商品名称"
            style="width: 200px"
            class="mr20"
          />
          <el-select
            v-model="listQuery.type"
            placeholder="商品状态"
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
          <el-select
            v-model="listQuery.type"
            placeholder="商品分类"
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
        </div>
        <div class="search-right">
          <el-date-picker
            v-model="listQuery.value1"
            class="mr20"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </div>
      </div>

      <div class="mb32">
        <el-button type="primary" size="small">
          <router-link :to="'/goods/goods-add'">添加商品</router-link>
        </el-button>
        <el-button size="small" plain>导入商品</el-button>
        <el-button size="small" plain>批量上架</el-button>
        <el-button size="small" plain>批量下架</el-button>
        <el-button size="small" plain>批量删除</el-button>
      </div>

      <el-table v-loading="listLoading" :data="list" class="ranking_table">
        <el-table-column type="selection" align="center" />

        <el-table-column label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="author" label="商品名称">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.author }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="价格" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分类" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="销量" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="库存" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="106">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#1BD9A1"
              inactive-color="#D1D1D1"
            />
          </template>
        </el-table-column>

        <el-table-column label="上架时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
          <div class="operate">
            <el-button type="text">编辑</el-button>
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
      activeIndex: "",
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
      openeds: ["1"],
      uniqueOpened: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key) {
      console.log(key);
    },
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
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-container {
  .right-list {
    width: 85%;
    padding: 40px 40px 0;
    background: #ffffff;

    .underpart {
      margin: 50px 0;
    }
  }
}

::v-deep .el-menu {
  border: none;
  background: #ffffff;
}
</style>