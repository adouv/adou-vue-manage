/**
 * 系统管理 - 路由管理
 */
const routers = [
    //系统用户管理
    {
        path: '/adSysUser',
        name: 'adSysUser',
        meta: {
            operating: ['add', 'del']
        },
        component: resolve => require(['@/modules/system/user/index'], resolve)
    },
    {
        path: '/adSysUserModify',
        name: 'adSysUserModify',
        component: resolve => require(['@/modules/system/user/modify'], resolve)
    },
    {
        path: '/adSysUserDetail',
        name: 'adSysUserDetail',
        component: resolve => require(['@/modules/system/user/detail'], resolve)
    },
];

export default routers;