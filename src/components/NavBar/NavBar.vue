<template>
  <div class="nav-bar" :style="{backgroundColor:bgColor}">
    <!-- 左侧分发内容 -->
    <slot name="left"></slot>
    <!-- 标题 -->
    <div class="title">{{title}}</div>
    <!-- 右侧分发内容 -->
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ""
      },
      bgColor: {
        type: String,
        default: 'rgb(36,169,255)'
      }
    }
  };
</script>

<style lang="less">
  .nav-bar {
    box-sizing: border-box;
    width: 100vw;
    height: 50px;
    padding: 5px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // background-color: rgb(36,169,255);
    color: #fff;
    z-index: 999;

    .title {
      display: inline-block;
      flex: 1;
      font-weight: bold;
      font-size: 18px;
    }
  }
</style>