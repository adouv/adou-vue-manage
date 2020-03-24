/**
 * 系统管理 - 路由管理
 */
const routers = [{
        path: '/adSysUser',
        name: 'adSysUser',
        meta: {
            title: "系统管理 - 用户管理"
        },
        component: resolve => require(['@/modules/system/user/index'], resolve)
    },
    {
        path: '/adSysUserModify',
        name: 'adSysUserModify',
        meta: {
            title: "系统管理 - 编辑用户"
        },
        component: resolve => require(['@/modules/system/user/modify'], resolve)
    },
    {
        path: '/adSysRole',
        name: 'adSysRole',
        meta: {
            title: "系统管理 - 角色管理"
        },
        component: resolve => require(['@/modules/system/role/index'], resolve)
    },
    {
        path: '/adSysRoleModify',
        name: 'adSysRoleModify',
        meta: {
            title: "系统管理 - 编辑角色"
        },
        component: resolve => require(['@/modules/system/role/modify'], resolve)
    },
    {
        path: '/adSysMenu',
        name: 'adSysMenu',
        meta: {
            title: "系统管理 - 菜单管理"
        },
        component: resolve => require(['@/modules/system/menu/index'], resolve)
    },
    {
        path: '/adSysMenuModify',
        name: 'adSysMenuModify',
        meta: {
            title: "系统管理 - 编辑菜单"
        },
        component: resolve => require(['@/modules/system/menu/modify'], resolve)
    },
];

export default routers;