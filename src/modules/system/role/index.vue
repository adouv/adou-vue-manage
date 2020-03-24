<template>
  <ad-main :title="['系统角色管理']">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <ad-example title="角色名称">
          <a-input placeholder="角色名称" v-model="params.Name"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-6 col-md-4">
        <ad-example title="是否有效">
          <ad-select name="IsValide" v-model="params.IsValide">
            <option :value="-1">全部</option>
            <option :value="0">否</option>
            <option :value="1">是</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSystemRoleList()">搜索</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSysRoleModify'})">添加</a-button>
      </div>
    </div>

    <ad-table :columns="columns" :dataSource="list" :loading="loading" :minWidth="1000">
      <template slot="IsValide" slot-scope="rows">
        <a-switch
          v-model="rows.data.IsValideCheck"
          checkedChildren="启用"
          unCheckedChildren="禁用"
          @change="userStatusCheckChangeHandller(rows.data);"
        />
      </template>
      <template slot="Operating" slot-scope="rows">
        <a-button type="danger" size="small" @click.native="btnDeleteHandller(rows.data);">删除</a-button>
        <a-button type="primary" size="small" @click.native="btnModifyHandller(rows.data);">编辑</a-button>
      </template>
      <template slot="mobile" slot-scope="item">
        <a-list-item>
          <a-list-item-meta>
            <a slot="title">{{item.data.ID}}-{{item.data.Name}}</a>

            <template slot="description">
              <p>更新时间：{{item.data.ModifyTime|dateFormats}}</p>
              <p>
                <a-switch
                  v-model="item.data.IsValideCheck"
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  @change="userStatusCheckChangeHandller(item.data);"
                />
              </p>

              <a-button type="danger" size="small" @click.native="btnDeleteHandller(item.data);">删除</a-button>
              <a-button type="primary" size="small" @click.native="btnModifyHandller(item.data);">编辑</a-button>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </ad-table>
  </ad-main>
</template>

<script>
import adSystemRoleService from "../../../service/adSystemRoleService";
import adSystemMenuService from "../../../service/adSystemMenuService";
export default {
  name: "AdSystemRoleComponent",
  data() {
    return {
      params: {
        Name: "",
        IsValide: -1,
        IsDel: 1,
        OrderBy: "CreateTime",
        IsDesc: true,
        PageIndex: 1,
        PageSize: 10
      },
      columns: [
        {
          title: "编号",
          dataIndex: "ID",
          key: "ID",
          class: "mobild",
          width: "5%"
        },
        {
          title: "角色名称",
          dataIndex: "Name",
          key: "Name"
        },
        {
          title: "是否有效",
          dataIndex: "IsValide",
          key: "IsValide",
          width: "10%"
        },
        {
          title: "更新时间",
          dataIndex: "Time",
          key: "ModifyTime",
          width: "10%"
        },
        {
          title: "操作",
          dataIndex: "Operating",
          key: "Operating",
          width: "10%"
        }
      ],
      list: [],
      listTotal: 0,
      loading: true
    };
  },
  mounted() {
    this.getAdSystemRoleList();
  },
  methods: {
    /**
     * 获取角色列表
     */
    getAdSystemRoleList(pageIndex = 1) {
      this.loading = true;
      this.list = [];
      this.params.PageIndex = pageIndex;
      adSystemRoleService
        .GetSystemRolePageList(this.params)
        .then(response => {
          this.listTotal = response.TotalItems;
          this.params.PageIndex = response.CurrentPage;
          if (response.Items.length > 0) {
            response.Items.forEach(element => {
              element.IsValideCheck = element.IsValide === 1;
              this.list.push(element);
            });
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    /**
     * 是否有效
     */
    isValideChangeHandller(item) {
      let params = {
        ID: item.ID,
        IsValide: item.IsValideCheck ? 1 : 0
      };

      adSystemRoleService
        .UpdateSystemRoleIsValideByID(params)
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
     * 编辑角色
     */
    async btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });

      try {
        let result = await adSystemMenuService.getSystemMenuListByRoleID({
          RoleID: item.ID
        });

        let menuList = [];
        if (result.length > 0) {
          result.forEach(e => {
            menuList.push(e.ID);
          });
        }
        item.MenuList = menuList;
        this.$router.push({ name: "adSysRoleModify", params: item });
      } catch (error) {
        this.adSpin$.hide();
      }
    },
    /**
     * 删除角色回调事件
     */
    btnDeleteHandller(item, index) {
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
          adSystemRoleService
            .UpdateSystemRoleIsDelByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getAdSystemRoleList();
              } else {
                this.$message.error("删除失败");
              }
            });
        }
      });
    }
  }
};
</script>