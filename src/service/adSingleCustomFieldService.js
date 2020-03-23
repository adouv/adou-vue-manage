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
    async getAdSingleCustomFieldList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleCustomField/GetAdSingleCustomFieldListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSingleCustomFieldPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleCustomField/GetAdSingleCustomFieldPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSingleCustomFieldByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleCustomField/DeleteAdSingleCustomFieldByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSingleCustomField(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleCustomField/AddAdSingleCustomFieldHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleCustomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleCustomField/UpdateAdSingleCustomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleCustomFieldIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleCustomField/UpdateAdSingleCustomFieldIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}