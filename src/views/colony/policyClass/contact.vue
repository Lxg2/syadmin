<template>
  <div class="comp-container">
    <div class="search-box row-between">
      <!-- <el-upload
        class="upload-demo"
        :on-remove="handleRemove"
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
        :on-change="readExcel"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload> -->
      <!-- <el-upload action="" :auto-upload="false" :show-file-list="false" :on-change="readExcel">
  <el-button slot="trigger" type="primary">批量导入</el-button>
</el-upload> -->


      <router-link :to="'/colony/colonyclassadd'">
        <el-button type="primary" size="small" icon="el-icon-plus">
        新增
        </el-button>
    </router-link>
      <div class="search-right" style="align-items: center;display: flex;">
        <!-- <el-select style="width: 200px;margin-right: 20px;" v-model="listQuery.categoryid" clearable placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.Categorytitle"
              :value="item.id">
            </el-option>
          </el-select> -->
        <el-input
          v-model="listQuery.keywords"
          placeholder="标题"
          style="width: 200px"
          class="mr20"
          @keyup.enter.native="getList"
        />
        <el-button size="small" @click="getList" type="primary">
          搜索
        </el-button>
        <el-button size="small">重置</el-button>
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
      <el-table-column align="center" width="10" />

      <el-table-column label="企业名称" prop="Title">
      </el-table-column>

      
      
      <el-table-column width="200px" label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ 
            row.Isshow?'显示':'隐藏'
            }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="所属集群">
        <template slot-scope="scope">
          <span>{{
            scope.row.Categoryid === 1?'超高清视频产业':scope.row.Categoryid === 2?'新能源产业':scope.row.Categoryid === 3?'智能终端产业':scope.row.Categoryid === 4?'半导体与集成电路产业':'为归属'
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="龙头企业" align="center">
        <template slot-scope="{ row }">
          <span :style="{color:row.Sortid === 1?'#409EFF':'#909399'}">{{ 
            row.Sortid === 1?'是':'否'
            }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{
            scope.row.Createtime
          }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div class="operate">
            <el-button type="text" @click="$router.push({path:'/colony/colonyclassedit',query:{id:scope.row.id}}
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
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="row-center">
      <pagination
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
import {DeleteCategory,DeleteArticle,GetCategoryList,GetArtcileList,allAddreq} from "@/api/user";
import Pagination from "@/components/Pagination";
import * as XLSX from 'xlsx'

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
      list: [],
      fileList: [],
      options:[
        {
          id:1,
          Categorytitle:'超高清视频产业'
        },
        {
          id:2,
          Categorytitle:'新能源产业'
        },
        {
          id:3,
          Categorytitle:'智能终端产业'
        },
        {
          id:4,
          Categorytitle:'半导体与集成电路产业'
        }
      ],
      total: 0,
      calendarTypeOptions,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10,
        keywords:'',
        channelname:'',
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    readExcel(file) {
    const fileReader = new FileReader();
    fileReader.onload = async(e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const wsname = workbook.SheetNames[3]; // 取第一张表
        console.log(wsname);
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成 JSON 格式的表格内容
        // console.log(ws, '表格数据（JSON格式）');
        if(ws && ws.length > 0){
          for(const item of ws) {
            let datas = {
              sortid:2,
              title:item['单位名称'],
              categoryid:'1',
              isshow:1,
              channelname:this.$route.meta.channelname
            }
            try {
             await this.tems(datas)
            } catch (error) {
              return
            }
          }
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    };
    fileReader.readAsArrayBuffer(file.raw);
  },
  tems(datas) {
  return new Promise(resolve => {
    setTimeout(async () => {
      let res = await allAddreq(datas)
    if(res.status === 200){
      this.$message.success('上传一条成功')
      resolve('ok')
    }
    // console.log(datas);
    }, 4000);
  });  
},
    handleUpload(file, fileList){
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
      },
    async deletaFn(id){
      let res = await DeleteArticle({id})
      if(res.status === 200){
        this.getList()
        this.$message.success(res.msg)
      }
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

<style lang="scss" scoped>

.comp-container {
  padding: 40px 40px 55px;
  min-height: 100%;
  background: #FFFFFF;
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
