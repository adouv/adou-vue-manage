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
    async getAdSystemJobInfoByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/GetAdSystemJobInfoByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSystemJobList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/GetAdSystemJobListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSystemJobPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/GetAdSystemJobPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSystemJob(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/AddAdSystemJobHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSystemJobByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/DeleteAdSystemJobByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSystemJobByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/UpdateAdSystemJobByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSystemJobIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/UpdateAdSystemJobIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSystemJobIsValideByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemJob/UpdateAdSystemJobIsValideByIDHandler.ashx`, params, config);
        return result;
    }
}