<template>
  <div class="container-box contact-box">
    <div class="search-box row-between">
      <router-link :to="'/comp/ad-edit'">
        <el-button type="primary" size="small" icon="el-icon-plus">
        新增
        </el-button>
    </router-link>
      <div class="search-right" style="align-items: center;display: flex;">
        <el-input
          v-model="listQuery.title"
          placeholder="标题"
          style="width: 200px"
          class="mr20"
          @keyup.enter.native="handleFilter"
        />
        <el-button size="small" type="primary">
          搜索
        </el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" class="panel_table">
        <el-table-column prop="day" label="日期" />
        <el-table-column prop="paview" label="访问量" />
        <el-table-column prop="visitor" label="访客数"/>
        <el-table-column prop="user" label="新增用户"/>
        <el-table-column prop="time" label="支付人数"/>
        <el-table-column prop="usum" label="累计支付人数"/>
      </el-table>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      ruleForm: {},
      listQuery:{},
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-box {
  padding: 3.234% 3.234% 8.626%;
  overflow: hidden;
  min-height: 1000px;
  box-sizing: border-box;

  .iframe-content {
    width: 24.69%;
    height: 100%;
    max-height: 550px;
    background: #536187;
    border-radius: 40px;
    margin-right: 3.234%;
    position: static;
  }

  .right-card {
    flex: 1;
    height: calc(100% - 20px);
    padding: 40px 40px 0;
    margin: 0 24px 20px 0;
    background: #fcfcfc;

    .but-b {
      margin-top: 60px;
    }
  }
}

::v-deep .el-form-item__label {
font-size: 16px;
font-weight: 400;
}

</style>
