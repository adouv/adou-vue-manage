import AdKeUploadBtnBaseComponent from "./index.vue";
/** 
 * KE上传组件
 */
export const adKeUploadBtnBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdKeUploadBtnBaseComponent);
    Vue.component('ad-ke-upload-btn', Constructor);
}