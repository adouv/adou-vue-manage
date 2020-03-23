import publicEnum from "../enum/public.enum"
/** 
 * 本地存储服务
 */
export default {
    /**
     * 通过key获取本地存储
     * @param {*} key 键
     */
    getItem(key) {
        return localStorage.getItem(key)
    },
    /**
     * 设置本地存储
     * @param {*} key 键
     * @param {*} value 值
     */
    setItem(key, value) {
        localStorage.setItem(key, value)
    },
    /**
     * 清楚所有本地存储
     */
    clear() {
        localStorage.clear()
    },
    /**
     * 通过key删除本地存储
     * @param {*} key 键
     */
    removeItem(key) {
        localStorage.removeItem(key)
    },
    /**
     * 获取当前登录用户信息
     * @returns {}
     */
    getUser() {
        let obj = JSON.parse(this.getItem(publicEnum.AD_LOCAL_USER_INFO));
        return obj;
    },
    /**
     * 设置用户
     * @param {*} obj 字符串
     */
    setUser(obj) {
        this.removeItem(publicEnum.AD_LOCAL_USER_INFO);
        this.setItem(publicEnum.AD_LOCAL_USER_INFO, obj);
    },
    /**
     * 删除本地存储用户信息
     */
    removeUser() {
        this.removeItem(publicEnum.AD_LOCAL_USER_INFO);
    }
}