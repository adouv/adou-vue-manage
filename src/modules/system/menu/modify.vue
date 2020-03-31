<template>
  <ad-main :title="['首页','系统管理','菜单管理',`${params.ID === 0 ? '添加' : '编辑'}菜单`]" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="菜单类型" required>
          <a-radio-group v-model="params.Type" buttonStyle="solid">
            <a-radio-button :value="0">目录</a-radio-button>
            <a-radio-button :value="1">菜单</a-radio-button>
          </a-radio-group>
        </ad-example>
      </div>
      <div class="col-sm-12 col-md-12">
        <ad-example title="菜单名称" required>
          <a-input v-model="params.Title" placeholder="请输入菜单名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="上级栏目" required>
          <ad-select name="ParentID" v-model="params.ParentID">
            <option :value="0">顶级类目</option>
            <option v-for="(item,index) in menuList" :key="index" :value="item.ID">{{item.Title}}</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="路由地址" required>
          <a-input v-model="params.Url" placeholder="请输入路由地址"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="页面路径" required>
          <a-input v-model="params.Path" placeholder="请输入页面路径"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="组件名称" required>
          <a-input v-model="params.ComponentName" placeholder="请输入组件名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="权限标识" required>
          <a-input v-model="params.Perms" placeholder="请输入权限标识"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="图标" des="点击图标进行更换">
          <a-avatar
            shape="square"
            :size="32"
            :style="{backgroundColor: '#1d6ad2', verticalAlign: 'middle',cursor:'pointer'}"
            @click="selectIconHandller();"
          >
            <i :class="params.Icon" style="font-size:20px"></i>
          </a-avatar>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="排序值">
          <a-input type="number" v-model="params.Sort" placeholder="请输入排序值"></a-input>
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
        <a-button type="primary" @click.native="btnSave()">保存</a-button>
      </div>
    </div>
  </ad-main>
</template>

<script>
import adSystemMenuService from "../../../service/adSystemMenuService";
import AdIconListBaseComponent from "../../../components/base/adIconList/index.vue";
export default {
  name: "AdSystemMenuModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Title: "",
        Icon: "",
        Url: "",
        Path: "",
        ComponentName: "",
        OtherID: 0,
        ParentID: 0,
        LevelID: 0,
        Type: 0,
        Perms: "",
        Sort: 100,
        IsExternalLink: false,
        IsValide: 1,
        IsDel: 1
      },
      menuList: []
    };
  },
  created() {
    let params = this.$route.params;

    console.log(params);

    if (params.ID !== undefined) {
      this.params = params;
    }

    if (!this.params.Icon) {
      this.params.Icon = "fa fa-file-image-o";
    }

    this.getSystemMenuList();
  },
  methods: {
    /**
     * 获取根菜单列表
     */
    getSystemMenuList() {
      this.menuList = [];

      let params = {
        ParentID: 0,
        IsDel: 1,
        IsValide: 1,
        OrderBy: "Sort",
        IsDesc: false
      };

      adSystemMenuService
        .getSystemMenuList(params)
        .then(response => {
          if (response.length > 0) {
            this.menuList = response;
          }
          this.adSpin$.hide();
        })
        .catch(error => {
          this.adSpin$.hide();
        });
    },
    /**
     * 选择图标回调事件
     */
    selectIconHandller() {
      this.adModal$({
        visible: true,
        title: `选择图标`,
        cancelText: "关闭",
        componentName: AdIconListBaseComponent,
        params: {},
        okHandller: (options, close) => {
          this.params.Icon = options.params.IconData.icon;
          close();
        }
      });
    },
    /**
     * 保存
     */
    btnSave() {
      if (!this.params.Title) {
        this.$message.info("请填菜单名称");
        return;
      }

      if (this.params.ParentID !== 0) {
        if (!this.params.Url) {
          this.$message.info("请填写地址");
          return;
        }
      }

      if (!this.params.Sort) {
        this.params.Sort = 100;
      }

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemMenuService.addSystemMenu(this.params);
      } else {
        result = adSystemMenuService.updateSystemMenuByID(this.params);
      }

      result.then(response => {
        if (response > 0 && response !== null) {
          this.$message.info("保存成功");
        } else {
          this.$message.info("保存失败");
        }
        this.$router.go(-1);
      });
    }
  }
};
</script>
