<template>
  <div class="add-container">
    <div class="upper-part mb20">
      <div class="title">规格信息</div>
      <el-form
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        class="flex1"
      >
        <el-form-item label="规格名称">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入规格名称（必填）"
          />
        </el-form-item>

        <el-form-item label="备注说明">
          <el-input
            type="textarea"
            :rows="3"
            v-model="ruleForm.explain"
            maxlength="500"
            show-word-limit
            placeholder="请填写备注,最多500字"
          ></el-input>
        </el-form-item>

        <el-form-item label="规格排序">
          <el-select v-model="ruleForm.region" placeholder="请选择规格排序">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>

        <span class="title mr24">规格值</span>
        <el-button type="primary" size="small" icon="el-icon-plus"
          >新增</el-button
        >
      </el-form>

      <!-- 新增规格值 -->
      <el-table :data="list" fit highlight-current-row style="width: 100%">
        <el-table-column type="selection" align="center" />

        <el-table-column prop="colortext" width="680" label="规格值" />

        <el-table-column label="图片">
          <template>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt=""
            /></el-dialog>
          </template>
        </el-table-column>

        <el-table-column align="center" width="160" label="操作">
          <div class="operate">
            <el-button type="text">详情</el-button>
            <span class="line">|</span>
            <el-button type="text">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="under-part">
      <el-button plain>取 消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        explain: "",
        region: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        explain: [
          { required: true, message: "请填写备注,最多500字", trigger: "blur" },
        ],
        region: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格排序",
            trigger: "change",
          },
        ],
      },
      list: [
        {
          colortext: "蓝色",
        },
        {
          colortext: "粉色",
        },
      ],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.add-container {
  font-family: Microsoft YaHei;

  .upper-part {
    padding: 40px 40px 112px;
    background: #ffffff;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      line-height: 54px;
    }
  }

  .under-part {
    padding: 26px 0 26px 102px;
    background: #ffffff;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 54px;
}

::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  line-height: 54px;
}

::v-deep .el-input--medium {
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  line-height: 54px;
}

::v-deep .el-upload--picture-card {
  width: 48px;
  height: 48px;
  line-height: 51px;
  border: 1px solid #dddddd;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 48px;
  height: 48px;
  border: 1px solid #dddddd;
}

::v-deep .el-table th {
  height: 44px;
  justify-content: flex-start;
  align-items: center;
  background: #f8f8f8;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

::v-deep .el-table__body tr.current-row > td {
  background: #ffffff;
  border: none;
}
::v-deep .el-table .cell {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
</style>