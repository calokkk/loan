<template>
  <div class="container">
    <nav-bar title="信息填写">
      <span slot="left" @click="$router.back()">返回</span>
    </nav-bar>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          readonly
          clickable
          name="money"
          label="金额"
          :value="form.money"
          @touchstart.native.stop="showKb = true"
        />
        <van-field
          v-model="form.qishu"
          name="qishu"
          label="期数"
          placeholder="期数"
          :rules="[{ required: true, message: '请选择期数' }]"
          @click="showPicker = true"
        />

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
      <!-- 期数选择列表 -->
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="selectqs"
        />
      </van-popup>
      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="form.money"
        :show="showKb"
        :maxlength="10"
        @blur="showKb = false"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { Form, Picker, Field, Button, Popup, NumberKeyboard } from "vant";
export default {
  components: {
    NavBar,
    [Form.name]: Form,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [NumberKeyboard.name]: NumberKeyboard
  },
  data() {
    return {
      userInfo: this.$cookies.get("userInfo"),
      form: {
        money: "2000",
        qishu: "12期"
      },
      showPicker: false,
      columns: ["3期", "6期", "12期", "18期", "24期", "36期", "48期", "60期"],
      showKb: false
    };
  },
  methods: {
    // 提交表单
    async onSubmit() {
      this.form.username = this.userInfo.username;
      this.form.date = this.$moment(new Date()).format('YYYY-MM-DD HH:mm')
      const { data: res } = await this.$https.post("/users/submitLoanInfo", {
        form: this.form
      });
      console.log(res);
      if (res.code === 200) {
        this.$toast("提交成功");
        this.$router.replace({ path: "/dataProcess" });
      } else {
        this.$toast("提交出错");
      }
    },
    // 选择期数
    selectqs(val) {
      this.form.qishu = val;
      this.showPicker = false;
    },
    // 进入页面时，初始化表单
    async initForm() {
      const { data: res } = await this.$https.post("/users/initLoanForm", {
        username: this.userInfo.username
      });
      this.form = res.data;
      console.log(res);
      
    }
  },
  created() {
    this.initForm();
  }
};
</script>

<style lang="less" scoped>
</style>