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
    async getSystemDictionaryList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/GetSystemDictionaryListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getSystemDictionaryPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/GetSystemDictionaryPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addSystemDictionary(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/AddSystemDictionaryHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemDictionaryByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/UpdateSystemDictionaryByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemDictionaryIsValideByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/UpdateSystemDictionaryIsValideByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateSystemDictionarySortByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/UpdateSystemDictionarySortByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteSystemDictionaryByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDictionary/DeleteSystemDictionaryByIDHandler.ashx`, params, config);
        return result;
    }
}