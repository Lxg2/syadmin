<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <div class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper row">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <!-- <span>HI,姚一亿</span> -->
        </div>
      </div>
      <div
        class="right-menu-item row-center"
        style="cursor: pointer"
        @click="logout"
      >
        <!-- <svg-icon icon-class="guide" /> -->
       <div style="display: flex;align-items: center;">
          <span>退出登录</span><svg-icon style="font-size:20px" icon-class="outlog"/>
       </div>
        <!-- <i class="el-icon-thumb">退出登录</i> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "./Breadcrumb";
import Hamburger from "./Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 76px;
  overflow: hidden;
  position: relative;
  padding: 0 36px 0 32px;
  background: #fff;
  .hamburger-container {
    line-height: 76px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    padding: 0 !important;
    margin-right: 12px;
    -webkit-tap-highlight-color: transparent;
  }

  .breadcrumb-container {
    float: left;
    line-height: 76px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      line-height: 76px;
      font-size: 18px;
      color: #333333;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .avatar-container {
      margin-right: 53px;

      .avatar-wrapper {
        position: relative;
        font-size: 18px;
        color: #333333;

        .user-avatar {
          cursor: pointer;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
