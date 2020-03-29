<template>
  <ad-main :title="['首页','系统管理','部门管理']">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSystemDepartmentList()">刷新</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSysDepartmentModify'})">添加</a-button>
      </div>
    </div>

    <a-table
      class="ant-tree-table"
      :columns="columns"
      :dataSource="list"
      :defaultExpandAllRows="true"
      :pagination="false"
      style="margin-top:20px;min-width:1000px;"
    >
      <!---->
      <template slot="IsValide" slot-scope="text,record">
        <a-switch
          v-model="record.IsValideCheck"
          checkedChildren="启用"
          unCheckedChildren="禁用"
          @change="userStatusCheckChangeHandller(record);"
        />
      </template>
      <!---->
      <template slot="ModifyTime" slot-scope="text,record">
        <span>{{record.ModifyTime|dateFormats}}</span>
      </template>
      <!---->
      <template slot="Operating" slot-scope="text,record">
        <a-button
          type="danger"
          size="small"
          icon="delete"
          title="删除"
          @click.native="btnDeleteHandller(record);"
        ></a-button>
        <a-button
          type="primary"
          icon="edit"
          size="small"
          title="编辑"
          @click.native="btnModifyHandller(record);"
        ></a-button>
      </template>
    </a-table>
  </ad-main>
</template>

<script>
import adSystemDepartmentService from "../../../service/adSystemDepartmentService";
export default {
  name: "AdSystemDepartmentComponent",
  data() {
    return {
      params: {
        Name: "",
        IsDel: 1,
        OrderBy: "ModifyTime",
        IsDesc: false
      },
      columns: [
        {
          title: "编号",
          dataIndex: "ID",
          key: "ID"
        },
        {
          title: "名称",
          dataIndex: "Name",
          key: "Name",
          scopedSlots: {
            customRender: "Name"
          }
        },
        {
          title: "状态",
          dataIndex: "IsValide",
          key: "IsValide",
          scopedSlots: {
            customRender: "IsValide"
          }
        },
        {
          title: "更新时间",
          dataIndex: "ModifyTime",
          key: "ModifyTime",
          scopedSlots: {
            customRender: "ModifyTime"
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
  mounted() {
    this.getAdSystemDepartmentList();
  },
  methods: {
    /**
     * 获取列表
     */
    getAdSystemDepartmentList() {
      this.list = [];
      adSystemDepartmentService
        .getAdSystemDepartmentList(this.params)
        .then(response => {
          if (response.length > 0) {
            response.forEach(element => {
              element.IsValideCheck = element.IsValide === 1;
            });
          }

          this.list = this.utils$.getTreeData(response, 0);
        });
    },
    /**
     * 状态修改
     */
    userStatusCheckChangeHandller(item) {
      let params = {
        ID: item.ID,
        IsValide: item.IsValideCheck ? 1 : 0
      };

      adSystemDepartmentService
        .updateAdSystemDepartmentIsValideByID(params)
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
     * 编辑
     */
    btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });
      this.$router.push({ name: "adSysDepartmentModify", params: item });
    },
    /**
     * 删除
     */
    btnDeleteHandller(item) {
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
          adSystemDepartmentService
            .updateAdSystemDepartmentIsDelByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getAdSystemDepartmentList();
              } else {
                this.$message.info("删除失败");
              }
              close();
            });
        }
      });
    }
  }
};
</script>