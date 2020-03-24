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
];

export default routers;