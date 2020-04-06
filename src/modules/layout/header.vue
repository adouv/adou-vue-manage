<template>
<header>
    <nav class="ad-header-navbar navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <!-- <i class="icon ti-arrow-left" v-show="showLeftIcon" @click="showMenuHandller('left');"></i> -->
            <i class="icon ti-menu" @click="showMenuHandller();"></i>
        </button>
        <div class="navbar-brand">
            <p>
                <i class="adiconfont ad-chengzi4"></i>&nbsp;梦橙
            </p>
            <p class="min-logo">
                <i class="adiconfont ad-chengzi4"></i>
            </p>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" @click="showToolsHandller();">
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
                <li class="nav-item dropdown show">
                    <a class="nav-link navbar-avatar" data-toggle="dropdown" href="javascript:;" aria-expanded="true" data-animation="scale-up" role="button">
                        <span class="avatar avatar-online">
                            <img :src="user.Avatar" alt="..." />
                            <i>{{user.UserName}}</i>
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
                        <a class="dropdown-item" href="javascript:void(0);" role="menuitem" @click="outHandller();">
                            <i class="icon wb-power"></i>
                            <span>退出</span>
                        </a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link navbar-avatar">
                        <span class="avatar">
                            <i>{{dept.Name}}</i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link navbar-avatar">
                        <span class="avatar">
                            <i>{{job.Name}}</i>
                        </span>
                    </a>
                </li>
                <li class="nav-item d-none d-sm-block" data-toggle="tooltip" data-placement="bottom" title="在手机上预览本页">
                    <a class="nav-link" href="#" data-toggle="modal">
                        <i class="icon wb-mobile"></i>
                        <span class="sr-only">在手机上预览</span>
                    </a>
                </li>
                <li class="nav-item d-none d-sm-block open-kf" data-toggle="tooltip" data-placement="bottom" title data-original-title="在线咨询">
                    <a class="nav-link" href="#" role="button">
                        <i class="icon wb-user"></i>
                        <span class="sr-only">在线咨询</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link msg-btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false" data-animation="scale-up" role="button">
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
                            <a class="dropdown-item" href="/system/account?tab=message" role="menuitem" target="_blank">
                                <i class="icon ti-menu"></i>所有消息
                            </a>
                        </div>
                    </ul>
                </li>
                <li class="nav-item d-none d-sm-block" data-toggle="tooltip" data-placement="bottom" title="设置主题与布局等">
                    <a class="nav-link">
                        <i class="icon wb-layout"></i>
                        <span class="sr-only">主题与布局</span>
                    </a>
                </li>
                <li class="nav-item d-none d-sm-block" data-toggle="tooltip" data-placement="bottom" title="全屏">
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
import PublicEnum from "../../enum/public.enum";
export default {
    name: "AdLayoutHeaderComponent",
    data() {
        return {
            user: {
                UserName: "",
                Avatar: ""
            },
            dept: {
                Name: ""
            },
            job: {
                Name: ""
            }
        };
    },
    mounted() {
        this.user = this.local$.getUser();
        if (!this.user.Avatar) {
            this.user.Avatar = require("../../assets/images/user9-200x200.png");
        }
        this.dept = JSON.parse(this.local$.getItem(PublicEnum.AD_LOCAL_USER_DEPT));
        this.job = JSON.parse(this.local$.getItem(PublicEnum.AD_LOCAL_USER_JOB));
    },
    methods: {
        /**
         * 手机端，左侧菜单显示隐藏
         */
        showMenuHandller(type) {
            if (!$("body").hasClass("site-mobile-menubar")) {
                $("body").addClass("site-mobile-menubar");
            } else {
                $("body").removeClass("site-mobile-menubar");
            }
        },
        /**
         * PC端左侧菜单显示隐藏
         */
        showToolsHandller() {
            $(".navbar-nav-right").toggle();
        },
        /**
         * PC端显示菜单为文件夹样式事件
         */
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
        },
        /**
         * 退出
         */
        outHandller() {
            this.local$.clear();
            window.location.href = "/";
        }
    }
};
</script>
