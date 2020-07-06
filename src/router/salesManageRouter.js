/**
 * 系统管理 - 路由管理
 */

const routers = [{
        path: '/salesManage/adSalesProject',
        name: 'adSalesProject',
        meta: {
            title: "销控管理 - 项目管理"
        },
        component: resolve => require(['@/modules/salesManage/project/index'], resolve)
    },
    {
        path: '/salesManage/adSalesProjectModify',
        name: 'adSalesProjectModify',
        meta: {
            title: "销控管理 - 编辑项目"
        },
        component: resolve => require(['@/modules/salesManage/project/modify'], resolve)
    },
    {
        path: '/salesManage/adSalesBuilding',
        name: 'adSalesBuilding',
        meta: {
            title: "销控管理 - 楼房管理"
        },
        component: resolve => require(['@/modules/salesManage/building/index'], resolve)
    },
    {
        path: '/salesManage/adSalesBuildingModify',
        name: 'adSalesBuildingModify',
        meta: {
            title: "销控管理 - 编辑项目"
        },
        component: resolve => require(['@/modules/salesManage/building/modify'], resolve)
    }
];

export default routers;