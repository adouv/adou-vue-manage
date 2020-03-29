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
    async getAdSystemDepartmentInfoByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/GetAdSystemDepartmentInfoByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSystemDepartmentList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/GetAdSystemDepartmentListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSystemDepartmentPageList(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/GetAdSystemDepartmentPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSystemDepartment(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/AddAdSystemDepartmentHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSystemDepartmentByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/DeleteAdSystemDepartmentByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSystemDepartmentByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/UpdateAdSystemDepartmentByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSystemDepartmentIsDelByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/UpdateAdSystemDepartmentIsDelByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSystemDepartmentIsValideByID(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSystemDepartment/UpdateAdSystemDepartmentIsValideByIDHandler.ashx`, params, config);
        return result;
    }
}