<template>
  <div class="container">
    <nav-bar title="登录"></nav-bar>
    <div class="login-box">
      <van-tabs
        type="card"
        color="#07c160"
        @click="selectType"
        v-model="type"
        style="margin-bottom:10px"
      >
        <van-tab title="登录" name="login"></van-tab>
        <van-tab title="注册" name="register"></van-tab>
      </van-tabs>
      <van-field v-model="userInfo.username" type="text" label="用户名:" />
      <div style="position:relative">
        <van-field v-model="userInfo.password" type="password" label="密码:" />
        <van-button
          type="primary"
          round
          plain
          size="small"
          class="getCode"
          :disabled="!cd[type]==null||!cd[type]==0"
          @click="getCode"
        >{{!cd[type]?'发送验证码':`${cd[type]}s`}}</van-button>
      </div>
      <!-- <van-button type="primary"  round size="large">获取验证码</van-button> -->
      <van-field v-model="userInfo.password1" type="password" label="确认密码:" v-if="type==1" />
      <van-button
        type="primary"
        plain
        round
        size="large"
        style="margin-top:10px"
        @click="login"
      >{{type=='login'?'登录':'注册'}}</van-button>
    </div>
    <van-loading color="#1989fa" size="50" vertical v-show="loading" class="loading">正在登录</van-loading>
  </div>
</template>

<script>
// 验证码直接登录 存在则进行注册，否则登录
import NavBar from "@/components/NavBar/NavBar";
import { Field, Button, Tabs, Tab, Toast, Loading } from "vant";
export default {
  components: {
    NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Toast.name]: Toast,
    [Loading.name]: Loading
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      type: 'login', //0：登录 ， 1：注册
      loading: false,
      cd: {
        login:null,
        register:null
      }, //验证码倒计时
      timer: {
        login:null,
        register:null
      }
    };
  },
  methods: {
    //选择登录 or 注册
    selectType(index) {
      this.type = index; 
    },
    // 登录请求
    async login() {
      // 判断是否为空
      if (
        !this.userInfo.username.trim() ||
        this.userInfo.password.length == 0
      ) {
        this.$toast("用户名或者密码不能为空");
        return;
      }
      this.loading = true;
      const { data: res } = await this.$https.post("/users/login", {
        userInfo: this.userInfo
      },{headers:{'asd':'asd'}});
      console.log(res);

      if (res.code === 200) {
        this.loading = false;
        this.$router.replace({ path: "/" });
      }
      this.loading = false;
      this.$toast(res.msg);
    },
    // 获取验证码
    getCode() {
      this.cd[this.type] = 10;
      // clearInterval(this.timer[this.type])
      this.timer[this.type] = setInterval(() => {
        if (this.cd[this.type] > 0) {
          this.cd[this.type]--;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(135deg, rgb(232, 247, 245), #fff);
  .login-box {
    width: 90%;
    // height: 250px;
    overflow: hidden;
    border-radius: 15px;
    background-color: #fff;
    border: 1px solid gray;
    box-shadow: 1px 1px 3px rgb(68, 70, 67);
    box-sizing: border-box;
    padding: 20px 8px 20px 8px;
    /deep/ .van-cell__title span {
      font-size: 14px;
      font-weight: bolder;
    }
    /deep/ input {
      border-bottom: 0.5px solid gray;
    }
    .getCode {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-70%);
    }
  }
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>