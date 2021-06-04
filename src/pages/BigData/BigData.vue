<template>
  <div class="container">
    <nav-bar :title="title">
      <span slot="left" @click="$router.back()">返回</span>
    </nav-bar>
    <div class="page">
      <iframe :src="iframeUrl" frameborder="0" class="iframe" ></iframe>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import qs from "qs";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      iframeUrl: 'http://h5.yunwangcha.cn/api/simpleh5?ref_id=41',
      title: "大数据查询",
      outerpage: ""
    };
  },
  methods: {
    async getCookies() {
      const { data: res } = await this.$https.get("/api/users");
      this.outerpage = res;
      console.log(res);
    }
  },
  created() {
    //this.getCookies();
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 0px;
}

.iframe {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>