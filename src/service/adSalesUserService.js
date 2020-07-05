import Vue from 'vue'
/**
 * 
 */
export default {
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSalesUserList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesUser/GetAdSalesUserListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSalesUserPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesUser/GetAdSalesUserPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSalesUser(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesUser/AddAdSalesUserHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSalesUserByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesUser/DeleteAdSalesUserByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSalesUserByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesUser/UpdateAdSalesUserByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSalesUserIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesUser/UpdateAdSalesUserIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}