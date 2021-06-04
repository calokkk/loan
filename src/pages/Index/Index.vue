<template>
    <div class="container">
        <router-view></router-view>
        <van-tabbar v-model="active" active-color="#000" route>
            <van-tabbar-item icon="wap-home-o" to="/home">主页</van-tabbar-item>
            <van-tabbar-item icon="gold-coin-o" to="/loan">贷款</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default {
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active: 0
            }
        }
    }
</script>

<style lang="less">

</style>