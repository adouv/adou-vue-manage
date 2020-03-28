<template>
  <div class="ad-login">
    <div class="main">
      <div class="main-header">
        <div class="logo">
          <img src="../assets/logo-four.png" />
          <span>MengCheng</span>
        </div>
        <h1 class="main-title">登录&nbsp;&nbsp;MengCheng</h1>
        <p>MengCheng&nbsp;&nbsp;通用管理系统</p>
      </div>
      <div class="main-body">
        <a-form>
          <!---->
          <a-form-item>
            <a-input placeholder="请输入用户名" v-model="params.UserName">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <!---->
          <a-form-item>
            <a-input placeholder="请输入密码" v-model="params.UserPwd">
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <!---->
          <a-form-item>
            <a-input placeholder="请输入验证码">
              <a-icon slot="prefix" type="barcode" />
              <template slot="addonAfter">
                <img src="http://demo.admui.com/captcha" />
              </template>
            </a-input>
          </a-form-item>
          <!---->
          <a-form-item>
            <a-checkbox>记住我</a-checkbox>
            <a class="login-form-forgot" href>忘记密码</a>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              @click="btnLoginHandller();"
            >登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import publicEnum from "../enum/public.enum";
import adSystemUserService from "../service/adSystemUserService";
export default {
  name: "AdLoginComponent",
  data() {
    return {
      params: {
        UserName: "Administrator",
        UserPwd: "111111"
      }
    };
  },
  methods: {
    btnLoginHandller() {
      adSystemUserService.SystemUserLogin(this.params).then(response => {
        if (response) {
          if (response.UserStatus === 0) {
            this.$message.warning("用户已禁用,请联系管理员");
          } else {
            this.local$.removeItem(publicEnum.AD_LOCAL_USER_INFO);
            this.local$.setItem(
              publicEnum.AD_LOCAL_USER_INFO,
              JSON.stringify(response)
            );
            this.$message.info("登录成功");
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }
        } else {
          this.$message.error("登录失败,账号或密码错误");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-login {
  height: 100vh;
  min-height: 100%;
  background: url("../assets/images/login.jpg") no-repeat center;
  background-size: cover;
  .main {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 470px;
    height: 100%;
    min-height: 100%;
    margin: 0 auto auto auto;
    background: #fff;
    padding: 100px 50px 20px 50px;
    .main-header {
      padding-bottom: 20px;
      .logo {
        display: flex;
        align-items: center;
        img {
          margin: 0 auto;
          display: block;
          width: 64px;
          height: 64px;
        }
        span {
          display: none;
          flex: 1;
          font-size: 25px;
          font-weight: bold;
        }
      }

      .main-title {
        padding-top: 100px;
        font-size: 15px;
        color: #333;
      }
      p {
        font-size: 12px;
      }
    }
    .main-body {
      background: #fff;
      border-radius: 10px;
      .ant-form-item {
        img {
          height: 30px;
          cursor: pointer;
        }
      }
      .login-form-forgot {
        float: right;
      }
      .login-form-button {
        width: 100%;
      }
    }
  }
}
@media (max-width: 700px) {
  .ad-login {
    .main {
      width: 100%;
      padding-top: 50px;
      padding-left: 20px;
      padding-right: 20px;
      .main-header {
        padding-bottom: 40px;
        .logo {
          span {
            display: block;
          }
        }
        .main-title,
        p {
          display: none;
        }
      }
    }
  }
}
@media (max-height: 500px) {
  .ad-login {
    .main {
      width: 100%;
      padding-top: 10px;
      .ant-form-item {
        margin-bottom: 10px;
      }
      .main-header {
        padding-bottom: 10px;
        .logo {
          span {
            display: block;
          }
        }
        .main-title,
        p {
          display: none;
        }
      }
    }
  }
}
</style>