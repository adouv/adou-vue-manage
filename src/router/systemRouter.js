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
    },
    {
        path: '/system/adSysDepartment',
        name: 'adSysDepartment',
        meta: {
            title: "系统管理 - 部门管理"
        },
        component: resolve => require(['@/modules/system/department/index'], resolve)
    },
    {
        path: '/system/adSysDepartmentModify',
        name: 'adSysDepartmentModify',
        meta: {
            title: "系统管理 - 编辑部门"
        },
        component: resolve => require(['@/modules/system/department/modify'], resolve)
    },
    {
        path: '/system/adSysJob',
        name: 'adSysJob',
        meta: {
            title: "系统管理 - 岗位管理"
        },
        component: resolve => require(['@/modules/system/job/index'], resolve)
    },
    {
        path: '/system/adSysJobModify',
        name: 'adSysJobModify',
        meta: {
            title: "系统管理 - 编辑岗位"
        },
        component: resolve => require(['@/modules/system/job/modify'], resolve)
    },
    {
        path: '/system/adSysDictionary',
        name: 'adSysDictionary',
        meta: {
            title: "系统管理 - 字典管理"
        },
        component: resolve => require(['@/modules/system/dictionary/index'], resolve)
    },
    {
        path: '/system/adSysDictionaryModify',
        name: 'adSysDictionaryModify',
        meta: {
            title: "系统管理 - 编辑字典"
        },
        component: resolve => require(['@/modules/system/dictionary/modify'], resolve)
    },
    {
        path: "/system/adSysIcon",
        name: "adSysIcon",
        meta: {
            title: "系统管理 - 图标管理"
        },
        component: resolve => require(['@/modules/system/icon/index'], resolve)
    }
];

export default routers;