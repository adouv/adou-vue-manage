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
    async getAdSingleAndCustomList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/GetAdSingleAndCustomListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSingleAndCustomPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/GetAdSingleAndCustomPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSingleAndCustomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/DeleteAdSingleAndCustomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSingleAndCustom(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/AddAdSingleAndCustomHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleAndCustomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/UpdateAdSingleAndCustomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleAndCustomIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/UpdateAdSingleAndCustomIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     */
    async updateAdSingleAndCustomIsDelByGroupIDAndCustomFieldID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleAndCustom/UpdateAdSingleAndCustomIsDelByGroupIDAndCustomFieldIDHandler.ashx`, params, config);
        return result;
    }
}