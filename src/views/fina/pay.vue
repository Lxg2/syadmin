<template>
  <div class="pay-container">
    <div class="filter-container row-between">
      <div>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleUpdate()"
          >新增</el-button
        >
        <el-button size="small">删除</el-button>
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

    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      class="tab-box ranking_table"
    >
      <el-table-column type="selection" align="center" />

      <el-table-column width="576px" label="支付名称">
        <template slot-scope="scope">
          <div class="flex">
            <el-image class="thumb" />
            <div class="content-box">
              <span class="onelines">{{ scope.row.author }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="243px" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="状态" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="200">
        <template>
          <div class="operate">
            <el-button type="text">编辑</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="underpart">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      class="row-between"
      style="font-weight: bold"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item prop="">
          <Upload v-model="temp.image_uri" />
          <span>上传400*400px，JPG，PNG，JPEG格式的 图片，图片小于1M</span>
        </el-form-item>
        <el-form-item label="用户名" prop="type">
          <el-input v-model="temp.type" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="temp.telephone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="title">
          <el-input v-model="temp.title" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
import Upload from "@/components/Upload/SingleImage2";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Upload,
  },
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        sort: "+id",
        value1: null,
      },
      statusOptions: ["published", "draft", "deleted"],
      temp: {
        id: undefined,
        image_uri: "",
        telephone: "",
        title: "",
        type: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "新增用户",
        create: "Create",
      },
      rules: {
        type: [{ required: true, message: "用户名是必填的", trigger: "blur" }],
        telephone: [
          {
            type: "date",
            required: true,
            message: "手机号是必填的",
            trigger: "blur",
          },
        ],
        title: [{ required: true, message: "邮箱是必填的", trigger: "blur" }],
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
        path: "/fina/pay-edit",
      });
    },
  },
};
</script>
  
  <style lang="scss"scoped>
.pay-container {
  padding: 40px 40px 0;
  background: #ffffff;

  .underpart {
    padding: 52px 0;
  }
}
.edit-input {
  padding-right: 100px;
}
.el-button--text {
  padding: 0;
  height: 18px;
  font-size: 16px;
  color: #096bed;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #525252;
}

::v-deep .el-table td {
  border-bottom: 0;
}
</style>
  