/**
 * 系统管理 - 路由管理
 */

const routers = [{
        path: '/systemDev/adSysDevSingleConfig',
        name: 'adSysDevSingleConfig',
        meta: {
            title: "系统开发配置 - 单页资料配置"
        },
        component: resolve => require(['@/modules/systemDevelopment/singleConfig/index'], resolve)
    },
    {
        path: '/systemDev/adSysDevSingleConfigModify',
        name: 'adSysDevSingleConfigModify',
        meta: {
            title: "系统开发配置 - 编辑单页资料配置"
        },
        component: resolve => require(['@/modules/systemDevelopment/singleConfig/modify'], resolve)
    },
    {
        path: '/systemDev/adSysDevSingleGroupConfig',
        name: 'adSysDevSingleGroupConfig',
        meta: {
            title: "系统开发配置 - 单页分类配置"
        },
        component: resolve => require(['@/modules/systemDevelopment/singleGroupConfig/index'], resolve)
    },
    {
        path: '/systemDev/adSysDevSingleGroupConfigModify',
        name: 'adSysDevSingleGroupConfigModify',
        meta: {
            title: "系统开发配置 - 编辑单页分类配置"
        },
        component: resolve => require(['@/modules/systemDevelopment/singleGroupConfig/modify'], resolve)
    },
    {
        path: '/systemDev/adSysDevProductGroupConfig',
        name: 'adSysDevProductGroupConfig',
        meta: {
            title: "系统开发配置 - 产品分类配置"
        },
        component: resolve => require(['@/modules/systemDevelopment/productGroupConfig/index'], resolve)
    },
    {
        path: '/systemDev/adSysDevArticleGroupConfig',
        name: 'adSysDevArticleGroupConfig',
        meta: {
            title: "系统开发配置 - 文章分类配置"
        },
        component: resolve => require(['@/modules/systemDevelopment/articleGroupConfig/index'], resolve)
    }
];

export default routers;