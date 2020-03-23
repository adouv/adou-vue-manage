import AdResultBaseComponent from "./index.vue";
/** 
 * 结果组件
 */
export const adResultBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdResultBaseComponent);
    Vue.component('ad-result', Constructor);
}