<template>
  <div class="datum-container">
    <div class="left-menu mr32">
      <el-row class="tac">
        <el-col :span="12" style="width: 244px">
          <el-menu
            default-active="2"
            :default-openeds="openeds"
            class="el-menu-vertical-demo"
          >
            <el-submenu index="1">
              <template slot="title"><span>资料列表</span></template>
              <el-menu-item-group>
                <el-menu-item index="1-1">视频</el-menu-item>
                <el-menu-item index="1-2">音频</el-menu-item>
                <el-menu-item index="1-3">word文件</el-menu-item>
                <el-menu-item index="1-4">pdf文件</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-5">
                <template slot="title">图片</template>
                <el-menu-item index="1-5-1">活动图片</el-menu-item>
                <el-submenu index="1-5-2">
                  <template slot="title">公司团建图片</template>
                  <el-menu-item index="1-5-2-1">惠州团建图片</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="1-6">
                <span slot="title">深圳团建照片</span>
              </el-menu-item>
              <el-menu-item index="1-7">
                <span slot="title">2021深圳图片</span>
              </el-menu-item>
              <el-menu-item index="1-8">
                <span slot="title">2022深圳图片</span>
              </el-menu-item>
              <el-menu-item index="1-9">
                <span slot="title">2023深圳图片</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div class="right-list">
      <div class="row-between">
        <div>
          <el-button class="el-icon-plus" size="small" type="primary">
            <router-link to="/datum/com-add">上传</router-link>
          </el-button>
        </div>

        <el-input
          placeholder="输入关键词搜索"
          style="width: 360px; background: #f8f8f8"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <el-table :data="tableData" class="tab-box">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="filename" label="文件名">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.filename }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="belong" label="所属类别" width="270">
        </el-table-column>

        <el-table-column prop="settime" label="创建时间" width="200">
        </el-table-column>

        <el-table-column align="center" label="操作" width="160">
          <div class="operate flex">
            <el-button type="text" size="mini">分类</el-button>
            <el-button type="text" size="mini">下载</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </div>
        </el-table-column>
      </el-table>

      <pagination
        class="underpart"
        v-if="total > 0"
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
import TabSearchBox from "@/components/TabSearchBox";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination, TabSearchBox },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        keyWord: "",
      },
      tableData: [
        {
          filename: "小程序需求文档.word",
          belong: "2020深圳团建",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "小程序开发套餐价格说明.xlsx",
          belong: "2020深圳团建",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "律所智能办公小程序案例演示稿.p",
          belong: "2020深圳团建",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "深腾数字科技产品.pdf",
          belong: "2020深圳团建",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "小程序需求文档.word",
          belong: "其他",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "商会小程序功能演示ppt及其报价单.mp3",
          belong: "2020深圳团建",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "商会小程序功能演示ppt及其报价单.mp3",
          belong: "活动图片",
          settime: "2023.02.30  18:56",
        },
        {
          filename: "深腾数字科技产品.pdf",
          belong: "音频",
          settime: "2023.02.30  18:56",
        },
      ],
      openeds: ["1"],
      uniqueOpened: false,
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
    handleDelete(row, index) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.datum-container {
  display: flex;
  .right-list {
    width: 83%;
    padding: 40px 40px 0;
    background: #ffffff;
  }

  .underpart {
    padding: 52px 0;
  }
}
::v-deep .el-menu {
  border: none;
  background: #ffffff;
}
::v-deep .el-table th.is-leaf,
.el-table td {
  border-bottom: 0;
}
::v-deep .el-table th > .cell {
  height: 44px;
  background: #f8f8f8;
  line-height: 44px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}

::v-deep .el-table tr {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  height: 80px;
  line-height: 80px;
  font-family: Microsoft YaHei;
}
</style>
