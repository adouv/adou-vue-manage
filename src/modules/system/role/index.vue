<template>
  <ad-main title="系统角色管理" class="ad-system-role">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">角色名称</h4>
          <ad-input placeholder="角色名称" v-model="params.Name"></ad-input>
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">是否有效</h4>
          <select class="form-control medium" name="IsValide" v-model="params.IsValide">
            <option value="-1">全部</option>
            <option value="0">否</option>
            <option value="1">是</option>
          </select>
        </div>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-button type="inverse" @click.native="getAdSystemRoleList()">搜索</ad-button>
        <ad-button type="primary" @click.native="$router.push({name:'adSysRoleModify'})">添加</ad-button>
      </div>
    </div>

    <ad-table :headers="headers" :list="list">
      <tbody>
        <tr v-for="item in list" :key="item.Id">
          <td>{{item.ID}}</td>
          <td>{{item.Name}}</td>
          <td>
            <el-switch
              v-model="item.IsValideCheck"
              @change="isValideChangeHandller(item)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </td>
          <td>{{item.ModifyTime|dateFormats}}</td>
          <td>
            <ad-button type="danger" size="sm" @click.native="btnDeleteHandller(item);">删除</ad-button>
            <ad-button type="primary" size="sm" @click.native="btnModifyHandller(item);">编辑</ad-button>
          </td>
        </tr>
      </tbody>
    </ad-table>

    <ad-pagination
      :total="listTotal"
      :pageIndex="params.PageIndex"
      @currentChange="getAdSystemRoleList"
    ></ad-pagination>
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
      headers: ["编号", "角色名称", "是否有效", "更新时间", "操作"],
      list: [],
      listTotal: 0
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
      this.list = [];
      this.params.PageIndex = pageIndex;
      adSystemRoleService.GetSystemRolePageList(this.params).then(response => {
        this.listTotal = response.TotalItems;
        this.params.PageIndex = response.CurrentPage;
        if (response.Items.length > 0) {
          response.Items.forEach(element => {
            element.IsValideCheck = element.IsValide === 1;
            this.list.push(element);
          });
        }
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
     * 编辑角色
     */
    btnModifyHandller(item) {
      let params = {
        RoleID: item.ID
      };

      adSystemMenuService.getSystemMenuListByRoleID(params).then(response => {
        let menuList = [];
        if (response.length > 0) {
          menuList = response;
        }
        item.MenuList = menuList;
        this.$router.push({ name: "adSysRoleModify", params: item });
      });
    },
    /**
     * 删除角色回调事件
     */
    btnDeleteHandller(item, index) {
      let _this = this;
      let options = {};
      options.title = "确认提示";
      options.message = "确认要删除吗？";
      options.params = {
        ID: item.ID,
        IsDel: 0
      };
      options.save = (params, close) => {
        adSystemRoleService.UpdateSystemRoleIsDelByID(params).then(response => {
          if (response > 0) {
            _this.$tip("删除成功");
            _this.getAdSystemRoleList();
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