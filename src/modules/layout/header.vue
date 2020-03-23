<template>
  <header>
    <nav class="ad-header-navbar navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="icon ti-arrow-left" v-show="showLeftIcon" @click="showMenuHandller('left');"></i>
        <i class="icon ti-menu" v-show="showMenuIcon" @click="showMenuHandller('menu');"></i>
      </button>
      <div class="navbar-brand">
        <p>
          <i class="adiconfont ad-chengzi4"></i>&nbsp;梦橙
        </p>
        <p class="min-logo">
          <i class="adiconfont ad-chengzi4"></i>
        </p>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="showToolsHandller();"
      >
        <i class="icon ti-more-alt"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav navbar-nav-left mr-auto">
          <li class="nav-toggle" @click="toggleHandller('fold');">
            <i class="icon ti-arrow-left"></i>
          </li>
          <li class="navbar-toggle-min" @click="toggleHandller('unfold');">
            <i class="icon ti-menu"></i>
          </li>
        </ul>
        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right navbar-nav-right">
          <li class="nav-item dropdown show" id="admui-navbarUser">
            <a
              class="nav-link navbar-avatar"
              data-toggle="dropdown"
              href="javascript:;"
              aria-expanded="true"
              data-animation="scale-up"
              role="button"
            >
              <span class="avatar avatar-online">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/avatar.svg" alt="..." />
                <i></i>
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-personal-info shadow" role="menu">
              <a class="dropdown-item" href="#" role="menuitem">
                <i class="icon wb-layout" aria-hidden="true"></i>
                <span>显示设置</span>
              </a>
              <a class="dropdown-item" href="javascript:void(0);" role="menuitem">
                <i class="icon wb-pencil" aria-hidden="true"></i>
                <span>修改密码</span>
              </a>
              <a class="dropdown-item" href="javascript:void(0);" role="menuitem">
                <i class="icon wb-settings" aria-hidden="true"></i>
                <span>账户信息</span>
              </a>
              <div class="dropdown-divider" role="presentation"></div>
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                id="admui-signOut"
                role="menuitem"
              >
                <i class="icon wb-power"></i>
                <span>退出</span>
              </a>
            </div>
          </li>
          <li
            class="nav-item d-none d-sm-block"
            data-toggle="tooltip"
            data-placement="bottom"
            title="在手机上预览本页"
          >
            <a class="nav-link" href="#" data-toggle="modal" data-target="#admui-mobileView">
              <i class="icon wb-mobile"></i>
              <span class="sr-only">在手机上预览</span>
            </a>
          </li>
          <li
            class="nav-item d-none d-sm-block open-kf"
            id="admui-service"
            data-toggle="tooltip"
            data-placement="bottom"
            title
            data-original-title="在线咨询"
          >
            <a class="nav-link" href="#" role="button">
              <i class="icon wb-user"></i>
              <span class="sr-only">在线咨询</span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link msg-btn"
              data-toggle="dropdown"
              href="javascript:;"
              aria-expanded="false"
              data-animation="scale-up"
              role="button"
            >
              <i class="icon wb-bell" aria-hidden="true"></i>
              <span class="badge badge-danger up msg-num"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-menu-media" role="menu">
              <li class="dropdown-menu-header" role="presentation">
                <h5>最新消息</h5>
                <span class="badge badge-round label-danger"></span>
              </li>
              <li class="list-group" role="presentation">
                <div>
                  <p class="text-center h-200 vertical-align">
                    <small class="vertical-align-middle opacity-four">没有新消息</small>
                  </p>
                </div>
              </li>
              <div class="dropdown-menu-footer" role="presentation">
                <a
                  class="dropdown-item"
                  href="/system/account?tab=message"
                  role="menuitem"
                  target="_blank"
                >
                  <i class="icon ti-menu"></i>所有消息
                </a>
              </div>
            </ul>
          </li>
          <li
            class="nav-item d-none d-sm-block"
            data-toggle="tooltip"
            data-placement="bottom"
            title="设置主题与布局等"
          >
            <a class="nav-link">
              <i class="icon wb-layout"></i>
              <span class="sr-only">主题与布局</span>
            </a>
          </li>
          <li
            class="nav-item d-none d-sm-block"
            id="admui-navbarFullscreen"
            data-toggle="tooltip"
            data-placement="bottom"
            title="全屏"
          >
            <a class="nav-link" href="javascript:; " role="button">
              <i class="icon wb-expand"></i>
              <span class="sr-only">全屏</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AdLayoutHeaderComponent",
  data() {
    return {
      showLeftIcon: true,
      showMenuIcon: false,
      sidebarWidth: 240
    };
  },
  methods: {
    showMenuHandller(type) {
      if (type === "left") {
        this.showLeftIcon = false;
        this.showMenuIcon = true;
        $(".ad-layout-sidebar").animate({ left: "0px" });
      } else {
        this.showLeftIcon = true;
        this.showMenuIcon = false;
        $(".ad-layout-sidebar").animate({ left: `-${this.sidebarWidth}px` });
      }
    },
    showToolsHandller() {
      $(".navbar-nav-right").toggle();
    },
    toggleHandller(type) {
      if (type === "fold") {
        $("body").removeClass("site-menubar-unfold");
        $("body").addClass("site-menubar-fold");
        $(".ad-layout-sidebar .site-menu").addClass("site-menu-fold");
      } else {
        $("body").removeClass("site-menubar-fold");
        $("body").addClass("site-menubar-unfold");
        $(".ad-layout-sidebar .site-menu").removeClass("site-menu-fold");
      }
    }
  }
};
</script>
