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
    async AddAdArticle(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/AddAdArticleHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async DeleteAdArticleByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/DeleteAdArticleByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdArticleList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/GetAdArticleListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async GetAdArticlePageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/GetAdArticlePageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/UpdateAdArticleByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/UpdateAdArticleIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleIsRecomByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/UpdateAdArticleIsRecomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleIsTopByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/UpdateAdArticleIsTopByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async UpdateAdArticleReadCountByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdArticle/UpdateAdArticleReadCountByIDHandler.ashx`, params, config);
        return result;
    }
}