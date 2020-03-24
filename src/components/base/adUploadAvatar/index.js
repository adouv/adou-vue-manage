import AdUploadAvatarBaseComponent from "./index.vue";
/** 
 * 用户上传头像组件
 */
export const adUploadAvatarBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdUploadAvatarBaseComponent);
    Vue.component('ad-upload-avatar', Constructor);
}