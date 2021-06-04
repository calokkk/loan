<template>
  <div class="page">
    <nav-bar title="个人">
      <!-- <van-icon name="setting-o" slot="right" size="20px"/> -->
    </nav-bar>
    <div class="user-info">
      <div class="avatar">
        <img src="@/assets/logo.png" alt />
      </div>
      <div class="info">
        <p class="phone">{{userInfo.username}}</p>
        <!-- <p style="color:blue;font-size:14px;text-decoration:underline">实名认证提额</p> -->
      </div>
    </div>
    <div class="menu">
      <van-grid :column-num="2">
        <van-grid-item
          v-for="menu in menuList"
          :key="menu.label"
          @click="$router.push({path:menu.path,query:{url:menu.url}})"
        >
          <img :src="menu.imgUrl" />
          <p>{{menu.label}}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="logout">
      <van-button type="primary" size="large" color="#229999" plain @click="logout">退出登录</van-button>
    </div>
    <van-loading color="#1989fa" size="50" vertical v-show="loading" class="loading">退出中</van-loading>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { Grid, GridItem, Icon, Button, Loading } from "vant";
export default {
  components: {
    NavBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Loading.name]: Loading
  },
  created(){
    let userinfo=this.$cookies.get('userInfo')

  },
  data() {
    return {
      menuList: [
        // { label: "我的钱包", imgUrl: require("@/assets/profile/qianbao.png") },
        {
          label: "借款进度",
          imgUrl: require("@/assets/profile/jindu.png"),
          path: "/process",
          url: ""
        },
        {
          label: "借款记录",
          imgUrl: require("@/assets/profile/jilu.png"),
          path: "/bigdata",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        }
      ],
      userInfo:this.$cookies.get('userInfo'),
      loading: false
    };
  },
  methods: {
    async logout() {
      this.loading = true;
      const { data: res } = await this.$https.post("/users/logout");
      if (res.code === 200) {
        this.loading = false;
        this.$router.replace({ path: "/login" });
      }
    }
  }
};
</script>

<style lang='less' scoped>
.user-info {
  display: flex;
  flex-wrap: nowrap;
  padding: 8px;
  background-color: #fff;

  .avatar img {
    width: 80px;
    height: 80px;
    border: 1px solid gray;
    border-radius: 50%;
  }

  .info {
    text-align: left;
    padding-left: 30px;
    .phone {
      font-size: 22px;
      font-weight: bolder;
    }
  }
}

.menu {
  width: 96%;
  margin: 0 auto;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  img {
    width: 30px;
    height: 30px;
  }
}

.logout {
  width: 96%;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 10px;
}
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
</style>