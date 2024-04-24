<template>
  <div class="ana-container">
    <div class="row-between mb24">
      <div class="row">
        <span style="font-size: 14px; line-height: 14px">商品分类</span>
        <el-select
          v-model="value"
          placeholder="请选择分类"
          style="width: 129px; margin: 0 20px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>

      <div class="row">
        <div class="search-right">
          <el-input
            v-model="seek"
            placeholder="输入关键词搜索"
            style="width: 360px; background: #f8f8f8"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-button size="small" class="ml20" plain>导出数据</el-button>
      </div>
    </div>

    <el-table style="width: 100%" :data="AnaObj" class="ranking_table">
      <el-table-column prop="paview" label="商品名称">
        <template slot-scope="scope">
          <div class="flex">
            <el-image class="thumb" />
            <div class="content-box">
              <span class="onelines">{{ scope.row.onelines }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="goodstype"
        label="商品类型"
        width="160"
      ></el-table-column>

      <el-table-column prop="pv" label="访问量" width="170"></el-table-column>

      <el-table-column prop="numvis" label="访客数" width="182">
        <template slot-scope="scope">
          <div style="color: #096bed" @click="dialogVisible = true">
            {{ scope.row.numvis }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="numpay" label="支付人数" width="188">
        <template slot-scope="scope">
          <div style="color: #096bed" @click="dialogPayer = true">
            {{ scope.row.numpay }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="paypc"
        label="支付金额"
        width="224"
      ></el-table-column>

      <el-table-column
        prop="paypc"
        label="支付转化率"
        width="218"
      ></el-table-column>

      <el-table-column prop="operate" label="操作" width="120">
        <div class="operate">
          <el-link :href="'/goods/detail'" :underline="false">数据分析</el-link>
        </div>
      </el-table-column>
    </el-table>

    <!-- 访客详情弹框 -->
    <el-dialog
      class="dialog-box"
      title="访客"
      :visible.sync="dialogVisible"
      width="62%"
      :before-close="handleClose"
    >
      <div class="accesstime row-between mb30">
        <div class="block row">
          <div class="mr24">访问时间</div>
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <el-input
          v-model="listQuery.title"
          placeholder="输入关键词搜索"
          style="width: 360px; background: #f8f8f8"
          class="filter-item item-input"
          @keyup.enter.native="handleFilter"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <el-table style="width: 100%" :data="PopObj" class="list-box">
        <el-table-column prop="username" label="用户名" width="335">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.username }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="vistime" label="访问时间" width="352" />

        <el-table-column prop="staytime" label="停留时长" width="350" />

        <el-table-column
          align="center"
          prop="operate"
          label="操作"
          min-width="100"
        >
          <div class="operate">
            <el-button type="text">用户轨迹</el-button>
          </div>
        </el-table-column>
      </el-table>

      <div class="dialog-foot row">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
        <el-button type="primary" @click="submitForm" size="small"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 支付人数详情弹框 -->
    <el-dialog
      class="dialog-box"
      title="付款买家数"
      :visible.sync="dialogPayer"
      width="62%"
      :before-close="handleClose"
    >
      <div class="accesstime row-between mb30">
        <div class="block row">
          <div class="mr24">下单时间</div>
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <el-input
          v-model="listQuery.title"
          placeholder="输入关键词搜索"
          style="width: 360px; background: #f8f8f8"
          class="filter-item item-input"
          @keyup.enter.native="handleFilter"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <el-table style="width: 100%" :data="PopObj" class="list-box">
        <el-table-column prop="paview" label="用户名" width="208">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.username }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="vistime" label="下单时间" width="214" />

        <el-table-column prop="paynum" label="下单件数" width="180" />

        <el-table-column prop="paymoy" label="下单金额" width="216" />

        <el-table-column prop="paysta" label="支付状态">
          <template slot-scope="scope">
            <div
              :style="{
                color: scope.row.payStatus ? 'red' : '#16D2A2',
              }"
            >
              {{ PAY_STATUS[scope.row.payStatus] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="operate"
          label="操作"
          min-width="100"
        >
          <div class="operate">
            <el-button type="text">用户轨迹</el-button>
          </div>
        </el-table-column>
      </el-table>

      <div class="dialog-foot row">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
        <el-button type="primary" @click="submitForm" size="small"
          >确定</el-button
        >
      </div>
    </el-dialog>

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
  components: { Pagination },
  data() {
    const PAY_STATUS = {
      0: "未支付",
      1: "已支付",
    };
    return {
      PAY_STATUS,
      value: "",
      value1: "",
      seek: "",
      total: 0,
      ruleForm: {},
      dialogVisible: false,
      dialogPayer: false,
      rules: {},
      listQuery: {
        page: 1,
        limit: 6,
      },
      allChecked: false,
      AnaObj: [
        {
          onelines: "制作h5app,成本低快速见效，兼容性强",
          goodstype: "小电器",
          pv: 109080,
          numvis: 10908,
          numpay: 2090,
          numm: 109080,
          paypc: 10908,
        },
        {
          onelines: "制作h5app,成本低快速见效，兼容性强",
          goodstype: "小电器",
          pv: 109080,
          numvis: 10908,
          numpay: 2090,
          numm: 109080,
          paypc: 10908,
        },
        {
          onelines: "制作h5app,成本低快速见效，兼容性强",
          goodstype: "小电器",
          pv: 109080,
          numvis: 10908,
          numpay: 2090,
          numm: 109080,
          paypc: 10908,
        },
        {
          onelines: "制作h5app,成本低快速见效，兼容性强",
          goodstype: "小电器",
          pv: 109080,
          numvis: 10908,
          numpay: 2090,
          numm: 109080,
          paypc: 10908,
        },
      ],
      PopObj: [
        {
          username: "森九",
          vistime: "2023-03-28 15:00:59",
          staytime: " 1`11`` ",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 1,
        },
        {
          username: "低沉旳呢喃",
          vistime: "2023-03-28 15:00:59",
          staytime: " 1`11`` ",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 0,
        },
        {
          username: "森九",
          vistime: "2023-03-28 15:00:59",
          staytime: " 1`11`` ",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 1,
        },
        {
          username: "森九",
          vistime: "2023-03-28 15:00:59",
          staytime: " 1`11`` ",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 1,
        },
      ],
      options: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "2",
        },
        {
          value: "选项3",
          label: "3",
        },
        {
          value: "选项4",
          label: "4",
        },
      ],
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
    handleClose() {
      this.dialogVisible = false;
      this.dialogPayer = false;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("submit!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ana-container {
  padding: 34px 35px 80px 42px;
  background-color: #fff;
  font-family: Microsoft YaHei;

  .dialog-box {
    .accesstime {
      margin-bottom: 30px;
      .demonstration {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
      }
    }
    .list-box {
      .onelines {
        margin-left: 10px;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
    }
    .dialog-foot {
      padding: 28px 0;
    }
  }
}

::v-deep .el-range-editor.el-input__inner {
  height: 40px;
}

::v-deep .el-input__inner {
  height: 40px;
}

::v-deep .el-link.el-link--default {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #096bed;
  text-decoration: none;
}

::v-deep .el-link--default :hover {
  text-decoration: none;
}
</style>