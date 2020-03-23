<template>
  <ad-main :title="title" :back="true" class="ad-system-menu-modify">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12" v-if="params.id===0">
        <ad-example title="类型" required>
          <el-radio-group size="mini" v-model="params.type" @change="typeChangeHandller">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example :title="`${params.type==0?'目录':params.type==1?'菜单':'按钮'}名称`" required>
          <ad-input
            v-model="params.title"
            :placeholder="`请输入${params.type==0?'目录':params.type==1?'菜单':'按钮'}名称`"
          ></ad-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.type==1">
        <ad-example title="父级" required>
          <el-select size="mini" v-model="params.parentId" style="width:100%;">
            <el-option
              v-for="item in menuList"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID"
            >{{item.Title}}</el-option>
          </el-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.type==2">
        <ad-example title="父级" required>
          <el-select
            size="mini"
            v-model="params.parentId"
            popper-class="ad-system-menu-modify-select"
            style="width:100%;"
          >
            <el-option-group v-for="item in menuList" :key="item.ID" :label="item.Title">
              <el-option
                v-for="menu in item.children"
                :key="menu.ID"
                :label="menu.Title"
                :value="menu.ID"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{menu.Title}}</el-option>
            </el-option-group>
          </el-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example :title="`${params.type==0?'目录':params.type==1?'菜单':'按钮'}图标`">
          <ad-input
            v-model="params.icon"
            :placeholder="`请输入${params.type==0?'目录':params.type==1?'菜单':'按钮'}图标`"
          ></ad-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.type==1">
        <ad-example title="地址" required>
          <ad-input v-model="params.url" placeholder="请输入地址"></ad-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="排序值">
          <ad-input type="number" v-model="params.sort" placeholder="请输入排序值"></ad-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="是否有效">
          <ad-radio-group>
            <ad-radio name="isValide" label="1" v-model="params.isValide">是</ad-radio>
            <ad-radio name="isValide" label="0" v-model="params.isValide">否</ad-radio>
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
import adSystemMenuService from "../../../service/adSystemMenuService";
export default {
  name: "AdSystemMenuModifyComponent",
  data() {
    return {
      title: "系统菜单管理 / ",
      params: {
        id: 0,
        title: "",
        icon: "fa fa-laptop",
        url: "",
        path: "",
        otherId: 0,
        parentId: "",
        levelId: 0,
        type: 0,
        perms: "",
        sort: 100,
        isValide: 1
      },
      menuList: []
    };
  },
  created() {
    this.title += `${this.params.id === 0 ? "添加" : "编辑"}系统菜单`;

    let params = this.$route.params;

    if (params.id !== undefined) {
      if (params.parentId === 0) {
        params.parentId = "";
      }
      this.params = params;
    }
    if (this.params.type != 0) {
      this.getSystemMenuList(this.params.type);
    }
  },
  methods: {
    getSystemMenuList(type) {
      this.menuList = [];

      let params = {};

      params.IsDel = 1;
      params.IsValide = 1;

      if (type == 1) {
        params.ParentID = 0;
        params.Type = null;
      }

      if (type == 2) {
        params.ParentID = null;
        params.Type = null;
      }

      params.OrderBy = "Sort";
      params.IsDesc = false;

      adSystemMenuService.getSystemMenuList(params).then(response => {
        if (response.length > 0) {
          if (type == 1) {
            this.menuList = response;
          }

          if (type == 2) {
            response.forEach(menu => {
              if (menu.ParentID === 0) {
                menu.children = response.filter(e => e.ParentID === menu.ID);
                this.menuList.push(menu);
              }
            });
          }
        }
      });
    },
    /**
     *
     */
    typeChangeHandller(event) {
      this.params.parentId = "";
      if (event != 0) {
        this.getSystemMenuList(event);
      }
    },
    /**
     *
     */
    btnSave() {
      if (this.params.type == 0) {
        if (!this.params.title) {
          this.$tip("请填写目录名称");
          return;
        }
        this.params.parentId = 0;
        this.params.url = "#";
      }

      if (this.params.type == 1) {
        if (!this.params.title) {
          this.$tip("请填写菜单名称");
          return;
        }

        if (!this.params.parentId) {
          this.$tip("请选择父级");
          return;
        }

        if (!this.params.url) {
          this.$tip("请填写地址");
          return;
        }
      }

      if (this.params.type == 2) {
        if (!this.params.title) {
          this.$tip("请填写按钮名称");
          return;
        }

        if (!this.params.parentId) {
          this.$tip("请选择父级");
          return;
        }

        this.params.url = "-";
      }

      if (!this.params.icon) {
        this.params.icon = "fa fa-laptop";
      }

      if (!this.params.sort) {
        this.params.sort = 100;
      }

      let result = null;

      let model = {
        ID: this.params.id,
        Title: this.params.title,
        Icon: this.params.icon,
        Url: this.params.url,
        Path: this.params.path,
        OtherID: 0,
        ParentID: this.params.parentId,
        LevelID: this.params.levelId,
        Type: this.params.type,
        Perms: this.params.perms,
        Sort: this.params.sort,
        IsValide: this.params.isValide
      };

      if (model.ID === 0) {
        result = adSystemMenuService.addSystemMenu(model);
      } else {
        result = adSystemMenuService.updateSystemMenuByID(model);
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
