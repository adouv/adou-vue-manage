import Vue from "vue";
/**
 * 系统用户服务
 */
export default {
    /**
     * 系统用户登录
     * @param {*} params 
     * @param {*} config 
     */
    async SystemUserLogin(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemUser/SystemUserLoginHandler.ashx`, params, config);
        return result;
    },
    /**
     * 获取系统用户列表
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async GetSystemUserList(params = {}, config = {}) {
        let url = "GetSystemUserListHandler.ashx";
        if (process.env.platform === "java") {
            url = "GetSystemUserList";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 分页获取系统用户列表
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async GetSystemUserPageList(params = {}, config = {}) {
        let url = "GetSystemUserPageListHandler.ashx";
        if (process.env.platform === "java") {
            url = "GetSystemUserPageList";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 添加系统用户
     * @param {*} params 参数s
     * @param {*} config 配置
     */
    async AddSystemUser(params = {}, config = {}) {
        let url = "AddSystemUserHandler.ashx";
        if (process.env.platform === "java") {
            url = "AddSystemUser";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号删除系统用户
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async DeleteSystemUserByID(params = {}, config = {}) {
        let url = "DeleteSystemUserByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "DeleteSystemUserByID";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统用户
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async UpdateSystemUserByID(params = {}, config = {}) {
        let url = "UpdateSystemUserByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemUserByID";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统用户是否删除
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async UpdateSystemUserIsDelByID(params = {}, config = {}) {
        let url = "UpdateSystemUserIsDelByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemUserIsDelByID";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统用户排序值
     * @param {*} params 参数
     * @param {*} config 配置
     */
    async UpdateSystemUserSortByID(params = {}, config = {}) {
        let url = "UpdateSystemUserSortByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemUserSortByID";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateSystemUserStatusByID(params = {}, config = {}) {
        let url = "UpdateSystemUserStatusByIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "UpdateSystemUserStatusByID";
        }
        let result = await Vue.http.post(`AdSystemUser/${url}`, params, config);
        return result;
    }
}