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
    async AddAdProductGroupAndCustomField(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/AddAdProductGroupAndCustomFieldHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async AddAdProductGroup(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/AddAdProductGroupHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductGroupAndCustomFieldByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/DeleteAdProductGroupAndCustomFieldByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductGroupByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/DeleteAdProductGroupByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductGroupList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/GetAdProductGroupListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductGroupPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/GetAdProductGroupPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductGroupAndCustomFieldByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/UpdateAdProductGroupAndCustomFieldByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductGroupAndCustomFieldIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/UpdateAdProductGroupAndCustomFieldIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductGroupByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/UpdateAdProductGroupByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductGroupIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/UpdateAdProductGroupIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductGroupSortByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProductGroup/UpdateAdProductGroupSortByIDHandler.ashx`, params, config);
        return result;
    }
}