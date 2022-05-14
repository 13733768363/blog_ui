<template>
  <div style="padding: 10px">
    <div style="font-size: 20px">博客管理</div>
    <el-divider></el-divider>
    <div class="blog-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        border
        header-cell-class-name="table-header"
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="概要" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.simpleDes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.classifyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              plain
              @click="editBlog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              @click="deleteBlog(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="current"
      :page-size="size"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      current: 0,
      size: 10,
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions("blog", ["getBlogsWithUserAndPageApi", "deleteBlogByIdApi"]),

    getTableData() {
      this.getBlogsWithUserAndPageApi({
        payload: {
          current: this.current,
          size: this.size,
        },
      })
        .then((res) => {
          if (res.success) {
            this.tableData = res.data.records || [];
            this.tableData.forEach((item, index) => {
              item.index = index;
            });
            this.total = res.data.total || 0;
          } else {
            if (res.msg.indexOf("reLogin") != -1) {
              window.localStorage.removeItem("token");
              this.$router.push("/login");
            } else {
              this.$message.error(res.msg);
            }
          }
        })
        .catch((err) => {
          this.$message.error("发生异常");
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getTableData();
    },
    editBlog(row) {
      this.$router.push({
        path: "/editBlog",
        query: { editItem: row, isEdit: true },
      });
    },
    deleteBlog(row) {
      this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除操作
          this.deleteBlogById(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    deleteBlogById(id) {
      this.deleteBlogByIdApi({
        payload: {
          id: id,
        },
      })
        .then((res) => {
          if (res.success) {
            this.$message.success("删除成功");
            this.getTableData();
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
.blog-table {
  padding-bottom: 10px;
}
.table-header {
  background-color: #f5f7fa !important;
}
</style>