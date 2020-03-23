import Vue from 'vue'
/**
 * 
 */
export default {
    /**
     * 文件上传
     * @param {*} params 
     * @param {*} config 
     */
    async uploadFile(params = {}, config = {}) {
        config.baseURL = "/_Ashx/UE/";
        let result = await Vue.http.post(`ControllerHandler.ashx?auto=auto&action=uploadimage`, params, config);
        return result;
    },
    /**
     * kindeditor编辑器，文件上传
     * @param {*} params 
     * @param {*} config 
     */
    async uploadKeFile(params = {}, config = {}) {
        config.baseURL = "/_Ashx/KE/";
        let result = await Vue.http.post(`upload_json.ashx?auto=auto&dir=${config.dir}`, params, config);
        return result;
    },
    /**
     * 获取文件列表
     * @param {*} params 
     * @param {*} config 
     */
    async getFileList(params = {}, config = {}) {
        config.baseURL = "/_Ashx/KE/";
        config.params = params;
        let result = await Vue.http.get(`file_manager_json.ashx`, config);
        return result;
    }
}