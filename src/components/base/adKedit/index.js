import AdKeditBaseComponent from "./index.vue";
/** 
 * 富文本编辑器
 */
export const adKeditBaseInstall = (Vue) => {
    const Constructor = Vue.extend(AdKeditBaseComponent);
    Vue.component('ad-kedit', Constructor);
}