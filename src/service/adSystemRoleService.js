import Vue from "vue";
/**
 * 系统角色服务
 */
export default {
    /**
     * 获取系统角色列表
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async GetSystemRoleList(params = {}, config = {}) {
        let url = "GetSystemRoleListHandler.ashx";
        if (process.env.platform === "java") {
            url = "GetSystemRoleList";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 分页获取系统角色列表
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async GetSystemRolePageList(params = {}, config = {}) {
        let url = "GetSystemRolePageListHandler.ashx";
        if (process.env.platform === "java") {
            url = "GetSystemRolePageList";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过系统用户编号获取角色列表
     * @param {*} params 
     * @param {*} config 
     */
    async getSystemRoleListByUserID(params = {}, config = {}) {
        let url = "GetSystemRoleListByUserIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "GetSystemRoleListByUserID";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 添加系统角色
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async AddSystemRole(params = {}, config = {}) {
        let url = "AddSystemRoleHandler.ashx";
        if (process.env.platform === "java") {
            url = "AddSystemRole";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号删除系统角色
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async DeleteSystemRoleByID(params = {}, config = {}) {
        let url = "DeleteSystemRoleByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "DeleteSystemRoleByID";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统角色
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async UpdateSystemRoleByID(params = {}, config = {}) {
        let url = "UpdateSystemRoleByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemRoleByID";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统角色是否删除
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async UpdateSystemRoleIsDelByID(params = {}, config = {}) {
        let url = "UpdateSystemRoleIsDelByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemRoleIsDelByID";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统角色排序值
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async UpdateSystemRoleSortByID(params = {}, config = {}) {
        let url = "UpdateSystemRoleSortByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemRoleSortByID";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新角色是否有效
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateSystemRoleIsValideByID(params = {}, config = {}) {
        let url = "UpdateSystemRoleIsValideByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemRoleIsValideByID";
        }
        let result = await Vue.http.post(`AdSystemRole/${url}`, params, config);
        return result;
    }
}