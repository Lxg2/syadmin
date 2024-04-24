<template>
  <div class="acc-container">
    <div class="head-box">
      <div class="title mb24">{{ accountObj.title }}</div>

      <div class="account-items flex">
        <li
          class="account-item flex1"
          v-for="(accountObj, index) in accountObj.data"
          :key="index"
        >
          <div class="text">{{ accountObj.text }}</div>
          <div class="num-box">
            <div class="num">{{ accountObj.num }}</div>
          </div>
          <div class="yesterday">昨日&nbsp;+{{ accountObj.yesterday }}</div>
        </li>
        <div class="withdraw">
          <el-button size="small" plain>提现</el-button>
        </div>
      </div>
    </div>

    <div class="row-left row mb32">
      <el-button round>全部</el-button>
      <el-button round>7日</el-button>
      <el-button round>15日</el-button>
      <el-button round>1个月</el-button>
      <el-button round>3个月</el-button>

      <el-date-picker
        v-model="listQuery.value1"
        class="filter-item"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin: 0 20px"
      />
      <el-button size="small" type="primary">确定</el-button>
      <el-button size="small">导出</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      class="ranking_table mb40"
    >
      <el-table-column class="row" width="138" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" width="140" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="业务单号" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" width="170" label="结算时间">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" width="140" label="收支类型">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" width="150" label="金额（元）">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" width="180" label="余额（元）">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" width="140" label="支付方式">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class="row" label="支付流水号">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template>
          <div class="operate">
            <el-button type="text" @click="handleUpdate()">查看</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="row-center">
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
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

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
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        value1: null,
      },
      accountObj: {
        title: "账户概览",
        data: [
          {
            text: "账户总额",
            num: 480890.0,
            yesterday: 1899.0,
          },
        ],
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
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleUpdate() {
      this.$router.push({
        path: "/fina/acc-det/",
      });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.acc-container {
  width: 100%;
  padding: 40px 40px 56px;
  background-color: #ffffff;

  .head-box {
    height: 200px;
    background: #f8f8f8;
    border-radius: 4px;
    margin-bottom: 42px;
    padding: 28px 0 28px 30px;

    .title {
      height: 19px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
    }

    .account-items {
      .account-item {
        margin-right: 20px;
        padding-bottom: 24px;

        .text {
          line-height: 14px;
          font-size: 14px;
          color: #999999;
          margin: 8px 0 22px 0;
        }

        .num-box {
          margin-bottom: 15px;
          display: flex;
          align-items: center;

          .num {
            line-height: 23px;
            font-size: 30px;
            font-weight: bold;
            color: #333333;
            margin-right: 24px;
          }
        }

        .yesterday {
          line-height: 14px;
          font-size: 14px;
          font-weight: bold;
          color: #666666;
        }
      }

      .withdraw {
        margin: 30px 1300px 0 130px;
      }
    }
  }
}

/*
    .cancel-btn {
      position: absolute;
      right: 15px;
      top: 10px;
    }

    .el-button--text {
       padding: 0;
       height: 18px;
       font-size: 16px;
       color: #096bed;
    } */

::v-deep .el-button.el-button--medium {
  width: 80px;
  height: 40px;
  border-radius: 20px;
}
</style>