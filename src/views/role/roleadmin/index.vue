<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <router-link :to="'/role/roleadd'">
        <el-button type="primary" size="small" icon="el-icon-plus">
         新增
        </el-button>
    </router-link>
      <div class="search-right" style="align-items: center;display: flex;">
          <el-input v-model="listQuery.keywords" placeholder="请输入关键词" clearable style="width: 250px;margin-right: 10px;"></el-input>
        <el-button @click="handleFilter" icon="el-icon-search" size="small" type="primary">
          搜索
        </el-button>
        <!-- <el-button size="small" @click="resetListdata">搜索</el-button> -->
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
    <el-table-column width="10" align="center" />
    <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{
            scope.row.Title
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Banner图">
        <template slot-scope="scope">
          <el-image 
            style="width: 130px; height: 100px;margin: 10px 0px !important;"
            :src="scope.row.Filepath" 
            :preview-src-list="[scope.row.Imgurl]">
          </el-image>
        </template>
      </el-table-column>

     
      <el-table-column label="跳转小程序链接">
        <template slot-scope="scope">
          <span>{{ scope.row.Gourl }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div class="operate">
            <el-button type="text" @click="$router.push({name:'Roleedit',params:scope.row}
            )">
              编辑
            </el-button>
            <span class="line">|</span>
            <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='取消'
            icon="el-icon-info"
            @onConfirm="deletaFn(scope.row.id)"
            icon-color="red"
            title="你确定删除此广告封面吗?"
          >
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Delete @close="close" @confirmDelete="confirmDelete" :deletedialogVisible="deletedialogVisible"></Delete> -->
    <div class="row-center">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagesize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {GetAdList,DeleteAd} from '@/api/user.js'

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
      Types:'index',
      options:[
          {
              name: '首页',
              value:'index'
          },
          {
              name: '知识产权',
              value:'zhishi'
          },
          {
              name: '财税咨询',
              value:'caishui'
          }
      ],
      list: null,
      total: 0,
      deletedialogVisible: false,
      listLoading: false,
      dId:'',
      listQuery: {
        page: 1,
        pagesize: 10,
        keywords:'',
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    close() {
      this.deletedialogVisible = false
    },
    async deletaFn(id){
      let res = await DeleteAd({id})
      if(res.status === 200){
        this.getList()
        this.$message.success(res.msg)
      }else{
        this.$message.error(res.msg)
      }
      this.deletedialogVisible = false
    },
    // 删除框
    showDeleteDialog(id){
      this.dId = id
      this.deletedialogVisible = true
    },
    handleFilter(){
      this.getList()
    },
    getList() {
      this.listLoading = true;
      GetAdList(this.listQuery).then((response) => {
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
