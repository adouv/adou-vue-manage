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
    async AddAdProduct(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/AddAdProductHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdProductByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/DeleteAdProductByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/GetAdProductListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdProductPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/GetAdProductPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/UpdateAdProductByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/UpdateAdProductIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductIsRecomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/UpdateAdProductIsRecomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductIsTopByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/UpdateAdProductIsTopByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdProductReadCountByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdProduct/UpdateAdProductReadCountByIDHandler.ashx`, params, config);
        return result;
    }
}