<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        background-color: white;
        width: 100%;
      "
    >
      <div style="display: flex; justify-content: left; align-items: center">
        <div>
          <img
            style="width: 80px; height: 45px"
            src="../img/logo.png"
            fit="AZ_Blog"
          />
        </div>
        <div style="font-size: 18px; margin-bottom: 3px">AZ博客</div>
        <div style="font-size: 18px; margin-bottom: 3px; margin-left: 10px">
          &emsp;|&emsp;<el-tag size="small" type="info" effect="plain">{{
            userEmail ? userEmail : ""
          }}</el-tag>
        </div>
        <div>
          <el-button style="margin-left: 10px" size="mini" @click="logout"
            >退出</el-button
          >
        </div>
      </div>
      <div style="display: flex; justify-content: right; align-items: center">
        <el-button
          size="mini"
          type="success"
          plain
          icon="el-icon-circle-plus-outline"
          @click="writeBlog"
        >
          写博客
        </el-button>
        <el-button size="mini" @click="blogManage" type="primary" plain>
          博客管理
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div :style="{ width: '100%', height: bodyHeight, overflow: 'auto' }">
      <div style="padding: 10px" v-for="(blog, index) in blogList" :key="index">
        <el-card>
          <div slot="header">
            <el-button
              @click="seeDetail(blog.id)"
              style="float: right; padding: 3px 0"
              type="text"
              >查看原文</el-button
            >
            <el-button
              @click="seeDetail(blog.id)"
              type="text"
              style="font-size: 18px; margin-left: 0px"
              >{{ blog.title }}</el-button
            >
            <p style="font-size: 8px">
              <span>创建时间：{{ blog.createTime }}</span
              ><span style="padding-left: 15px"
                >更新时间：{{ blog.updateTime }}</span
              >
            </p>
          </div>
          <div style="font-size: 14px">
            {{ blog.simpleDes }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      blogList: [],
      userEmail: "",
      bodyHeight: "800px",
    };
  },
  created() {
    this.getEmailByToken();
    this.getBlogsByUser();
  },
  methods: {
    ...mapActions("blog", ["getBlogsByUserApi"]),
    ...mapActions("login", ["getEmailByTokenApi", "logoutApi"]),
    getEmailByToken() {
      this.getEmailByTokenApi({
        payload: {},
      })
        .then((res) => {
          if (res.success) {
            this.userEmail = res.data;
          } else {
            if (res.msg.indexOf("reLogin") != -1) {
              window.localStorage.removeItem("token");
              this.$router.push("/login");
            } else {
              this.$message.error("获取用户信息失败");
            }
          }
        })
        .catch((err) => {
          this.$message.error("发生异常");
        });
    },
    writeBlog() {
      this.$router.push("/editBlog");
    },
    getBlogsByUser() {
      this.getBlogsByUserApi({
        payload: {},
      })
        .then((res) => {
          if (res.success) {
            this.blogList = res.data || [];
          } else {
            if (res.msg.indexOf("reLogin") != -1) {
              window.localStorage.removeItem("token");
              this.$router.push("/login");
            } else {
              this.$message.error("发生异常");
            }
          }
        })
        .catch((res) => {
          this.$message.error("发生异常");
        });
    },
    seeDetail(id) {
      window.open(`${this.basePath}/blogDetail?id=${id}`);
    },
    blogManage() {
      window.location.href = `${this.basePath}/blogManage`;
    },
    logout() {
      this.logoutApi({}).then((res) => {
        if (res.success) {
          window.localStorage.removeItem("token");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>
<style>
</style>