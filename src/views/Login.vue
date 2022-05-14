<template>
  <div style="overflow: hidden">
    <div class="card">
      <el-card>
        <div slot="header" style="text-align: center">
          <span>AZ博客--登录</span>
        </div>
        <div style="display: flex">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input
                style="width: 300px"
                v-model="form.email"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                clearable
                style="width: 300px"
                v-model="form.password"
                show-password
              ></el-input>
            </el-form-item>
            <div style="text-align: center">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="toRegister">立即注册</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("login", ["toLoginApi"]),
    login() {
      if (
        !this.form.email ||
        !this.form.email.trim() ||
        !this.form.password ||
        !this.form.password.trim()
      ) {
        this.$message.error("表单项填写有误，请重新填写");
        return;
      }
      this.toLogin();
    },
    toLogin() {
      this.toLoginApi({
        email: this.form.email,
        password: this.form.password
      }).then(res => {
        if(res.success) {
          let result = res.data;
          console.log(res.data);
          if(result.token) {
            window.localStorage.setItem("token", result.token);
            this.$message.success("登录成功");
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          }
        }else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    toRegister() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>

<style scope>
.card {
  padding: 10px;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>