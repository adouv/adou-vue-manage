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
    async AddAdProductCustomField(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductCustomField/AddAdProductCustomFieldHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductCustomFieldByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductCustomField/DeleteAdProductCustomFieldByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductCustomFieldList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductCustomField/GetAdProductCustomFieldListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductCustomFieldPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductCustomField/GetAdProductCustomFieldPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductCustomFieldByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductCustomField/UpdateAdProductCustomFieldByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductCustomFieldIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductCustomField/UpdateAdProductCustomFieldIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}