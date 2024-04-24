<template>
  <div class="search-box row-between">
    <slot />
    <div class="search-right">
      <el-input
        v-model="keyWord"
        placeholder="输入关键词搜索"
        style="width: 360px"
        @keyup.enter.native="handleSearch"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i
      ></el-input>
      <el-button
        size="small"
        type="primary"
        class="ml40"
        @click="handleAdd"
        icon="el-icon-plus"
      >
        {{ btnText }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabSearchBox",
  props: {
    routerName: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "新增",
    },
  },
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    handleSearch() {
      this.$emit("handleSearch", this.keyWord);
    },
    handleAdd() {
      this.$router.push({ name: this.routerName });
    },
  },
};
</script>

<style lang="scss" scoped></style>
