<template>
  <div class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  height: 65px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-pagination {
    padding-left: 43px;
    color: #333333;
    padding: 0;
    span {
      font-size: 14px;
    }
    ::v-deep {
      .el-pagination__total {
        font-size: 14px;
        margin-right: 24px;
      }
      .el-pager li,
      .btn-prev,
      .btn-next {
        margin: 0 10px 0 0;
        padding: 0;
        width: 32px;
        height: 32px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        color: #333333;
        font-size: 14px;
        background-color: #fff;
      }

      .el-pagination__total,
      .el-pagination__jump {
        height: 32px;
        line-height: 32px;
        margin-left: 14px;
      }

      .el-input {
        margin: 0;
        width: 87px;
        height: 32px;
        .el-input__inner {
          padding-right: 32px;
          border-radius: 4px;
          height: 32px;
          color: #333333;
        }
      }

      .el-pagination__editor {
        width: 60px;
        text-align: center;
        margin: 0 6px;

        .el-input__inner {
          padding: 0;
        }
      }

      .el-icon {
        color: #d9d9d9;
        font-size: 14px;
      }
    }
  }
}
</style>
