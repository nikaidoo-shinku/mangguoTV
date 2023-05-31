<template>
  <div class="login">
    <!-- 头部区域 -->
    <div class="head">
      <div class="iconfont icon-jiantou up" @click="toback"></div>
      <div class="title">登录</div>
    </div>
    <!-- logo -->
    <div class="logo">
      <img src="../assets/img/logo.8a69aa86.png" alt="" />
    </div>
    <!-- 登录 -->
    <div class="signIn">
      <div class="mess">
        <form>
          <div class="mobile">
            <input type="text" placeholder="请输入账号" v-model="userName" />
          </div>
          <div class="code">
            <input
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
              v-model="passWord" />
            <!-- <div class="getCode">获取校验码</div> -->
          </div>
        </form>
      </div>
      <div class="login">
        <div class="loginBtn" v-show="!loginShow">登录</div>
        <div class="loginBtn active" v-show="loginShow" @click="loginTo">
          登录
        </div>
      </div>
    </div>
    <!-- 账号密码登录 -->
    <div class="userNameLogin">
      <!-- <span>账号密码登录</span> -->
    </div>
    <!-- 协议 -->
    <div class="agreement">
      <div class="mess">
        登录过程中会用到短信，请注意您的手机提示，我们将保护您个人手机号信息
      </div>
      <div class="agree">
        <div class="btn" @click="toAgree">
          <div class="agreeBtn" v-show="loginShow">
            <span>✔</span>
          </div>
        </div>
        <span class="agr">同意</span>
        <span class="itemFs">《个人信息保护政策》</span>
        <span>和</span>
        <span class="itemSd">《服务协议》</span>
      </div>
    </div>
    <!-- 其他登录方式 -->
    <div class="otherLogin">
      <div class="tip">
        <div class="line"></div>
        <div class="text">其他登录方式</div>
        <div class="line"></div>
      </div>
      <div class="loginList">
        <div>
          <img
            src="https://static.hitv.com/m/_next/static/media/sina.6715389d.svg"
            alt="" />
        </div>
        <div>
          <img
            src="https://static.hitv.com/m/_next/static/media/qq.1c9c126a.svg"
            alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getLogin } from "@/api/login.js";

  export default {
    data() {
      return {
        userName: "",
        passWord: "",
        loginShow: false,
      };
    },
    methods: {
      // 返回上一页
      toback() {
        this.$router.back();
      },
      // 同意协议
      toAgree() {
        this.loginShow = !this.loginShow;
      },
      // 登录
      loginTo() {
        this.getLoginData(this.userName, this.passWord);
      },
      // 登录验证接口
      getLoginData(userName, passWord) {
        getLogin({ username: userName, password: passWord }).then((data) => {
          console.log(document.cookie);
          console.log(data.data.userInfo);
          if (data.data.userInfo) {
            window.localStorage.setItem("token", document.cookie);
            this.$toast.success("登录成功");
            this.$router.push("userInfos");
          } else {
            this.$toast.fail("登录失败");
          }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .login {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    background: url("../assets/img/corner.1e1260a.png") no-repeat 100% 0;
    background-size: 136px 160px;

    .head {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      color: rgb(102, 102, 102);

      .up {
        width: 22px;
        height: 44px;
        font-size: 22px;
        line-height: 44px;
      }

      .title {
        flex: 1;
        height: 44px;
        text-align: center;
        line-height: 44px;
        font-weight: 700;
      }
    }

    .logo {
      width: 100%;
      height: 36px;
      box-sizing: border-box;
      margin-top: 12px;
      margin-bottom: 20px;
      padding-left: 30px;

      img {
        height: 100%;
      }
    }

    .signIn {
      width: 100%;
      height: 172px;

      .mess {
        width: 100%;
        height: 118px;
        box-sizing: border-box;
        padding-left: 30px;

        .mobile {
          width: 100%;
          height: 48px;
          box-sizing: border-box;
          padding-right: 30px;
          border-bottom: 1px solid rgb(245, 245, 245);
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          input {
            width: 100%;
            height: 20px;
            font-size: 15px;
            line-height: 20px;
            color: #757575;
          }
        }

        .code {
          width: 100%;
          height: 48px;
          box-sizing: border-box;
          padding-right: 30px;
          border-bottom: 1px solid rgb(245, 245, 245);
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          input {
            flex: 1;
            height: 20px;
            font-size: 15px;
            line-height: 20px;
            color: #757575;
          }

          .getCode {
            width: 95px;
            height: 100%;
            font-size: 15px;
            line-height: 48px;
            color: rgb(255, 95, 0);
          }
        }
      }

      .login {
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: center;
        margin-top: 10px;

        .loginBtn {
          width: 84%;
          height: 44px;
          background-color: rgb(248, 248, 248);
          border-radius: 22px;
          text-align: center;
          line-height: 44px;
          color: rgb(187, 187, 187);

          &.active {
            background-image: linear-gradient(
              270deg,
              rgb(247, 171, 28),
              rgb(250, 97, 97) 52%,
              rgb(255, 95, 0)
            );
            color: #fff;
          }
        }
      }
    }

    .userNameLogin {
      width: 100%;
      height: 45px;
      margin-top: 10px;
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 14px;
        color: rgb(102, 102, 102);
        text-decoration: underline;
      }
    }

    .agreement {
      width: 100%;
      height: 63px;
      box-sizing: border-box;
      padding-left: 30px;
      padding-right: 30px;
      color: rgb(153, 153, 153);

      .mess {
        width: 125%;
        font-size: 12.5px;
        transform-origin: top left;
        transform: scale(0.8);
      }

      .agree {
        width: 100%;
        height: 15px;
        font-size: 12px;
        margin-top: 13px;
        display: flex;
        align-items: center;

        .btn {
          width: 8px;
          height: 8px;
          border: 2px solid rgb(187, 187, 187);
          border-radius: 50%;
          margin-right: 5px;
          position: relative;

          .agreeBtn {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ff5f00;
            position: absolute;
            top: 0%;

            span {
              font-size: 12px;
              transform-origin: top;
              transform: scale(0.7);
              color: #fff;
              position: absolute;
              top: -2px;
            }
          }
        }

        .agr {
          margin-right: 5px;
        }

        .itemFs,
        .itemSd {
          color: rgb(102, 102, 102);
          text-decoration: underline;
        }
      }
    }

    .otherLogin {
      width: 100%;
      height: 99px;
      margin-top: 40px;

      .tip {
        width: 100%;
        height: 19px;
        font-size: 14px;
        display: flex;
        align-items: center;

        .line {
          flex: 1;
          border-bottom: 1px solid rgb(245, 245, 245);
        }

        .text {
          height: 100%;
        }
      }

      .loginList {
        width: 100%;
        height: 72px;
        display: flex;
        justify-content: center;
        margin-top: 8px;

        div {
          width: 72px;
          height: 72px;
          margin-right: 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
