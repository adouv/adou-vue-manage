<template>
  <ad-main :title="['系统菜单管理']" class="ad-system-menu">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSystemMenuList()">刷新</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSysMenuModify'})">添加</a-button>
      </div>
    </div>

    <a-table :columns="columns" :dataSource="list" style="margin-top:20px">
      <!---->
      <template slot="Title" slot-scope="text,record">{{record.Title}}({{record.ID}})</template>
      <!---->
      <template slot="Url" slot-scope="text">
        <a-tooltip placement="top">
          <template slot="title">
            <span>{{text}}</span>
          </template>
          <a href="javascript:;">链接</a>
        </a-tooltip>
      </template>
      <!---->
      <template slot="IsValide" slot-scope="text,record">
        <a-switch
          v-model="record.IsValideCheck"
          @change="isValideChangeHandller(record)"
          checkedChildren="有效"
          unCheckedChildren="无效"
        ></a-switch>
      </template>
      <!---->
      <template slot="Sort" slot-scope="text,record">
        <a-input
          v-model="record.Sort"
          @blur.native.capture="sortBlurHandller(record)"
          style="width:50px;text-align:center;"
        ></a-input>
      </template>
      <!---->
      <template slot="Type" slot-scope="text,record">
        <a-tag v-if="record.Type<-1" color="#f50">菜单(系统内部)</a-tag>
        <a-tag v-if="record.Type==-1" color="#2db7f5">目录(系统内部)</a-tag>
        <a-tag v-if="record.Type==0" color="#87d068">目录</a-tag>
        <a-tag v-if="record.Type==1" color="#108ee9">菜单</a-tag>
        <a-tag v-if="record.Type==2" color="purple">按钮</a-tag>
      </template>
      <!---->
      <template slot="Operating" slot-scope="text,record">
        <a-button
          type="primary"
          v-if="!record.children"
          size="small"
          @click.native="btnOperationHandller(record);"
        >操作权限</a-button>
        <a-button
          type="danger"
          size="small"
          v-if="!record.children && record.Type>=0"
          @click.native="btnDeleteHandller(record);"
        >删除</a-button>
        <a-button
          type="primary"
          v-if="record.Type>=0"
          size="small"
          @click.native="btnModifyHandller(record);"
        >编辑</a-button>
      </template>
    </a-table>
  </ad-main>
</template>

<script>
import adTreeService from "../../../service/adTreeService";
import adSystemMenuService from "../../../service/adSystemMenuService";
import AdSystemMenuOperationComponent from "./operation.vue";
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
      columns: [
        {
          title: "菜单名称",
          dataIndex: "Title",
          key: "Title",
          scopedSlots: {
            customRender: "Title"
          }
        },
        {
          title: "菜单地址",
          dataIndex: "Url",
          key: "Url",
          scopedSlots: {
            customRender: "Url"
          }
        },
        {
          title: "是否有效",
          dataIndex: "IsValide",
          key: "IsValide",
          scopedSlots: {
            customRender: "IsValide"
          }
        },
        {
          title: "排序",
          dataIndex: "Sort",
          key: "Sort",
          scopedSlots: {
            customRender: "Sort"
          }
        },
        {
          title: "类型",
          dataIndex: "Type",
          key: "Type",
          scopedSlots: {
            customRender: "Type"
          }
        },
        {
          title: "操作",
          dataIndex: "Operating",
          key: "Operating",
          scopedSlots: {
            customRender: "Operating"
          }
        }
      ],
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
          this.list = this.utils$.getTreeData(response, 0);
        }
      });
    },
    /**
     * 排序字段鼠标离开回调事件
     */
    sortBlurHandller(item) {
      if (!item.Sort) {
        return;
      }

      if (isNaN(item.Sort)) {
        this.$message.info("排序必须是数字");
        return;
      }

      if (item.Sort < 0) {
        this.$message.info("排序不能小于0");
        return;
      }

      let params = {
        ID: item.ID,
        Sort: item.Sort
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
        ID: item.ID,
        IsValide: item.IsValideCheck ? 1 : 0
      };

      adSystemMenuService
        .updateSystemMenuIsValideByID(params)
        .then(response => {
          if (response > 0) {
            if (params.IsValide === 1) {
              this.$message.info("已设置为有效");
            } else {
              this.$message.info("已设置为无效");
            }
          } else {
            this.$message.error("设置失败");
          }
        });
    },
    /**
     * 设置操作权限
     */
    async btnOperationHandller(item) {
      console.log(item);
      item.OperationList = [];

      try {
        let params = {
          ParentID: item.ID,
          IsDel: 1,
          IsValide: 1,
          OrderBy: "Sort",
          IsDesc: false
        };

        let result = await adSystemMenuService.getSystemMenuList(params);

        if (result.length > 0) {
          item.OperationList = result;
        }

        this.adModal$({
          visible: true,
          title: `${item.Title} - 操作权限设置`,
          cancelText: "关闭",
          componentName: AdSystemMenuOperationComponent,
          params: item,
          okHandller: (options, close) => {
            console.log(options.params);
          }
        });
      } catch (error) {
        this.adSpin$.hide();
      }
    },
    /**
     * 编辑
     */
    btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });

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