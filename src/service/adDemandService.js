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
    async getAdDemandList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdDemand/GetAdDemandListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdDemandPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdDemand/GetAdDemandPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async insertAdDemand(params = {}, config = {}) {
        let result = await Vue.http.post(`AdDemand/AddAdDemandHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdDemandByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdDemand/UpdateAdDemandByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdDemandByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdDemand/DeleteAdDemandByIDHandler.ashx`, params, config);
        return result;
    }
}