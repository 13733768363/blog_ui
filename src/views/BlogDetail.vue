<template>
  <div class="body-item">
    <div style="padding: 10px">
    <div style="font-size: 20px">{{title}}</div>
    <el-divider></el-divider>
    <div style="font-size: 10px">博主：{{createUser}}</div>
    <div style="font-size: 10px">创建时间：{{createTime}}&emsp;&emsp;更新时间：{{updateTime}}</div>
    <el-divider></el-divider>
    <div id="detail"></div>
  </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
        blogId: "",
        title: "",
        createUser: "",
        updateTime: "",
        createTime: ""
    };
  },
  created() {
    this.blogId = this.$route.query.id;
  },
  mounted() {
      this.renderDetail();
  },
  methods: {
    ...mapActions("blog", ["getBlogsByIdApi"]),
    renderDetail() {
        this.getBlogsByIdApi({
            payload: {
                id: this.blogId
            }
        }).then(res => {
            if(res.success) {
                let blog = res.data;
                this.title = blog.title;
                this.createUser = blog.createUser;
                this.createTime = blog.createTime;
                this.updateTime = blog.updateTime;
                document.getElementById("detail").innerHTML = blog.content;
            }else {
              if(res.msg.indexOf("reLogin") != -1) {
                window.localStorage.removeItem("token");
              this.$router.push("/login");
              }else {
                this.$message.error(res.msg);
              }
            }
        })
        .catch(err => {
          this.$message.error("发生异常");
        })
    }
  },
};
</script>
<style>
.body-item {
  background-color: #f5f7fa;
  width: 99vw;
  height: 98vh;
  padding-left: 10px;
}
</style>