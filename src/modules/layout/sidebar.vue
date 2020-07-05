<template>
  <nav class="site-menubar site-menubar-dark ad-layout-sidebar ad-layout-sidebar-mobild">
    <div class="site-menubar-body">
      <div class="tab-content h-full">
        <div class="tab-pane animation-fade h-full active auto-scroll" role="tabpanel">
          <ul class="site-menu">
            <li class="site-menu-category"></li>
            <li class="site-menu-item">
              <a href="javascript:void(0);" @click="toPathHandller('home');">
                <i class="icon wb-dashboard"></i>
                <span class="site-menu-title">首页</span>
              </a>
            </li>
            <li class="site-menu-item" v-for="(item,index) in list" :key="index">
              <a href="javascript:void(0);" @click="showSubMenuHandller(item);">
                <i :class="item.icon"></i>
                <span class="site-menu-title">{{item.title}}</span>
                <span class="icon-right fa fa-angle-right"></span>
              </a>
              <ul class="site-menu-sub auto-scroll" v-show="item.isOpen">
                <li class="site-menu-item" v-for="(items,indexs) in item.children" :key="indexs">
                  <a href="javascript:void(0);" @click="toPathHandller(items);">
                    <i :class="items.icon"></i>
                    <span class="site-menu-title">{{items.title}}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import adSystemMenuService from "../../service/adSystemMenuService";
export default {
  name: "AdLayoutSidebarComponent",
  data() {
    return {
      list: [],
      user: {
        Avatar: ""
      }
    };
  },
  mounted() {
    this.user = this.local$.getUser();
    if (!this.user.Avatar) {
      this.user.Avatar = require("../../assets/images/user9-200x200.png");
    }

    this.getSystemMenuListByUser();
  },
  methods: {
    /**
     * 获取菜单列表
     */
    getSystemMenuListByUser() {
      let user = this.local$.getUser();

      this.list = [];

      if (user.UserType === 0) {
        adSystemMenuService
          .getSystemMenuListByUserID({
            UserID: user.ID,
            OrderBy: "Sort",
            IsDesc: false
          })
          .then(response => {
            if (response && response.length > 0) {
              this.list = this.utils$.getMenuTreeList(response, 0);
            }
          });
      } else {
        adSystemMenuService
          .getSystemMenuList({
            Title: null,
            ParentID: null,
            IsDel: 1,
            IsValide: 1,
            OrderBy: "Sort",
            IsDesc: false
          })
          .then(response => {
            if (response && response.length > 0) {
              this.list = this.utils$.getMenuTreeList(response, 0);
            }
          });
      }
    },
    /**
     * 显示、隐藏子菜单
     */
    showSubMenuHandller(item) {
      if (this.elem$.bodyHasClass("site-menubar-unfold")) {
        item.isOpen = !item.isOpen;

        this.list
          .filter(e => e.id !== item.id)
          .forEach(e => (e.isOpen = false));
      }
    },
    /**
     * 页面跳转
     */
    toPathHandller(item) {
      if (item === "home") {
        this.$router.push({ name: "home" });
        return;
      }
      this.local$.removeItem("LEFT_SIDEBAR_ITEM");
      this.local$.setItem("LEFT_SIDEBAR_ITEM", JSON.stringify(item));
      if (!$("body").hasClass("site-mobile-menubar")) {
        $("body").addClass("site-mobile-menubar");
      } else {
        $("body").removeClass("site-mobile-menubar");
      }
      if (item.otherId) {
        this.$router.push({ path: `/${item.url}/${item.otherId}` });
      } else {
        this.$router.push({ name: `${item.url}` });
      }
    }
  }
};
</script>
