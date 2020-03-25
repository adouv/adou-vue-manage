import AdIconListBaseComponent from './index.vue'
/** 
 * 图标组件
 */
export const adIconListBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdIconListBaseComponent);
    Vue.component('ad-icon-list', Constructor);
}