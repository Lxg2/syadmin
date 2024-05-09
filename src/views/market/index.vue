<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <router-link :to="'/market/marketadminadd'">
        <el-button type="primary" size="small" style="width: 150px;" icon="el-icon-plus">
        发布供需
        </el-button>
    </router-link>
      <div class="search-right" style="align-items: center;display: flex;">
        <el-input
          v-model="listQuery.keywords"
          placeholder="供需名称"
          style="width: 200px"
          class="mr20"
          @keyup.enter.native="handleFilter"
        />
        <el-button @click="handleFilter" size="small" type="primary">
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
      <el-table-column width="10" align="center" />
      <el-table-column width="237px" label="供需名称" prop="Title">
      </el-table-column>
      <el-table-column width="208px" label="封面">
        <template slot-scope="scope">
          <el-image 
            style="width: 100px; height: 100px;margin: 10px 0px !important;"
            :src="scope.row.Fileslist[0]" 
            :preview-src-list="[scope.row.Imgurl]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="类别" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.Supplytype===0?'供应':'需求' }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="描述" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.Remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="153px" label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{row.Isshow?'显示':'隐藏'}}</span>
        </template>
      </el-table-column>

      <el-table-column width="135px" label="创建时间">
        <template slot-scope="scope">
          <span>{{
            scope.row.Createtime
          }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <div class="operate">
            <el-button type="text" @click="$router.push({path:'/market/marketadminedit',query:{id:scope.row.id}}
            )">
              编辑
            </el-button>
            <span class="line">|</span>
            <el-button type="text" @click="$router.push({path:'/market/spacedetail',query:{id:scope.row.id}})">
              查看评论
            </el-button>
            <span class="line">|</span>
            <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              @onConfirm="deletaFn(scope.row.id)"
              icon-color="red"
              title="你确定删除此内容吗?"
            >
            <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="row-center">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
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
import { GetArtcileList,DeleteArticle } from "@/api/user";
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
        pageSize: 10,
        keywords:'',
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
    async deletaFn(id){
      let res = await DeleteArticle({id})
      if(res.status === 200){
        this.getList()
        this.$message.success(res.msg)
      }
    },
    handleFilter(){
      this.getList()
    },
    getList() {
      this.listLoading = true;
      GetArtcileList({...this.listQuery,channelname:this.$route.meta.channelname}).then((response) => {
        this.list =response.datalist.datalist;
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
<style>
.el-tooltip__popper{
  max-width:50% !important;
}</style>
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
