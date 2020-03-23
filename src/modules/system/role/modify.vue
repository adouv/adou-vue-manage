<template>
  <ad-main :title="title" :back="true" class="ad-system-role-modify">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="角色" required>
          <ad-input v-model="params.Name" placeholder="请输入角色"></ad-input>
        </ad-example>
      </div>

      <!-- <div class="col-sm-12 col-md-12">
        <ad-example title="排序值">
          <ad-input type="number" v-model="params.Sort" placeholder="请输入排序值"></ad-input>
        </ad-example>
      </div>-->

      <div class="col-sm-12 col-md-12">
        <ad-example title="菜单">
          <div class="td-tree-list" v-if="menuList.length!==0">
            <el-tree
              default-expand-all
              :default-checked-keys="defaultKey"
              :data="menuList"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
            >
              <span class="custom-tree-node" slot-scope="{ node }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="是否有效">
          <ad-radio-group>
            <ad-radio name="IsValide" label="1" v-model="params.IsValide">是</ad-radio>
            <ad-radio name="IsValide" label="0" v-model="params.IsValide">否</ad-radio>
          </ad-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-button type="secondary" @click.native="$router.go(-1);">返回</ad-button>
        <ad-button type="primary" @click.native="btnSave()">保存</ad-button>
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
      title: "系统角色管理 / ",
      params: {
        ID: 0,
        Name: "",
        Sort: 100,
        IsValide: 1,
        MenuList: []
      },
      menuList: [],
      defaultKey: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.title += `${this.params.ID === 0 ? "添加" : "编辑"}系统角色`;

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
      let _this = this;
      this.menuList = [];
      this.defaultKey = [];

      let params = {
        IsDel: 1,
        IsValide: 1,
        ParentID: null
      };

      adSystemMenuService.getSystemMenuList(params).then(response => {
        if (response.length > 0) {
          response.forEach(element => {
            if (_this.params.MenuList.length > 0) {
              let include = _this.params.MenuList.find(
                e => e.ID === element.ID
              );
              if (include !== undefined) {
                _this.defaultKey.push(include.ID);
              }
            }
          });

          let list = response;

          list
            .filter(e => e.ParentID === 0)
            .forEach(element => {
              _this.menuList.push({
                id: element.ID,
                label: element.Title,
                pid: element.ParentID,
                children: []
              });
            });

          let temp = list.filter(e => e.ParentID !== 0);

          _this.menuList.forEach(item => {
            item.children = [];
            let children = temp.filter(e => e.ParentID === item.id);
            if (children.length > 0) {
              children.forEach(items => {
                item.children.push({
                  id: items.ID,
                  label: items.Title,
                  pid: items.ParentID
                });
              });
            }
          });
        }
      });
    },
    btnSave() {
      let halfCheckMenus = this.$refs.tree.getHalfCheckedNodes();
      let checkMenus = this.$refs.tree.getCheckedNodes();
      // let selectMenus = halfCheckMenus.concat(checkMenus);
      let selectMenus = checkMenus;

      if (!this.params.Name) {
        this.$tip("请填写角色名称");
        return;
      }

      // if (!this.params.Sort) {
      //   this.params.Sort = 100;
      // }

      if (selectMenus.length === 0) {
        this.$tip("至少选择一个菜单");
        return;
      }

      this.params.MenuList = [];

      selectMenus.forEach(item => {
        this.params.MenuList.push(item.id);
      });

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemRoleService.AddSystemRole(this.params);
      } else {
        result = adSystemRoleService.UpdateSystemRoleByID(this.params);
      }

      result.then(response => {
        if (response > 0 && response !== null) {
          this.$tip("保存成功");
        } else {
          this.$tip("保存失败");
        }
        this.$router.go(-1);
      });
    }
  }
};
</script>