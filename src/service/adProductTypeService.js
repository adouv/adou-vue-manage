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
    async AddAdProductType(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/AddAdProductTypeHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/DeleteAdProductByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductTypeList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/GetAdProductTypeListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductTypePageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/GetAdProductTypePageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductTypeByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/UpdateAdProductTypeByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductTypeIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/UpdateAdProductTypeIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductTypeAndProductIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductType/UpdateAdProductTypeAndProductIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}