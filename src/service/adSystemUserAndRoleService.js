import Vue from 'vue';
/**
 * 系统用户角色服务
 */
export default {
    /**
     * 添加系统用户角色
     * @param {*} params 
     * @param {*} config 
     */
    async addSystemUserAndRole(params = {}, config = {}) {
        let url = "AddSystemUserAndRoleHandler.ashx";
        if (process.env.platform === "java") {
            url = "AddSystemUserAndRole";
        }
        let result = await Vue.http.post(`AdSystemUserAndRole/${url}`, params, config);
        return result;
    },
    /**
     * 通过系统用户编号删除用户角色
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteSystemUserAndRoleByUserID(params = {}, config = {}) {
        let url = "DeleteSystemUserAndRoleByUserIDHandler.ashx";
        if (process.env.platform === "java") {
            url = "DeleteSystemUserAndRoleByUserID";
        }
        let result = await Vue.http.post(`AdSystemUserAndRole/${url}`, params, config);
        return result;
    }
}