<template>
    <div class="right-card edit-box flex1">
      <div style="max-height: 80%;overflow-y: scroll;">
        <div class="card-items">
          <div v-for="o in 1" :key="o" class="card-item row-between">
            <img src="https://t11.baidu.com/it/u=3210116116,2698637809&fm=58" />
            <div class="item-right flex1">
              <div class="name">冷芬满</div>
              <div class="btn-box row-between">
                <span>创始人</span>
                <div class="operate">
                  <el-button type="text">编辑</el-button>
                  <span class="line">|</span>
                  <el-button type="text">删除</el-button>
                </div>
              </div>
              <div class="explain">南昌大学法学学士，深腾数字科技创始人。</div>
            </div>
          </div>
        </div>
        <!-- 添加企业高管 -->
        <el-dialog
          title="新增公司高管"
          :visible.sync="dialogVisible"
          width="1080px"
          :before-close="handleClose"
        >
          <div class="flex mb20">
            <image-upload>
              <span>上传400*400px，JPG，PNG，JPEG格式的图片，图片小于1M</span>
            </image-upload>
            <el-form
              label-width="60px"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="flex1"
            >
              <el-form-item label="姓名">
                <el-input v-model="ruleForm.name" placeholder="请输公司高管姓名" />
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="ruleForm.address" placeholder="担任职位" />
              </el-form-item>
              <el-form-item label="简介">
                <el-input
                  v-model="ruleForm.telephone"
                  type="textarea"
                  placeholder="个人简介"
                />
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-button class="but-b" icon="el-icon-plus" @click="dialogVisible = true"
      >添加公司高管</el-button
      >
</div>
</template>


<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      ruleForm: {},
      dialogVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: ["change", "blur"],
          },
        ],
        address: [
          {
            required: true,
            message: "请输入公司地址",
            trigger: ["change", "blur"],
          },
        ],
        telephone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.edit-box{
  position: relative;
}
.right-card {
  height: 100%;
  padding: 40px 35px 4.556%;
  margin: 0 24px 20px 0;
  background: #fcfcfc;
  .card-items {
    min-height: 90%;
    overflow-y: auto;
    .card-item {
      width: 100%;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 10px;
      padding: 24px 25px;
      margin-bottom: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        margin-right: 21px;
      }
      .name {
        font-size: 24px;
        color: #282b32;
        line-height: 24px;
        margin-bottom: 14px;
      }
      .btn-box {
        margin-bottom: 25px;
        span {
          font-size: 18px;
          color: #282b32;
          line-height: 17px;
        }
        
        .el-button--text {
          padding: 0;
          height: 18px;
          font-size: 16px;
          color: #096bed;
        }
      }
      .explain {
        font-size: 14px;
        color: #999999;
        line-height: 15px;
      }
    }
  }
  .but-b {
    width: 92%;
    color: #096bed;
    border: 1px solid #096bed;
    margin: 30px 35px;
  }
}
::v-deep {
  .el-upload--picture-card {
    width: 300px;
    height: 300px;
  }
  .el-upload__tip {
    width: 300px;
    line-height: 21px;
    padding: 24px 20px 0 10px;
  }
}
.el-form {
  margin-left: 70px;
  ::v-deep .el-textarea__inner {
    height: 168px;
  }
}

</style>
