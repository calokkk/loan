<template>
  <div class="container">
    <nav-bar title="进度">
      <span slot="left" @click="$router.back()">返回</span>
    </nav-bar>
    <div>
      <div class="process">
        <div v-if="state===0">
          <van-loading type="spinner" size="50px" color="#00f" />
          <p>审核中，请稍等片刻</p>
        </div>
        <div v-else-if="state===1">
          <img src="/static/img/shalou.gif" alt class="shalou" />
          <p>审核通过，正在提现中</p>
        </div>
        <div v-else>
          <van-empty image="error" description="请求错误" />
        </div>
        <van-button type="info" size="large" round @click="$router.push({path:'/bigData'})">加速提现进度</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { Loading, Empty, Button } from "vant";
// 查询数据库中是否存在‘审核中’的数据，设置定时器，三秒后更新为‘提现中’，渲染到前端
export default {
  components: {
    NavBar,
    [Loading.name]: Loading,
    [Empty.name]: Empty,
    [Button.name]: Button
  },
  data() {
    return {
      state: 0, //0：审核中  1：提现中  2：完成
      userInfo: this.$cookies.get("userInfo")
    };
  },
  methods: {
    async getLoanRecord() {
      const { data: res } = await this.$https.post("/users/loanRecord", {
        username: this.userInfo.username
      });
      this.state = res.data[0].state;
      return res.data[0];
    },
    async updateRecordState(info) {
      const { data: res } = await this.$https.post("/users/updateRecordState", {
        info: info
      });
      if (res.code === 200) {
        this.state = 1;
      }
    }
  },
  created() {
    this.getLoanRecord().then(res => {
      setTimeout(() => {
        this.updateRecordState(res);
      }, 3000);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  .process {
    font-size: 16px;
    font-weight: bolder;
    padding: 10px;
    .loading {
      width: 64px;
      height: 64px;
    }
    .shalou {
      width: 177px;
      height: 100px;
    }
  }
}
</style>