<template>
  <div style="padding: 10px">
    <div style="font-size: 20px">标签管理</div>
    <el-divider></el-divider>
    <el-button type="primary" size="small" plain @click="addTag()"
      >新增标签</el-button
    >
    <div class="tag-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="small"
        stripe
        border
        header-cell-class-name="table-header"
      >
        <el-table-column label="标签名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              plain
              @click="editTag(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              @click="deleteTag(scope.row)"
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
    ...mapActions("tag", [
      "addTagApi",
      "deleteTagByIdApi",
      "updateTagByIdApi",
      "getTagListByUserApi",
    ]),

    getTableData() {
      this.getTagListByUserApi({
        payload: {
          current: this.current,
          size: this.size,
          keyword: "",
        },
      })
        .then((res) => {
          if (res.success) {
            this.tableData = res.data.records || [];
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
    addTag() {
      this.$prompt("请输入标签名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "标签名称不能为空",
      })
        .then(({ value }) => {
          this.addTagApi({
            name: value,
          }).then((res) => {
            if (res.success) {
              this.$message.success(res.data);
              this.getTableData();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          //
        });
    },
    editTag(row) {
      this.$prompt("请输入新的标签名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "标签名称不能为空",
      })
        .then(({ value }) => {
          this.updateTagByIdApi({
            id: row.id,
            name: value,
            createTime: row.createTime,
            updateTime: row.updateTime,
            createUser: row.createUser
          }).then((res) => {
            if (res.success) {
              this.$message.success(res.data);
              this.getTableData();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          //
        });
    },
    deleteTag(row) {
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除操作
          this.deleteTagById(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    deleteTagById(id) {
      this.deleteTagByIdApi({
        id: id,
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
.tag-table {
  padding-top: 10px;
  padding-bottom: 10px;
}
.table-header {
  background-color: #f5f7fa !important;
}
</style>