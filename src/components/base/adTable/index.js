import AdTableBaseComponent from "./index.vue";
/** 
 * 表格组件
 */
export const adTableBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdTableBaseComponent);
    Vue.component('ad-table', Constructor);
}