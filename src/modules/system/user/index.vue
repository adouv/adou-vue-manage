<template>
  <ad-main :title="['首页','系统管理','用户管理']" message="双击头像可查看详情">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <ad-example title="用户名">
          <a-input placeholder="用户名" v-model="params.UserName" />
        </ad-example>
      </div>

      <div class="col-sm-6 col-md-4">
        <ad-example title="是否超级管理员">
          <ad-select name="UserType" v-model="params.UserType">
            <option :value="-1">全部</option>
            <option :value="0">否</option>
            <option :value="1">是</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-6 col-md-4">
        <ad-example title="用户状态">
          <ad-select name="UserStatus" v-model="params.UserStatus">
            <option :value="-1">全部</option>
            <option :value="0">禁用</option>
            <option :value="1">启用</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSystemUserList()">搜索</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSysUserModify'})">添加</a-button>
      </div>
    </div>

    <ad-table
      :columns="columns"
      :dataSource="list"
      :loading="loading"
      :minWidth="1000"
      pagination
      :total="listTotal"
      :pageSize="params.PageSize"
      :pageIndex="params.PageIndex"
      @pageChange="getAdSystemUserList"
    >
      <template slot="Avatar" slot-scope="rows">
        <a-avatar :src="rows.data.Avatar" :size="30" @dblclick="btnDetailHandller(rows.data);" />
      </template>
      <template slot="Gender" slot-scope="rows">{{rows.data.Gender===1?'男':'女'}}</template>
    
      <template slot="UserStatus" slot-scope="rows">
        <a-switch
          v-model="rows.data.UserStatusCheck"
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
            <a slot="title">
              {{item.data.ID}}-{{item.data.UserName}}
              <a-tag
                :color=" (item.data.UserType===0 ? 'geekblue' : 'green')"
              >{{item.data.UserType===0?'管理员':'超级管理员'}}</a-tag>
            </a>
            <a-avatar slot="avatar" :src="item.data.Avatar" @click="btnDetailHandller(item.data);" />

            <template slot="description">
              <p>性别：{{item.data.Gender===1?'男':'女'}}</p>
              <p>邮箱：{{item.data.Email}}</p>
              <p>手机号：{{item.data.Mobile}}</p>
              <p>更新时间：{{item.data.ModifyTime|dateFormats}}</p>
              <p>
                <a-switch
                  v-model="item.data.UserStatusCheck"
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
import adSystemUserService from "../../../service/adSystemUserService";
import adSystemRoleService from "../../../service/adSystemRoleService";
import AdSystemUserDetailComponent from "./detail.vue";
export default {
  name: "AdSystemUserComponent",
  data() {
    return {
      params: {
        UserName: "",
        UserType: -1,
        UserStatus: -1,
        RoleID: 0,
        IsDel: 1,
        Gender: 0,
        Email: "",
        Mobile: "",
        DepartmentID: 0,
        JobID: 0,
        OrderBy: "CreateTime",
        IsDesc: true,
        PageIndex: 1,
        PageSize: 10
      },
      columns: [
        {
          title: "编号",
          dataIndex: "ID",
          key: "ID"
        },
        {
          title: "头像",
          dataIndex: "Avatar",
          key: "Avatar"
        },
        {
          title: "用户名",
          dataIndex: "UserName",
          key: "UserName"
        },
        {
          title: "性别",
          dataIndex: "Gender",
          key: "Gender"
        },
        {
          title: "邮箱",
          dataIndex: "Email",
          key: "Email"
        },
        {
          title: "手机号",
          dataIndex: "Mobile",
          key: "Mobile"
        },
        {
          title: "用户状态",
          dataIndex: "UserStatus",
          key: "UserStatus"
        },
        {
          title: "更新时间",
          dataIndex: "Time",
          key: "ModifyTime"
        },
        {
          title: "操作",
          dataIndex: "Operating",
          key: "Operating",
          width: "15%"
        }
      ],
      list: [],
      listTotal: 0,
      loading: true
    };
  },
  mounted() {
    this.getAdSystemUserList();
  },
  methods: {
    /**
     * 获取用户列表
     */
    getAdSystemUserList(pageIndex = 1) {
      this.loading = true;

      this.list = [];

      this.params.PageIndex = pageIndex;

      adSystemUserService
        .GetSystemUserPageList(this.params)
        .then(response => {
          this.listTotal = response.TotalItems;
          this.params.PageIndex = response.CurrentPage;
          if (response.Items.length > 0) {
            response.Items.forEach(element => {
              if (!element.Avatar) {
                element.Avatar = require("../../../assets/images/user9-200x200.png");
              }
              element.UserStatusCheck = element.UserStatus === 1;
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
     * 设置用户状态
     */
    userStatusCheckChangeHandller(item) {
      let params = {
        ID: item.ID,
        UserStatus: item.UserStatusCheck ? 1 : 0
      };

      adSystemUserService.UpdateSystemUserStatusByID(params).then(response => {
        if (response > 0) {
          if (params.UserStatus === 1) {
            this.$message.info("已启用");
          } else {
            this.$message.info("已禁用");
          }
        } else {
          this.$message.error("设置失败");
        }
      });
    },
    /**
     * 查看详情
     */
    async btnDetailHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });
      try {
        let result = await adSystemRoleService.getSystemRoleListByUserID({
          UserID: item.ID
        });

        item.RoleList = [];

        if (result.length > 0) {
          item.RoleList = result;
        }

        this.adModal$({
          visible: true,
          title: `${item.UserName} - 个人信息`,
          cancelText: "关闭",
          okTextShow: false,
          componentName: AdSystemUserDetailComponent,
          params: item
        });

        this.adSpin$.hide();
      } catch (error) {
        this.adSpin$.hide();
      }
    },
    /**
     * 修改用户回调事件
     * @param {*} item
     */
    async btnModifyHandller(item) {
      try {
        this.adSpin$.show({ tip: "正在加载..." });

        let params = {
          UserID: item.ID
        };

        let result = await adSystemRoleService.getSystemRoleListByUserID({
          UserID: item.ID
        });

        item.RoleList = [];

        if (result.length > 0) {
          result.forEach(e => {
            item.RoleList.push(e.ID);
          });
        }

        this.$router.push({ name: "adSysUserModify", params: item });
      } catch (error) {
        this.adSpin$.hide();
      }
    },
    /**
     * 删除用户回调事件
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
          adSystemUserService
            .UpdateSystemUserIsDelByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getAdSystemUserList();
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