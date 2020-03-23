<template>
  <ad-main title="系统菜单管理" class="ad-system-menu">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-button type="inverse" @click.native="getAdSystemMenuList()">搜索</ad-button>
        <ad-button @click.native="$router.push({name:'adSysMenuModify'})">添加</ad-button>
      </div>
    </div>

    <div class="table-box">
      <el-table
        :data="list"
        size="medium"
        stripe
        style="width: 100%;"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="菜单名称">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column prop="url" label="菜单地址">
          <template slot-scope="scope">
            <el-tooltip
              v-if="scope.row.url!=='#'"
              class="item"
              effect="dark"
              :content="`${scope.row.url}${scope.row.otherId?'/'+scope.row.otherId:''}`"
              placement="top"
            >
              <el-link type="primary" size="mini">查看地址</el-link>
            </el-tooltip>
            <span v-if="scope.row.url==='#'">#</span>
          </template>
        </el-table-column>
        <el-table-column prop="isValide" label="是否有效" width="100">
          <template slot-scope="scope">
            <el-switch
              size="mini"
              v-model="scope.row.isValideCheck"
              @change="isValideChangeHandller(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100">
          <template slot-scope="scope">
            <ad-input
              v-model="scope.row.sort"
              @blur.native.capture="sortBlurHandller(scope.row)"
              style="width:50px;text-align:center;"
            ></ad-input>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.type<-1" type="warning">菜单(系统内部)</el-tag>
            <el-tag size="mini" v-if="scope.row.type==-1" type="info">目录(系统内部)</el-tag>
            <el-tag size="mini" v-if="scope.row.type==0" type="success">目录</el-tag>
            <el-tag size="mini" v-if="scope.row.type==1" type="warning">菜单</el-tag>
            <el-tag size="mini" v-if="scope.row.type==2" type="danger">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime" label="更新时间" width="100">
          <template slot-scope="scope">{{ scope.row.modifyTime|dateFormats }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <ad-button
              type="danger"
              v-if="scope.row.type>=0"
              @click.native="btnDeleteHandller(scope.row);"
            >删除</ad-button>
            <ad-button v-if="scope.row.type>=0" @click.native="btnModifyHandller(scope.row);">编辑</ad-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ad-main>
</template>

<script>
import adTreeService from "../../../service/adTreeService";
import adSystemMenuService from "../../../service/adSystemMenuService";
export default {
  name: "AdSystemMenuComponent",
  data() {
    return {
      params: {
        Title: "",
        OtherID: 0,
        ParentID: null,
        IsValide: -1,
        IsDel: 1,
        OrderBy: "Sort",
        IsDesc: false
      },
      list: []
    };
  },
  created() {
    this.getAdSystemMenuList();
  },
  methods: {
    /**
     * 获取菜单列表
     */
    getAdSystemMenuList() {
      this.list = [];

      adSystemMenuService.getSystemMenuList(this.params).then(response => {
        if (response && response.length > 0) {
          this.list = adTreeService.getMenuTreeList(response, 0);
        }
      });
    },
    /**
     * 排序字段鼠标离开回调事件
     */
    sortBlurHandller(item) {
      if (!item.sort) {
        return;
      }

      if (isNaN(item.sort)) {
        this.$tip("排序必须是数字");
        return;
      }

      if (item.sort < 0) {
        this.$tip("排序不能小于0");
        return;
      }

      let params = {
        ID: item.id,
        Sort: item.sort
      };
      adSystemMenuService.updateSystemMenuSortByID(params).then(response => {
        this.getAdSystemMenuList();
      });
    },
    /**
     * 是否有效回调事件
     */
    isValideChangeHandller(item) {
      let params = {
        ID: item.id,
        IsValide: item.isValideCheck ? 1 : 0
      };

      adSystemMenuService
        .updateSystemMenuIsValideByID(params)
        .then(response => {
          if (response > 0) {
            if (params.IsValide === 1) {
              this.$tip("已设置为有效");
            } else {
              this.$tip("已设置为无效");
            }
          } else {
            this.$tip("设置失败");
          }
        });
    },
    /**
     * 编辑
     */
    btnModifyHandller(item) {
      console.log(item);
      this.$router.push({ name: "adSysMenuModify", params: item });
    },
    /**
     * 删除
     */
    btnDeleteHandller(item) {
      let _this = this;
      let options = {};
      options.title = "确认提示";
      options.message = "确认要删除吗？";
      options.params = {
        ID: item.id,
        IsDel: 0
      };
      options.save = (params, close) => {
        adSystemMenuService.updateSystemMenuIsDelByID(params).then(response => {
          if (response > 0) {
            _this.$tip("删除成功");
            _this.getAdSystemMenuList();
          } else {
            _this.$tip("删除失败");
          }
          close();
        });
      };

      this.confirm$(options);
    }
  }
};
</script>

<style lang="scss">
.ad-system-menu {
  .table-box {
    margin-top: 20px;
    overflow-y: auto;
  }
  .el-table__header {
    th {
      font-weight: normal !important;
    }
  }
  .el-table {
    td {
      font-size: 12px !important;
      .cell,
      .el-link--inner {
        font-size: 12px !important;
      }
    }
  }
}
</style>