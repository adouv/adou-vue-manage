import Vue from "vue";
/**
 * 系统菜单服务
 */
export default {
    /**
     * 获取系统菜单列表
     * @param {*} params 
     * @param {*} config 
     */
    async getSystemMenuList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/GetSystemMenuListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 分页获取系统菜单列表
     * @param {*} params 
     * @param {*} config 
     */
    async getSystemMenuPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/GetSystemMenuPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过系统角色编号获取相应菜单列表
     * @param {*} params 
     * @param {*} config 
     */
    async getSystemMenuListByRoleID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/GetSystemMenuListByRoleIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过系统用户编号获取系统菜单列表
     * @param {*} params 
     * @param {*} config 
     */
    async GetSystemMenuListByUserID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/GetSystemMenuListByUserIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 添加系统菜单
     * @param {s} params 
     * @param {*} config 
     */
    async addSystemMenu(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/AddSystemMenuHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过编号删除系统菜单
     * @param {*} params 
     * @param {*} config 
     */
    async deleteSystemMenuByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/DeleteSystemMenuByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteSystemMenuByOtherID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/DeleteSystemMenuByOtherIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统菜单
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemMenuByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/UpdateSystemMenuByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemMenuByOtherID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/UpdateSystemMenuByOtherIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统菜单伪删除
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemMenuIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/UpdateSystemMenuIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemMenuIsDelByOtherID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/UpdateSystemMenuIsDelByOtherIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统菜单是否有效
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemMenuIsValideByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/UpdateSystemMenuIsValideByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 通过编号更新系统菜单排序值 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemMenuSortByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemMenu/UpdateSystemMenuSortByIDHandler.ashx`, params, config);
        return result;
    }
}