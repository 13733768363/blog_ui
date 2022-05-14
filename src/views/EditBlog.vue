<template>
  <div :style="{ maxHeight: bodyMaxHeight }">
    <div class="editBlog" :style="{ maxHeight: maxHeight, height: maxHeight }">
      <div style="padding: 10px">
        <div style="padding: 10px">
          <el-input
            style="width: 60%"
            placeholder="请输入内容"
            v-model="blog.title"
          >
            <template slot="prepend">标题</template>
          </el-input>
        </div>
        <div style="padding: 10px">
          <el-input
            style="width: 60%"
            type="textarea"
            placeholder="请输入博客简介"
            v-model="blog.simpleDes"
          >
          </el-input>
        </div>
      </div>
      <div id="editor" style="width: 60%; padding-left: 20px"></div>
    </div>
    <div style="display: flex; justify-content: right; padding: 20px">
      <el-button size="small" @click="dialogVisible = true">取消</el-button>
      <span style="width: 20px"></span>
      <el-button size="small" type="primary" @click="save">保存</el-button>
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确定取消保存吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCancel">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import E from "wangeditor";
import "highlight.js/styles/idea.css";
import hljs from "highlight.js";
export default {
  data() {
    return {
      dialogVisible: false,
      maxHeight: 400,
      bodyMaxHeight: 400,
      blog: this.$route.query.editItem
        ? this.$route.query.editItem
        : {
            id: "",
            title: "",
            simpleDes: "",
            content: "",
            classifyId: "",
            createUser: "",
            createTime: null,
            updateTime: null,
          },
      //是否是修改
      isEdit: this.$route.query.isEdit ? this.$route.query.isEdit : false,
    };
  },
  mounted() {
    this.initHeight();
    this.initEditor();
  },
  methods: {
    ...mapActions("blog", [
      "uploadImgApi",
      "insertBlogApi",
      "updateBlogByIdApi",
    ]),

    //初始化元素高度
    initHeight() {
      this.maxHeight = window.innerHeight - 80 + "px";
      this.bodyMaxHeight = window.innerHeight - 50 + "px";
    },

    //初始化Editor
    initEditor() {
      const editor = new E("#editor");
      editor.config.height = 650;
      hljs.highlightAll();
      // 挂载highlight插件
      editor.highlight = hljs;
      editor.config.uploadImgAccept = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
      ];
      editor.config.zIndex = 10;
      // 配置菜单栏，设置不需要的菜单
      editor.config.excludeMenus = ["video"];
      let that = this;
      //输入文本触发的事件
      editor.config.onchange = (html) => {
        that.blog.content = html;
      };
      //上传图片触发的事件
      editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        for (let i = 0; i < resultFiles.length; i++) {
          let formData = new FormData();
          formData.append("file", resultFiles[i]);
          that.uploadImg(formData, insertImgFn);
        }
      };
      editor.create();
      editor.txt.html(this.blog.content);
    },

    //上传图片
    uploadImg(formData, insertImgFn) {
      this.uploadImgApi(formData).then((res) => {
        let result = res.data || [];
        if (result && result.length > 0) {
          insertImgFn(result[0].url);
        }
      });
    },

    //确认取消
    confirmCancel() {
      this.dialogVisible = false;
      this.$router.push("/index");
    },

    //新增博客
    insertBlog() {
      this.insertBlogApi({
        payload: {
          ...this.blog,
        },
      })
        .then((res) => {
          if (res.success) {
            this.$message.success("保存成功");
            setTimeout(() => {
              this.$router.push("/");
            }, 500);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("发生异常");
        });
    },

    //保存
    save() {
      if (this.blog.title.trim() === "") {
        this.$message.warning("请输入标题");
        return;
      }
      if (this.blog.simpleDes.trim() === "") {
        this.$message.warning("请输入简介");
        return;
      }
      if (this.blog.content.trim() === "") {
        this.$message.warning("请输入正文内容");
        return;
      }
      if (this.isEdit) {
        //更新博客
        this.updateBlogById();
      } else {
        //新增博客
        this.insertBlog();
      }
    },
    updateBlogById() {
      this.updateBlogByIdApi({
        payload: {
          ...this.blog,
        },
      })
        .then((res) => {
          if (res.success) {
            this.$message.success("更新成功");
            setTimeout(() => {
              this.$router.push("/");
            }, 500);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.$message.error("发生异常");
        });
    },
  },
};
</script>
  
<style>
.editBlog {
  width: 100%;
  overflow-y: auto;
}
</style>>