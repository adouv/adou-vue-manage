import Vue from "vue";
import axios from "axios";
/**
 * HTTP请求服务
 * 作者：付凯航
 * 创建时间：2019-10-18 17:27
 */
//==============
/**
 * 超时时间
 */
axios.defaults.timeout = 1000000;
/**
 * 请求地址前缀
 */
axios.defaults.baseURL = `/_Ashx/Business/`;

/** */
axios.defaults.retry = 4;
/** */
axios.defaults.retryDelay = 1000;
/** 
 * 请求拦截
 */
axios.interceptors.request.use(config => {
    //let user = Vue.local.getItem("ADOU_USER");
    if (config.method === "post") {
        config.data = Vue.encr.dataEncryption(config.data, true);
    }

    return config;
}, error => {
    return Promise.reject(error);
});
/** 
 * 响应拦截
 */
axios.interceptors.response.use(response => {
    let data = response.data;
    if (data.Status === 200) {
        return data.Data;
    } else {
        Vue.message.error(data.Message);
        return null;
    }
}, error => {
    console.log(error);
    if (error.response) {
        let status = error.response.status;
        switch (status) {
            case 401:
                break;
            case 500:
                break;
        };
    }
    return Promise.reject(error);
});

export default axios;