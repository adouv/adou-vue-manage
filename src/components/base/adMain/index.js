import AdMainBaseComponent from "./index.vue";
/** 
 * 主体组件
 */
export const adMainBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdMainBaseComponent);
    Vue.component('ad-main', Constructor);
}