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
    async getAdSaleRoomListHandler(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSaleRoom/GetAdSaleRoomListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async getAdSaleRoomPageListHandler(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSaleRoom/GetAdSaleRoomPageListHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async addAdSaleRoomHandler(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSaleRoom/AddAdSaleRoomHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async deleteAdSaleRoomByIDHandler(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSaleRoom/DeleteAdSaleRoomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSaleRoomByIDHandler(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSaleRoom/UpdateAdSaleRoomByIDHandler.ashx`, params, config);
        return result;
    },
    /**
     * 
     * @param {*} params 
     * @param {*} config 
     */
    async updateAdSaleRoomIsDelByIDHandler(params = {}, config = {}) {
        let result = await Vue.http.post(`AdSaleRoom/UpdateAdSaleRoomIsDelByIDHandler.ashx`, params, config);
        return result;
    }
}