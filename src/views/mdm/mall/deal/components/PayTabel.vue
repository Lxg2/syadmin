<template>
  <div class="mb30 mt30" style="padding-top: 30px;">
    <div class="row-between mb32">
      <div class="title">数据列表</div>
      <div class="row">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-button size="small" class="ml20" plain>导出数据</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="panel_table">
      <el-table-column prop="day" label="日期" />
      <el-table-column prop="paview" label="访问量" />
      <el-table-column prop="visitor" label="访客数" />
      <el-table-column prop="user" label="新增用户" />
      <el-table-column prop="time" label="支付人数"  />
      <el-table-column prop="usum" label="累计支付人数"  />
    </el-table>
    <div class="foot">
      <pagination
      style="justify-content: flex-end;"
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
  components:{Pagination},
  data() {
    return {
      chart: null,
      value: "",
      list: null,
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
      },
      tableData: [
        {
          day: "2023-03-02",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-04",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-01",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-03",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-02",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-04",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-01",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-03",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
      ],
    };
  },
  created() {
    this.getList();
  },

  beforeDestroy() {
    if (!this.chart) {
      1;
      return;
    }
    this.chart.dispose();
    this.chart = null;
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
.foot {
    padding: 64px 0px 65px 0px;
  }
.title {
  height: 19px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}
::v-deep .el-table td {
  border-bottom: 0;
}
</style>