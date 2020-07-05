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
    async getAdSalesProjectList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesProject/GetAdSalesProjectListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSalesProjectPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesProject/GetAdSalesProjectPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSalesProject(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesProject/AddAdSalesProjectHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSalesProjectByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesProject/DeleteAdSalesProjectByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSalesProjectByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesProject/UpdateAdSalesProjectByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSalesProjectIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSalesProject/UpdateAdSalesProjectIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}