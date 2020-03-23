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
    async getAdSingleGroupList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/GetAdSingleGroupListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSingleGroupPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/GetAdSingleGroupPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteSingleGroupByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/DeleteSingleGroupByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteSingleGroupAndSingleCustomFieldByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/DeleteSingleGroupAndSingleCustomFieldByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSingleGroup(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/AddAdSingleGroupHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleGroupByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/UpdateAdSingleGroupByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleGroupIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/UpdateAdSingleGroupIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSingleGroupSortByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/UpdateAdSingleGroupSortByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSingleGroupAndSingleCustomFieldIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSingleGroup/UpdateSingleGroupAndSingleCustomFieldIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}