<template>
  <div class="pub-container">
    <div class="head">
      <el-button class="mb24 el-icon-plus" style="width: 144px" size="small">
        上传资料</el-button
      >
      <span class="ml20">支持批量上传</span>
    </div>

    <el-select v-model="region" placeholder="请选择资料" style="width: 98%">
      <el-option label="活动照片" value="1"></el-option>
      <el-option label="场地照片" value="2"></el-option>
    </el-select>

    <div class="main mt30">
      <!-- 列表 -->
      <el-table :data="tableData" class="tab-box">
        <el-table-column type="selection" align="center" />
        <el-table-column prop="filename" label="文件名">
          <template slot-scope="scope">
            <div class="flex">
              <el-image class="thumb" />
              <div class="content-box">
                <span class="onelines">{{ scope.row.filename }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="所属分类" width="310">
        </el-table-column>

        <el-table-column prop="address" label="状态" width="400">
          <el-progress
            :percentage="35"
            status="success"
            color="#02DE83"
          ></el-progress>
        </el-table-column>

        <el-table-column align="center" label="操作" width="170">
          <div class="operate flex">
            <el-button type="text" size="mini" @click="dialogClassify = true"
              >分类</el-button
            >
            <el-button type="text" size="mini" @click="dialogVisible = true"
              >重名命</el-button
            >
            <el-button type="text" size="mini">删除</el-button>
          </div>
        </el-table-column>
      </el-table>

      <!-- 重命名弹框 -->
      <el-dialog
        title="重命名"
        :visible.sync="dialogVisible"
        width="640px"
        :before-close="handleClose"
      >
        <div class="dialog-box flex">
          <el-input v-model="newname" placeholder="请输入新的文件名" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </el-dialog>

      <!-- 选择分类弹框 -->
      <el-dialog
        title="选择分类"
        :visible.sync="dialogClassify"
        width="640px"
        :before-close="handleClassify"
      >
        <div class="dialog-box flex">
          <el-select v-model="classify" placeholder="请选择分类">
            <el-option label="活动照片" value="activity"></el-option>
            <el-option label="年会照片" value="feast"></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClassify">取 消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="btn-box row-center">
      <el-button class="mr24">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      region: "",
      allChecked: false,
      tableData: [
        {
          filename: "2022年12月汕头团建活动照片1.png",
          name: "活动照片",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          filename: "小程序需求文档.word",
          name: "活动照片",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          filename: "2022年12月汕头团建活动照片1.png",
          name: "活动照片",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          filename: "小程序需求文档.word",
          name: "活动照片",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      newname: "",
      classify: "",
      dialogVisible: false,
      dialogClassify: false,
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "完成" : `${percentage}%`;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClassify() {
      this.dialogClassify = false;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.pub-container {
  width: 100%;
  padding: 40px 40px 60px;
  background: #ffffff;
  font-family: Microsoft YaHei;

  .head {
    span {
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      line-height: 54px;
    }
  }

  .main {
    width: 98%;
    border: 1px solid #dddddd;
    padding: 33px;

    .tab-box {
      .flex {
        .thumb {
          width: 32px;
          height: 32px;
          background: #ffcf3d;
          border-radius: 8px;
          margin-right: 18px;
        }
        .content-box {
          flex-direction: column;
          justify-content: flex-start;

          .onelines {
            font-size: 16px;
            font-weight: 400;
            color: #333333;
            line-height: 26px;
          }
        }
      }
    }
  }

  .btn-box {
    margin-top: 60px;
    .el-button {
      width: 240px;
      height: 48px;
    }
  }

  .dialog-box {
    margin-bottom: 64px;
  }
}

::v-deep .operate .el-button {
  color: #2060e3;
}

::v-deep .el-table th {
  padding: 0;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  background: #f8f8f8;
}
::v-deep .el-table__body {
  tr {
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
}
::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}

::v-deep .el-table th.is-leaf,
.el-table td {
  border-bottom: 0;
}
</style>