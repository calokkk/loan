<template>
  <div class="container">
    <nav-bar title="信用认证">
      <span @click="$router.push({path:'/home'})" slot="left">返回</span>
    </nav-bar>
    <div class="circle">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        size="140px"
        color="#17c170"
        layer-color="rgb(245, 247, 248)"
        :text="text"
        :stroke-width="60"
      />
    </div>
    <van-grid :column-num="3">
      <!-- :style="{'pointer-events':step[index]?'none':''}" -->
      <van-grid-item
        v-for="(menu,index) in menuList"
        :key="menu.label"
        @click="$router.push({path:menu.path,query:{url:menu.url}})"
      >
        <img :src="menu.imgUrl" />
        <p>{{menu.label}}</p>
        <van-tag type="primary" size="medium" v-if="step[index]==1">验证成功</van-tag>
        <van-tag type="primary" size="medium" v-if="!step[index]" plain>填写信息</van-tag>
      </van-grid-item>
    </van-grid>
    <van-button
      type="info"
      size="large"
      style="width:90%;margin:0 auto;margin-top:30px"
      @click="submit"
    >立即提现</van-button>
  </div>
</template>

<script>
import { Circle, Grid, GridItem, Tag, Button } from "vant";
import NavBar from "@/components/NavBar/NavBar";
export default {
  components: {
    NavBar,
    [Circle.name]: Circle,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  data() {
    return {
      currentRate: 50,
      rate: 90,
      menuList: [
        {
          label: "基本信息",
          imgUrl: require("@/assets/smallIcon/jbxx.png"),
          path: "/apply"
        },
        {
          label: "金额期数",
          imgUrl: require("@/assets/smallIcon/yhk.png"),
          path: "/qishu"
        }
      ],
      step: [0, 0],
      money: 200000
    };
  },
  computed: {
    //判断是否所有步骤已经完成
    stepFinish() {
      return this.step.every(item => {
        return item;
      });
    },
    text() {
      return "额度:" + this.money;
    }
  },
  methods: {
    submit() {
      if (!this.stepFinish) {
        this.$toast("请先完善信息");
        return;
      }
      this.$router.push({
        path: "/middlePage",
        // query: { url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41" }
      });
    },
    async initData() {
      const { data: res } = await this.$https.post("/users/dataProcess", {
        username: this.$cookies.get("userInfo").username
      });
      this.step = res.data.step;
      this.money = res.data.money || this.money;
      console.log(res);
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
.circle {
  padding: 20px;
  height: 150px;
  background-image: linear-gradient(180deg, rgb(36, 169, 255), #fff);
}
/deep/.van-circle__text {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: bolder;
}
</style>