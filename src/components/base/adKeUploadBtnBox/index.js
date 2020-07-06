import AadKeUploadBtnBoxBaseComponent from "./index.vue";
/** 
 * KE上传组件
 */
export const aadKeUploadBtnBoxBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AadKeUploadBtnBoxBaseComponent);
    Vue.component('ad-ke-upload-box', Constructor);
}