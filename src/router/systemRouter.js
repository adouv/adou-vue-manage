/**
 * 系统管理 - 路由管理
 */

const routers = [{
        path: '/system/adSysUser',
        name: 'adSysUser',
        meta: {
            title: "系统管理 - 用户管理"
        },
        component: resolve => require(['@/modules/system/user/index'], resolve)
    },
    {
        path: '/system/adSysUserModify',
        name: 'adSysUserModify',
        meta: {
            title: "系统管理 - 编辑用户"
        },
        component: resolve => require(['@/modules/system/user/modify'], resolve)
    },
    {
        path: '/system/adSysRole',
        name: 'adSysRole',
        meta: {
            title: "系统管理 - 角色管理"
        },
        component: resolve => require(['@/modules/system/role/index'], resolve)
    },
    {
        path: '/system/adSysRoleModify',
        name: 'adSysRoleModify',
        meta: {
            title: "系统管理 - 编辑角色"
        },
        component: resolve => require(['@/modules/system/role/modify'], resolve)
    },
    {
        path: '/system/adSysMenu',
        name: 'adSysMenu',
        meta: {
            title: "系统管理 - 菜单管理"
        },
        component: resolve => require(['@/modules/system/menu/index'], resolve)
    },
    {
        path: '/system/adSysMenuModify',
        name: 'adSysMenuModify',
        meta: {
            title: "系统管理 - 编辑菜单"
        },
        component: resolve => require(['@/modules/system/menu/modify'], resolve)
    },
    {
        path: '/system/adSysMenuOperation',
        name: 'adSysMenuOperation',
        meta: {
            title: "系统管理 - 菜单权限"
        },
        component: resolve => require(['@/modules/system/menu/operation'], resolve)
    }
];

export default routers;