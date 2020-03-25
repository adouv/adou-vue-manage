<template>
  <ad-main :title="['系统菜单管理']">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSystemMenuList()">刷新</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSysMenuModify'})">添加</a-button>
      </div>
    </div>

    <a-table
      class="ant-tree-table"
      :columns="columns"
      :dataSource="list"
      :pagination="false"
      style="margin-top:20px"
    >
      <!---->
      <template slot="Title" slot-scope="text,record">{{record.Title}}({{record.ID}})</template>
      <!---->
      <template slot="IsValide" slot-scope="text,record">
        <span>{{record.IsValide===1?'是':'否'}}</span>
      </template>
      <!---->
      <template slot="Operating" slot-scope="text,record">
        <a-button
          type="primary"
          size="small"
          icon="setting"
          title="设置操作权限"
          v-if="record.Type===1"
          @click.native="btnOperationHandller(record);"
        ></a-button>
        <a-button
          type="danger"
          size="small"
          icon="delete"
          v-if="record.Type>=0"
          title="删除"
          @click.native="btnDeleteHandller(record);"
        ></a-button>
        <a-button
          type="primary"
          icon="edit"
          size="small"
          title="编辑"
          v-if="record.Type>=0"
          @click.native="btnModifyHandller(record);"
        ></a-button>
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
          title: "权限标识",
          dataIndex: "Perms",
          key: "Perms",
          scopedSlots: {
            customRender: "Perms"
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
            let args = options.params;
            if (args.OperationList.length === 0) {
              this.$message.info("请增加权限");
              return;
            }

            let resultList = [];

            args.OperationList.forEach(item => {
              if (item.ID === 0) {
                resultList.push(adSystemMenuService.addSystemMenu(item));
              } else {
                resultList.push(adSystemMenuService.updateSystemMenuByID(item));
              }
            });

            Promise.all(resultList).then(response => {
              close();
              this.getAdSystemMenuList();
            });
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
      if (item.hasSub) {
        this.$message.info("请先删除子栏目");
        return;
      }

      this.$confirm({
        title: "提示",
        content: "确定要删除吗?",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let params = {
            ID: item.ID,
            IsDel: 0
          };
          adSystemMenuService
            .updateSystemMenuIsDelByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getAdSystemMenuList();
              } else {
                this.$message.info("删除失败");
              }
            });
        }
      });
    }
  }
};
</script>

