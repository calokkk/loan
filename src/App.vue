<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "App",
  components: {
    [Button.name]: Button
  }
};
</script>

<style>
html {
  overflow-x: hidden;
  overflow-y: auto;
}
#app {
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  height: 100vh;
}

.container {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
}
.page {
  background-color: rgb(236, 236, 236);
  height: 100%;
  overflow: scroll;
  position: relative;
}
</style>