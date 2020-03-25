import Vue from 'vue'
/**
 * 图标服务管理
 */
export default {
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getIconWebList(params = {}, config = {}) {
        config.params = params;
        config.baseURL = "/";
        let result = await Vue.http.get('static/icon/iconWeb.json', config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getIconThemifyList(params = {}, config = {}) {
        config.params = params;
        config.baseURL = "/";
        let result = await Vue.http.get('static/icon/iconThemify.json', config);
        return result;
    }
}