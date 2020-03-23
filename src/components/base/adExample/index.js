import AdExampleBaseComponent from './index.vue'
/** 
 * 布局组件
 */
export const adExampleBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdExampleBaseComponent);
    Vue.component('ad-example', Constructor);
}