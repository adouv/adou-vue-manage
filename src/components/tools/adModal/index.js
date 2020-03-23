import AdModalToolComponent from "./index.vue";
/** 
 * 模态窗
 */
export const adModalToolInstall = (Vue, PluginOptions = {}) => {
    Object.defineProperty(Vue.prototype, 'adModal$', {
        get() {
            let div = document.createElement('div');
            document.body.appendChild(div);
            return (options) => {
                const Constructor = Vue.extend(AdModalToolComponent);
                new Constructor({
                    data() {
                        return {
                            modalOption: options
                        }
                    }
                }).$mount(div);
            }
        }
    });

    Vue.adModal = Vue.prototype.adModal$;
};