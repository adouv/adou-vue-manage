<template>
  <ad-main
    :title="['系统角色管理',`${params.ID === 0 ? '添加' : '编辑'}系统角色`]"
    back
    class="ad-system-role-modify"
  >
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="角色" required>
          <a-input v-model="params.Name" placeholder="请输入角色"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="菜单">
          <div class="td-tree-list" v-if="menuList.length!==0">
            <a-tree
              checkable
              :treeData="menuList"
              :selectedKeys="defaultKey"
              :autoExpandParent="true"
              v-model="params.MenuList"
            ></a-tree>
          </div>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="是否有效">
          <a-radio-group v-model="params.IsValide" buttonStyle="solid" size="small">
            <a-radio-button :value="0">否</a-radio-button>
            <a-radio-button :value="1">是</a-radio-button>
          </a-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="secondary" @click.native="$router.go(-1);">返回</a-button>
        <a-button type="primary" @click.native="btnSave()">保存</a-button>
      </div>
    </div>
  </ad-main>
</template>

<script>
import adSystemRoleService from "../../../service/adSystemRoleService";
import adSystemMenuService from "../../../service/adSystemMenuService";
export default {
  name: "AdSystemRoleModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Name: "",
        Sort: 100,
        IsValide: 1,
        MenuList: []
      },
      menuList: [],
      defaultKey: []
    };
  },
  created() {},
  mounted() {
    let params = this.$route.params;
    if (params.ID !== undefined) {
      this.params = params;
    }

    this.getSystemMenuList();
  },
  methods: {
    /**
     * 获取菜单列表
     */
    getSystemMenuList() {
      this.menuList = [];
      this.defaultKey = [];

      let params = {
        IsDel: 1,
        IsValide: 1,
        ParentID: null
      };

      adSystemMenuService
        .getSystemMenuList(params)
        .then(response => {
          if (response.length > 0) {
            this.menuList = this.utils$.getTreeData(response, 0);
          }
          this.adSpin$.hide();
        })
        .catch(err => {
          this.adSpin$.hide();
        });
    },
    /**
     * 保存
     */
    btnSave() {
      if (!this.params.Name) {
        this.$message.info("请填写角色名称");
        return;
      }

      if (this.params.MenuList.length === 0) {
        this.$message.info("至少选择一个菜单");
        return;
      }

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemRoleService.AddSystemRole(this.params);
      } else {
        result = adSystemRoleService.UpdateSystemRoleByID(this.params);
      }

      result.then(response => {
        if (response > 0 && response !== null) {
          this.$message.info("保存成功");
        } else {
          this.$message.error("保存失败");
        }
        this.$router.go(-1);
      });
    }
  }
};
</script>