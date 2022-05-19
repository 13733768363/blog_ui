<template>
  <div class="blog-body">
    <el-container style="width: 100%">
      <el-header>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            opacity: 1;
            width: 100%;
            z-index: 9999;
            position: fixed;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #f5f7fa;
          "
        >
          <div
            style="
              display: flex;
              justify-content: left;
              align-items: center;
              padding-left: 15px;
            "
          >
            <div style="font-size: 18px; margin-bottom: 3px">AZ博客</div>
            <div style="font-size: 18px; margin-bottom: 3px; margin-left: 10px">
              &emsp;|&emsp;<el-tag size="small" type="info" effect="plain">{{
                userEmail ? userEmail : ""
              }}</el-tag>
            </div>
          </div>
          <div
            style="
              display: flex;
              justify-content: right;
              align-items: center;
              padding-right: 10px;
            "
          >
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
            <el-button style="margin-left: 10px" size="mini" @click="logout"
              >退出</el-button
            >
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="70%">
          <div class="blog-item" id="blogItem">
            <div v-show="blogList.length == 0" style="background-color:#f5f7fa">
            <el-empty description="暂无内容"></el-empty></div>
            <div
              style="padding: 3px 10px 3px 10px"
              v-for="(blog, index) in blogList"
              :key="index"
            >
              <el-card :body-style="{ padding: '15px' }">
                <el-button
                  @click="seeDetail(blog.id)"
                  style="float: right; padding: 3px 0"
                  type="text"
                  >查看原文</el-button
                >
                <el-button
                  @click="seeDetail(blog.id)"
                  type="text"
                  style="
                    font-size: 18px;
                    margin-left: 0px;
                    text-overflow: ellipsis;
                  "
                  :title="blog.title"
                  >{{ blog.title }}</el-button
                >
                <p style="font-size: 8px">
                  <span>创建时间：{{ blog.createTime }}</span
                  ><span style="padding-left: 15px"
                    >更新时间：{{ blog.updateTime }}</span
                  >
                  <span style="padding-left: 15px"
                    >标签：<el-tag type="success" effect="plain">{{ (blog.tagName == null || blog.tagName=='')?'无' : blog.tagName }}</el-tag></span
                  >
                </p>
                <div style="font-size: 14px">
                  {{ blog.simpleDes }}
                </div>
              </el-card>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix" style="text-align: center">
                <span>当前时间：{{ timeContent }}</span>
              </div>
              <div>
                <FunctionalCalendar
                  v-model="calendarData"
                  :configs="calendarConfigs"
                ></FunctionalCalendar>
              </div>
            </el-card>
            <div style="height: 10px"></div>
            <el-card class="box-card">
              <div slot="header" class="clearfix" style="text-align: left">
                <span style="font-size: 20px">标签分类</span>
                <span style="float: right"><el-button size="mini" @click="toTagManage()" type="success" plain>标签管理</el-button></span>
              </div>
              <div style="height: 18vh; overflow: auto; display: flex;">
                <div>
                  <el-tag effect="plain" style="margin-left: 10px; margin-top: 10px;" @click="selectAllTag()" :style="{'backgroundColor':  selectTagId == '' ? '#ecf5ff' : ''}">全部</el-tag>
                  <el-tag effect="plain" style="margin-left: 10px; margin-top: 10px;"
                  v-for="(item, index) in tagList"
                  :key="index"
                  :style="{'backgroundColor':  item.clicked ? '#ecf5ff' : ''}"
                  @click="changeChecked(index)"
                >
                  {{ item.name }}
                </el-tag>
                </div>
              </div>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { FunctionalCalendar } from "vue-functional-calendar";
export default {
  components: {
    FunctionalCalendar,
  },
  data() {
    return {
      blogList: [],
      userEmail: "",
      bodyHeight: "800px",
      timeContent: "",
      calendarData: {},
      calendarConfigs: {
        sundayStart: true,
        dateFormat: "yyyy/mm/dd",
        isDatePicker: true,
        isDateRange: false,
      },
      tagList: [],
      selectTagId: ""
    };
  },
  created() {
    setInterval(() => {
      this.displayTime();
    }, 1000);
    this.getEmailByToken();
    this.getBlogsByUser();
    this.getAllTags();
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions("blog", ["getBlogsByUserApi"]),
    ...mapActions("login", ["getEmailByTokenApi", "logoutApi"]),
    ...mapActions("tag", ["getAllTagsByUserApi"]),
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
          this.$message.error("获取用户信息发生异常,即将跳转到登录界面...");
          setTimeout(() => {
            window.localStorage.removeItem("token");
            this.$router.push("/login");
          }, 2000);
        });
    },
    getAllTags() {
      this.getAllTagsByUserApi({
        //
      }).then(res => {
        this.tagList = res.data || [];
        this.tagList.forEach(item => {
          item.clicked = false;
        })
      }).catch(err => {
        this.$message.error("获取标签列表发生异常");
      })
    },
    writeBlog() {
      this.$router.push("/editBlog");
    },
    getBlogsByUser() {
      this.getBlogsByUserApi({
        tagId: this.selectTagId
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
    changeChecked(index) {
      this.tagList.forEach(item => {
        item.clicked = false;
      });
      this.tagList[index].clicked = true;
      this.selectTagId = this.tagList[index].id;
      this.$forceUpdate();
      this.getBlogsByUser();
    },
    selectAllTag() {
      this.tagList.forEach(item => {
        item.clicked = false;
      });
      this.selectTagId = '';
      this.getBlogsByUser();
    },
    logout() {
      this.logoutApi({}).then((res) => {
        if (res.success) {
          window.localStorage.removeItem("token");
          this.$router.push("/login");
        }
      });
    },
    displayTime() {
      var show_day = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      var time = new Date();
      var year = time.getYear();
      if (year < 1000) {
        year += 1900;
      }
      var month = time.getMonth();
      var date = time.getDate();
      var day = time.getDay();
      var hour = time.getHours();
      var minutes = time.getMinutes();
      var second = time.getSeconds();
      var dn = "AM";
      if (hour >= 12) {
        dn = "PM";
      }

      month = month + 1;
      month < 10 ? (month = "0" + month) : month;
      hour < 10 ? (hour = "0" + hour) : hour;
      minutes < 10 ? (minutes = "0" + minutes) : minutes;
      second < 10 ? (second = "0" + second) : second;
      var now_time =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        show_day[day] +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second +
        " " +
        dn;
      this.timeContent = now_time;
    },
    toTagManage() {
      this.$router.push("/tagManage");
    }
  },
};
</script>
<style scoped>
.blog-body {
  background-color: #f5f7fa;
  background-image: url("../img/bg01.jpg");
  background-size: cover;
  position: fixed;
  background-position: center;
  width: 100%;
  height: 100vh;
}
.blog-item {
  width: 100%;
  opacity: 0.8;
  overflow: auto;
  overflow-x: hidden;
  height: 91vh;
}

.el-header {
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}

.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 5px 5px 0px 20px;
}
</style>