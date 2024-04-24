<template>
  <div class="list-container">
    <div class="search-box row-between">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="dialogVisible = true"
      >
        添加地址
      </el-button>

      <div class="search-right">
        <el-input
          v-model="listQuery.seek"
          placeholder="输入关键词搜索"
          style="width: 360px; background: #f8f8f8"
          class="filter-item item-input"
          @keyup.enter.native="handleFilter"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>

    <el-table :data="list" class="ranking_table">
      <el-table-column type="selection" align="center" />

      <el-table-column width="176" label="地址名称">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="190" label="发货人">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="190" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="190" label="状态" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" width="220" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="130">
        <template>
          <div class="operate">
            <el-button type="text"> 编辑</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      class="flex mb20"
      title="添加地址"
      :visible.sync="dialogVisible"
      width="960px"
      :before-close="handleClose"
    >
      <el-form
        label-width="88px"
        label-position="left"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="flex1"
      >
        <el-form-item label="地址名称">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入地址名称（必填）"
          />
        </el-form-item>

        <el-form-item label="发货人">
          <el-input
            v-model="ruleForm.address"
            placeholder="请输入发货人（必填）"
          />
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input
            v-model="ruleForm.telephone"
            placeholder="请输入联系人电话"
          />
        </el-form-item>

        <el-form-item label="所在地区">
          <el-cascader
            v-model="selectedOptions"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="hangleChange"
          />
        </el-form-item>

        <el-form-item label="详情地址">
          <el-input v-model="ruleForm.address" placeholder="请输入详细地址" />
        </el-form-item>

        <el-form-item label="启用状态">
          <el-switch
            v-model="ruleForm.state"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          ></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>

    <div class="row-end">
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
import { regionData, CodeToText } from "element-china-area-data";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

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
      selectedOptions: [],
      options: regionData,
      form: {},
      ruleForm: {
        provinces: "",
        city: "",
        area: "",
        status: "",
      },
      dialogVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入公司地址",
            trigger: "blur",
          },
        ],
        telephone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
        ],
      },
      list: null,
      total: 0,
      calendarTypeOptions,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        /*  importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        value1: null, */
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    hangleChange() {
      this.form.provinces = CodeToText[this.selectedOptions[0]];
      this.form.city = CodeToText[this.selectedOptions[1]];
      this.form.area = CodeToText[this.selectedOptions[2]];
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("submit!");
        }
      });
    },
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
.list-container {
  font-family: Microsoft YaHei;
  overflow: auto;

  .row-end {
    margin: 86px 0 72px 0;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #525252;
}

::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
}

::v-deep .el-table td {
  border-bottom: 0;
}
</style>
