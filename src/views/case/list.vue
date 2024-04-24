<template>
  <div class="app-container">
    <TabSearchBox :btnText="'新增'">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="1"></el-tab-pane>
        <el-tab-pane label="已发布" name="2"></el-tab-pane>
        <el-tab-pane label="未发布" name="3"></el-tab-pane>
      </el-tabs>
    </TabSearchBox>

    <div class="cell" v-for="item in list" :key="item.id">
      <el-image
        style="width: 140px; height: 95px; margin-right: 15px"
        :src="item.image_uri"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i></div
      ></el-image>
      <div class="content">
        <div class="top-content">
          <span class="title">{{ item.title }}</span>
          <span class="time">{{ item.display_time }}</span>
        </div>
        <div class="down-content">
          <div class="number">
            <span> <i class="el-icon-view"></i> {{ item.pageviews }} </span>
            <span> <i class="el-icon-position"></i> 32040 </span>
          </div>
          <div class="operate">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">发布</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <pagination
    class="underpart"
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
import TabSearchBox from "@/components/TabSearchBox";

export default {
  name: "InfoList",
  components: { Pagination, TabSearchBox },
  data() {
    return {
      activeName: "1",
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
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
        console.log(response.data.items);
        this.list = response.data.items;
        this.total = response.data.total;

        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleClick(tab, event) {},
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.underpart {
  margin: 40px;
}
::v-deep .item-input .el-input__inner {
  color: #999999;
  background: #f8f8f8;
}
::v-deep .operate .el-button {
  color: #2060e3;
}
</style>
