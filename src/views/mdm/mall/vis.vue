<template>
  <div class="vis-box card-box">
    <div class="top row-between mb20">
      <div class="row">
        <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
      </div>

      <div class="flex mr20" style="align-items: center">
        <div class="mr20">
          <el-radio-group v-model="radio" size="medium">
            <el-radio-button label="1" border>近7天</el-radio-button>
            <el-radio-button label="2" border>近14天</el-radio-button>
            <el-radio-button label="3" border>近1个月</el-radio-button>
          </el-radio-group>
        </div>

        <div class="block mr20">
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

        <el-button size="small">导出数据</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" class="ranking_table">
      <el-table-column label="排名" width="304">
        <template slot-scope="scope">
          <div class="index-box">
            <img class="pic" src="../../../assets/logo.png" v-if="scope.$index < 3" />
            <span v-else>
              {{ scope.$index + 1 }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="visname" label="商品名称">
        <template slot-scope="scope">
          <div class="flex" style="height: 100%;align-items: center;">
            <div>
             <el-image class="thumb" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :preview-src-list="['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']" />
            </div>
            <div class="onelies-box">
              <span class="onelines">{{ scope.row.visname }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="visnum" label="商品访客数" width="332">
        <template slot-scope="scope">
          <span style="color: #096bed">{{ scope.row.visnum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="visment"
        label="支付转化率"
        width="162"
      ></el-table-column>
    </el-table>

    <div class="foot">
      <pagination
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
  name: "Vis",
  components: { Pagination },
  props: {},

  data() {
    return {
      radio: "1",
      value: "",
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      tableData: [
        {
          visname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          visnum: 2000000,
          visment: "79%",
        },
        {
          visname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          visnum: 2000000,
          visment: "79%",
        },
        {
          visname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          visnum: 2000000,
          visment: "79%",
        },
        {
          visname: "无敌可爱的MINI充电手持小风扇,夏天必备",
          visnum: 2000000,
          visment: "79%",
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  mounted() {},

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
.index-box{
  text-align: center;
}
.vis-box {
  padding: 40px 40px 52px 25px;

  .time {
    margin-left: 8px;
    line-height: 14px;
    font-size: 14px;
    color: #999999;
  }

  .but-box {
    margin-bottom: 40px;
  }
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  background-color: #fff;
}

::v-deep .el-radio-button--medium .el-radio-button__inner {
  margin-right: 20px;
  border: none;
  border-radius: 0;
}

::v-deep .el-radio-button__inner {
  background: #f8f8f8;
}
</style>