import AdInputTypeBusinessComponent from './index.vue'
/** 
 * 文本类型组件
 */
export const adInputTypeBusinessInstall = (Vue) => {
    const Constructor = Vue.extend(AdInputTypeBusinessComponent);
    Vue.component('adbu-input-type', Constructor);
}