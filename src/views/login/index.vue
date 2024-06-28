<template>
  <div class="login-container">
    <div class="login-box row-center">
      <div class="company-profile">
        <div class="name mb24">石岩街道虚拟园区</div>
        <div class="explain">数字化管理-助力企业数字化转型</div>
        <svg-icon icon-class="3d" style="font-size: 380px;" />
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="welcome">您好，欢迎回来</div>
        <div class="title">登录您的账号</div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="users"/>
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入你的账号"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="userpwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.userpwd"
            :type="passwordType"
            placeholder="请输入账号密码"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能为空且长度不能小于6"));
      } else {
        callback(); 
      }
    };
    return {
      loginForm: {
        username: "",
        userpwd: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        userpwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
              this.$notify({
              title: '登录成功',
              message: '欢迎回来！',
              type: 'success'
            });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100%;
  width: 100%;
  background-color: #e4eff9;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 1100px;
    height: 550px;
    box-sizing: border-box;
    max-width: 100%;
    margin: 0 auto;
    .company-profile {
      width: 49%;
      color: #fff;
      height: 100%;
      box-sizing: border-box;
      background-color: #096bed;
      padding: 5.945% 0 0;
      text-align: center;
      .name {
        height: 38px;
        font-size: 35px;
        font-weight: bold;
      }

      .explain {
        height: 24px;
        font-size: 24px;
        margin-bottom: 20px;
      }
    }

    .login-form {
      overflow: hidden;
      box-sizing: border-box;
      height: 100%;
      flex: 1;
      padding: 5.656% 6.945% 5.3%;
      background-color: #fff;
      .welcome {
        height: 20px;
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #999999;
        margin-bottom: 12.167%;
      }
      .title {
        height: 29px;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #333333;
        margin-bottom: 30px;
      }

      ::v-deep .el-form-item {
        margin-bottom: 20px;
        .el-form-item__content {
          height: 64px;
          line-height: 64px;
          background: #fafafa;
          padding: 22px 21px;
          display: flex;
          align-items: center;
          .el-input__inner {
            background-color: inherit;
            border: none;
            height: 100%;
            line-height: 64px;
            padding: 0;
          }
        }
      }

      .svg-container {
        font-size: 20px;
        margin-right: 22px;
        display: flex;
        align-items: center;
        color: #b6c2cd;
      }

      .el-button--primary {
        margin-top: 18.333%;
        height: 64px;
        width: 100%;
        font-size: 16px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 21px;
    top: 22px;
    bottom: 22px;
    font-size: 20px;
    color: #b6c2cd;
    cursor: pointer;
    user-select: none;
    display: flex;
  }

  .copyright {
    height: 13px;
    font-size: 12px;
    font-family: PingFang SC;
    color: #707480;
    margin-top: 3.75%;
    text-align: center;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
