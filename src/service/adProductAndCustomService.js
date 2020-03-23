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
    async AddAdProductAndCustom(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/AddAdProductAndCustomHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductAndCustomByGroupIDAndCustomFieldID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/DeleteAdProductAndCustomByGroupIDAndCustomFieldIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductAndCustomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/DeleteAdProductAndCustomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductAndCustomList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/GetAdProductAndCustomListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductAndCustomPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/GetAdProductAndCustomPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductAndCustomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/UpdateAdProductAndCustomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductAndCustomIsDelByGroupIDAndCustomFieldID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/UpdateAdProductAndCustomIsDelByGroupIDAndCustomFieldIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     */
    async UpdateAdProductAndCustomIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductAndCustom/UpdateAdProductAndCustomIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}