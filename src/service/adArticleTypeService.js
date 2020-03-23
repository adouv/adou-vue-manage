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
    async AddAdArticleType(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticleType/AddAdArticleTypeHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdArticleByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticleType/DeleteAdArticleByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdArticleTypeList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticleType/GetAdArticleTypeListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdArticleTypePageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticleType/GetAdArticleTypePageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleTypeByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticleType/UpdateAdArticleTypeByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleTypeIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticleType/UpdateAdArticleTypeIsDelByIDHandler.ashx`, params, config);
        return result;
    },
}