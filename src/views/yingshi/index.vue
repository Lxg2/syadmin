<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <router-link :to="'/directseeding/videosadminadd'">
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
      <el-table-column width="337px" label="标题" prop="Title">
      </el-table-column>
      <el-table-column width="100px"></el-table-column>
      <el-table-column width="150px" label="封面">
        <template slot-scope="scope">
          <video @click="showvideoFn(scope.row.Imgurl)" :src="scope.row.Imgurl" width="100px" height="100px"></video>
        </template>
      </el-table-column>

      <el-table-column min-width="223px" show-overflow-tooltip label="显示状态" align="center">
        <template slot-scope="{ row }">
          <span>{{row.Isshow? '显示' : '隐藏'}}</span>
        </template>
      </el-table-column>

      <el-table-column width="135px" label="排序">
        <template slot-scope="scope">
          <span>{{
            scope.row.Sortid
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div class="operate">
            <el-button type="text" @click="$router.push({path:'/directseeding/videosadminedit',query:{id:scope.row.id}}
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
              title="你确定删除此内容吗?"
            >
            <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog
      title="视频"
      :visible.sync="dialogVisiblevideo"
      width="50%"
      :before-close="handleClose">
      <video ref="videohtml" controls :src="showvideourl" width="100%" height="auto" style="margin-bottom: 50px;"></video>
    </el-dialog>

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
      dialogVisiblevideo: false,
      showvideourl:'',
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
    // 关闭
    handleClose(){
      // 关闭视频之前停止播放
      this.$refs.videohtml.pause()
      this.dialogVisiblevideo = false
    },
    showvideoFn(url){
      this.showvideourl = url
      this.dialogVisiblevideo = true
    },
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
