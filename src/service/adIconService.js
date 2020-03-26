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
        let random = Math.random() * 1000 + 100;
        config.params = params;
        config.baseURL = "/";
        let result = await Vue.http.get(`static/icon/iconWeb.json?${random}`, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getIconThemifyList(params = {}, config = {}) {
        let random = Math.random() * 1000 + 100;
        config.params = params;
        config.baseURL = "/";
        let result = await Vue.http.get(`static/icon/iconThemify.json?${random}`, config);
        return result;
    },
    /**
     * 
     * @param {*} param 
     * @param {*} config 
     */
    async getIconIonList(params = {}, config = {}) {
        let random = Math.random() * 1000 + 100;
        config.params = params;
        config.baseURL = "/";
        let result = await Vue.http.get(`static/icon/iconIon.json?${random}`, config);
        return result;
    },
    /**
     * 
     * @param {*} param 
     * @param {*} config 
     */
    async getIconFontAwesomeList(params = {}, config = {}) {
        let random = Math.random() * 1000 + 100;
        config.params = params;
        config.baseURL = "/";
        let result = await Vue.http.get(`static/icon/iconFontAwesome.json?${random}`, config);
        return result;
    }
}