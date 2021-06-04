<template>
  <div class="page">
    <nav-bar :title="title">
      <!-- <van-icon name="bell" slot="right" size="20px" /> -->
    </nav-bar>
    <div class="banner">
      <div class="wrapper">
        <div>您的预估额度(元)</div>
        <div class="num">200,000</div>
        <div>凭身份证即可领取</div>
        <van-button
          round
          type="info"
          @click="$router.push({path:'/dataprocess'})"
          style="width:80%;margin-top:5px"
        >立即提现</van-button>
      </div>
    </div>
    <van-grid>
      <van-grid-item
        v-for="menu in menuList"
        :key="menu.label"
        @click="$router.push({path:menu.path})"
      >
        <img :src="menu.imgUrl" />
        <p>{{menu.label}}</p>
      </van-grid-item>
    </van-grid>
    <div class="division">必下款推荐</div>
    <van-list>
      <div class="list-item" v-for="(item,index) in vipItemList" :key="index">
        <div class="header">
          <img :src="item.imgUrl" alt />
          &nbsp&nbsp {{item.label}}
        </div>
        <div class="info">
          <span>{{item.edu}}</span>
          <span>{{item.qishu}}</span>
          <van-button type="info" round size="small" @click="$router.push({path:item.path})">立即解锁</van-button>
        </div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#aaa', padding: '0 16px' }" />
      </div>
    </van-list>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { Icon, Button, Grid, GridItem, List, Divider } from "vant";
export default {
  components: {
    NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [List.name]: List,
    [Divider.name]: Divider
  },
  data() {
    return {
      title: "主页",
      menuList: [
        {
          label: "借款进度",
          imgUrl: require("@/assets/home/jindu.png"),
          path: "/process",
          url: ""
        },
        {
          label: "查通过率",
          imgUrl: require("@/assets/home/tongguo.png"),
          path: "/bigdata",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        },
        {
          label: "逾期记录",
          imgUrl: require("@/assets/home/jilu.png"),
          path: "/bigdata",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        },
        {
          label: "额度评估",
          imgUrl: require("@/assets/home/pinggu.png"),
          path: "/bigdata",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        }
      ],
      vipItemList: [
        {
          label: "会员专享产品",
          edu: "3000-8万",
          qishu: "3-12月",
          imgUrl: require("@/assets/smallicon/vip.png"),
          path: "/bigData",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        },
        {
          label: "会员专享产品",
          edu: "3000-8万",
          qishu: "3-12月",
          imgUrl: require("@/assets/smallicon/vip.png"),
          path: "/bigData",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        },
        {
          label: "会员专享产品",
          edu: "3000-8万",
          qishu: "3-12月",
          imgUrl: require("@/assets/smallicon/vip.png"),
          path: "/bigData",
          url: "http://h5.yunwangcha.cn/api/simpleh5?ref_id=41"
        }
      ]
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.banner {
  width: 100vw;
  height: 250px;
  background-image: linear-gradient(180deg, rgb(36, 169, 255), #fff);
  .wrapper {
    width: 90%;
    height: 180px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    .num {
      color: blue;
      font-size: 40px;
    }
    & > div:nth-child(1) {
      padding: 5px;
      letter-spacing: 1px;
    }
    & > div:nth-child(3) {
      padding: 5px;
      letter-spacing: 1px;
      color: gray;
    }
  }
}
.line1 {
  height: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-grid {
  font-size: 14px;
  font-weight: bolder;
}

.van-grid img {
  width: 32px;
  height: 32px;
}

.division {
  height: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    display: inline-block;
    content: "";
    width: 120px;
    height: 1px;
    background-color: gray;
    transform: scale(0.5);
  }
  &::after {
    display: inline-block;
    content: "";
    width: 120px;
    height: 1px;
    background-color: gray;
    transform: scale(0.5);
  }
}

.van-list {
  background-color: #fff;
  .list-item {
    .header {
      display: flex;
      justify-items: flex-start;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }
    .info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
      > span:nth-child(1) {
        color: #ff0000;
      }
      > span:nth-child(2) {
        color: #000;
      }
    }
  }
}
</style>