<template>
  <div class="user-container">
    <div class="row-between mb32">
      <div class="flex">
        <el-button size="small" type="primary" icon="el-icon-plus"
          >新增</el-button
        >
        <el-button size="small">删除</el-button>
      </div>
      <div>
        <el-input placeholder="输入关键词搜索">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>

    <el-table :data="list" class="ranking_table">
      <el-table-column type="selection" align="center" />

      <el-table-column width="234" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="183" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="付款订单总数" width="167">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="付款金额" width="194">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="167" label="订单均价">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="231" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近消费时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template>
          <div class="operate">
            <el-button type="text">编辑</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      style="font-weight: bold"
    >
      <el-form
        ref="dataForm"
        class="flex"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
      >
        <div
          style="
            width: 300px;
            height: 300px;
            background: #fafafa;
            margin-right: 60px;
          "
        >
          <el-form-item prop="">
            <div class="row-start mb40">
              <image-upload />
            </div>
          </el-form-item>
          <span class="el-upload__tip"
            >上传750*540px，JPG，PNG，JPEG格式的图片， 图片小于1M</span
          >
        </div>

        <div style="margin-top: 5px">
          <el-form-item label="用户名" prop="type">
            <el-input v-model="temp.type" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="temp.telephone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="title">
            <el-input v-model="temp.title" placeholder="请输入邮箱" />
          </el-form-item>
        </div>
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

    <pagination
      class="underpart"
      v-if="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  components: {
    ImageUpload,
    Pagination,
  },

  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        keyWord: "",
      },
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
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  padding: 40px 40px 52px;
  background: #ffffff;

  .underpart {
    padding: 52px 0;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #525252;
  line-height: 48px;
}

::v-deep .el-input__inner {
  width: 500px;
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
}
</style>
