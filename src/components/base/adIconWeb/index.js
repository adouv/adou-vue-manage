import AdIconWebBaseComponent from './index.vue'
/** 
 * ICON组件
 */
export const adIconWebBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdIconWebBaseComponent);
    Vue.component('ad-icon-web', Constructor);
}