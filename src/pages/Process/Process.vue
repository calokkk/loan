<template>
  <div class="container">
    <nav-bar title="进度查询">
      <span slot="left" @click="$router.back()">返回</span>
    </nav-bar>
    <div class="list-wrapper" ref="container">
      <van-sticky :container="container" :offset-top="50">
        <van-row class="list-title">
          <van-col span="10">贷款时间</van-col>
          <van-col span="5">贷款金额</van-col>
          <van-col span="4">期数</van-col>
          <van-col span="5">贷款进度</van-col>
        </van-row>
      </van-sticky>
      <van-list style="margin-top:3px">
        <div v-if="loanRecordList.length>0">
          <div v-for="(item,index) in loanRecordList" :key="index" class="row">
            <van-row>
              <van-col span="10">{{item.date}}</van-col>
              <van-col span="5">{{item.money}}</van-col>
              <van-col span="4">{{item.qishu}}</van-col>
              <van-col
                span="5"
              >{{item.state==0?'审核中':item.state==1?'提现中':item.state==2?'通过':'null'}}</van-col>
            </van-row>
          </div>
        </div>
        <div v-else style="font-size:16px;font-weight:600;padding-top:30px">暂无记录</div>
      </van-list>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { Sticky, List, Row, Col } from "vant";
export default {
  components: {
    NavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [Row.name]: Row,
    [Col.name]: Col
  },

  data() {
    return {
      container: null,
      loanRecordList: [],
      userInfo: this.$cookies.get("userInfo")
    };
  },
  methods: {
    // 获取贷款记录
    async getLoanRecord() {
      const { data: res } = await this.$https.post("/users/loanRecord", {
        username: this.userInfo.username
      });
      if (res.code === 200) {
        this.loanRecordList = res.data;
      }
      console.log(res);
    }
  },
  mounted() {
    this.container = this.$refs.container;
  },
  created() {
    this.getLoanRecord();
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 0px;
}
.list-wrapper {
  //   flex: 1;
  height: 900px;
  background-color: #fff;
  overflow: scroll;
  padding: 0;
  margin: 0;
  .list-title {
    height: 50px;
    font-weight: 600;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.2px solid rgb(214, 214, 214);
  }
  .row {
    height: 50px;
    line-height: 50px;
  }
  .row:nth-child(odd) {
    background-color: #ebeef5;
  }
  .row:nth-child(even) {
    background-color: #fff;
  }
}
</style>