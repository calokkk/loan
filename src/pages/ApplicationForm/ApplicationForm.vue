<template>
  <div class="container">
    <nav-bar title="信息填写">
      <span slot="left" @click="$router.back()">返回</span>
    </nav-bar>
    <div class="form">
      <van-form @submit="onSubmit">
        <!-- 姓名 -->
        <van-field
          v-model="form.name"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          required
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <!-- 身份证号 -->
        <van-field
          v-model="form.IdCard"
          maxlength="18"
          name="身份证号"
          label="身份证号"
          placeholder="身份证号"
          required
          :rules="[{ required: true, message: '请填写身份证号' }]"
        />
        <!-- 房产情况 -->
        <van-field name="house" label="房产情况" required :rules="rules">
          <template #input>
            <van-radio-group v-model="form.house" direction="vertical" default-index="/">
              <van-radio name="1">商品房按揭</van-radio>
              <van-radio name="2">商品房全款</van-radio>
              <van-radio name="3">自建（有房产证）</van-radio>
              <van-radio name="4">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 是否有车 -->
        <van-field name="car" label="是否有车" required :rules="rules">
          <template #input>
            <van-radio-group v-model="form.car" direction="horizontal">
              <van-radio name="1">有</van-radio>
              <van-radio name="2">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 保险保单 -->
        <van-field name="ensurance" label="保险保单" required :rules="rules">
          <template #input>
            <van-radio-group v-model="form.insurance" direction="horizontal">
              <van-radio name="1">有</van-radio>
              <van-radio name="2">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 社保情况 -->
        <van-field name="shebao" label="社保" required :rules="rules">
          <template #input>
            <van-radio-group v-model="form.shebao" direction="horizontal">
              <van-radio name="1">有</van-radio>
              <van-radio name="2">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 公积金 -->
        <van-field name="gongjijin" label="公积金" required :rules="rules">
          <template #input>
            <van-radio-group v-model="form.gongjijin" direction="horizontal">
              <van-radio name="1">有</van-radio>
              <van-radio name="2">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 工资代发 -->
        <van-field name="gzdaif" label="工资代发" required :rules="rules">
          <template #input>
            <van-radio-group v-model="form.gzdaifa" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 职业选择 -->
        <van-field
          required
          readonly
          clickable
          :rules="rules"
          name="picker"
          :value="form.work"
          label="职业"
          placeholder="选择职业"
          @click="showPicker = true"
        />
        <!-- 职业选择列表 -->
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="selectWork"
          />
        </van-popup>
        <!-- 工作单位 -->
        <van-field
          name="workUnit"
          v-model="form.workUnit"
          label="工作单位"
          required
          :rules="rules"
          placeholder="没有则填 “无”"
        ></van-field>
        <!-- 单位地址 -->
        <van-field
          name="workAddress"
          v-model="form.workAddress"
          label="工作地址"
          required
          :rules="rules"
          placeholder="没有则填 “无”"
        ></van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar/NavBar";
import { Form, Field, Button, RadioGroup, Radio, Picker, Popup } from "vant";
export default {
  components: {
    NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  data() {
    return {
      form: {
        work: "/"
      },
      columns: [
        "/",
        "学生",
        "上班",
        "事业单位",
        "公务员",
        "个体户",
        "法人"
      ],
      rules: [{ required: true, message: "请填写信息" }],
      showPicker: false
    };
  },
  methods: {
    //提交表单
    async onSubmit() {
      this.form.username = this.$cookies.get("userInfo").username;
      const { data: res } = await this.$https.post("/users/submitUserInfo", {
        form: this.form
      });
      console.log(this.form);
      if (res.code === 200) {
        this.$toast("提交成功");
        this.$router.replace({ path: "/dataProcess" });
      } else {
        this.$toast("提交出错");
      }
    },
    //工作下拉框选择
    selectWork(val) {
      this.form.work = val;
      this.showPicker = false;
    },
    async initForm() {
      const { data: res } = await this.$https.post("/users/initForm", {
        username: this.$cookies.get("userInfo").username
      });
      if(res.code===200){
        this.form=res.data
        console.log(res.data);
        
      }
    }
  },
  created(){
    this.initForm()
  }
};
</script>

<style lang="less" scoped>
.van-radio {
  margin-bottom: 5px;
}
</style>