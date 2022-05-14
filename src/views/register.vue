<template>
  <div>
    <div class="card">
      <el-card>
        <div slot="header" style="text-align: center">
          <span>AZ博客--注册</span>
        </div>
        <div style="display: flex">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="邮箱">
              <el-input
                clearable
                placeholder="请输入邮箱地址"
                style="width: 300px"
                v-model="form.email"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                clearable
                placeholder="请输入密码"
                style="width: 300px"
                v-model="form.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                clearable
                placeholder="请再次输入密码"
                style="width: 300px"
                v-model="form.password2"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <div style="flex">
                <div>
                  <el-input
                    clearable
                    placeholder="请输入邮箱验证码"
                    style="width: 180px"
                    v-model="form.confirmCode"
                  ></el-input>
                  <span>&nbsp;</span>
                  <el-button
                    size="small"
                    type="info"
                    plain
                    @click="sendEmailConfirmCode"
                    >发送邮箱验证码</el-button
                  >
                </div>
              </div>
            </el-form-item>
            <div style="text-align: center">
              <el-button @click="toRegister" type="success" plain
                >立即注册</el-button
              >
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      sendTime: 0,
      form: {
        email: "",
        password: "",
        password2: "",
        confirmCode: "",
      },
    };
  },
  methods: {
    ...mapActions("login", ["registerApi", "sendEmailApi"]),
    //注册
    toRegister() {
      if (
        !this.form.email ||
        !this.form.password ||
        !this.form.password2 ||
        !this.form.confirmCode
      ) {
        this.$message.error("存在未填写表单项");
        return;
      }
      if (
        !this.form.email.trim() ||
        !this.form.password.trim() ||
        !this.form.password2.trim() ||
        !this.form.confirmCode.trim()
      ) {
        this.$message.error("存在空白表单项");
        return;
      }
      if (this.form.password != this.form.password2) {
        this.$message.error("两次输入的密码必须一致");
        return;
      }
      //发起注册请求
      this.registerApi({
        payload: {
          email: this.form.email,
          password: this.form.password,
          confirmCode: this.form.confirmCode
        }
      }).then(res => {
        if(res.success) {
          this.$message.success("注册成功，请登录");
          setTimeout(() => {
            this.$router.push("/");
          }, 500);
        }else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    sendCode() {
      //发送验证码
        this.sendEmailApi({
          email: this.form.email,
        }).then((res) => {
          if(res.success) {
            this.$message.success("验证码发送成功");
          }else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.error(err);
        });
    },
    //发送邮箱验证码
    sendEmailConfirmCode() {
      if (!this.form.email || !this.form.email.trim()) {
        this.$message.error("请输入完整的邮箱地址");
        return;
      }
      if (this.sendTime === 0) {
        this.sendCode(this.form.email);
        this.sendTime = new Date().getTime();
        return;
      }
      if (new Date().getTime() < this.sendTime + 1000 * 60) {
        this.$message.warning("请1分钟后再试");
        return;
      }else {
        this.sendCode();
        this.sendTime = new Date().getTime();
        return;
      }
    },
  },
};
</script>

<style lang="scss" scope>
.card {
  padding: 10px;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>