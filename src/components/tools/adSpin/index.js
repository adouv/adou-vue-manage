import AdSpinToolComponent from "./index.vue";
/** 
 * 加载
 */
export const adSpinToolInstall = (Vue, PluginOptions = {}) => {

    const Constructor = Vue.extend(AdSpinToolComponent);


    let Instance = new Constructor({
        el: document.createElement("div")
    });

    Instance.option.spinning = false;

    const spin = {
        show(options = {}) {
            Instance.option.spinning = true;
            document.body.appendChild(Instance.$el);
            if (options.tip) {
                Instance.option.tip = options.tip;
            }
        },
        hide() {
            Instance.option.spinning = false;
        }
    };

    Vue.adSpin = Vue.prototype.adSpin$ = spin;
};