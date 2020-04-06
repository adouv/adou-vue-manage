import AdDicListBusinessComponent from './index.vue'
/** 
 * 字典列表组件
 */
export const adDicListBusinessInstall = (Vue) => {
    const Constructor = Vue.extend(AdDicListBusinessComponent);
    Vue.component('adbu-dic', Constructor);
}