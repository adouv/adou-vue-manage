import AdSelectBaseComponent from './index.vue'
/** 
 * 原生下拉框组件
 */
export const adSelectBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdSelectBaseComponent);
    Vue.component('ad-select', Constructor);
}