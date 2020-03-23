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
    async getAdSingleByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/GetAdSingleByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSingleList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/GetAdSingleListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSinglePageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/GetAdSinglePageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSingleByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/DeleteAdSingleByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSingle(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/AddAdSingleHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/UpdateAdSingleByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingle/UpdateAdSingleIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}