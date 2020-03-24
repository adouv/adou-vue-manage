//基础组件
import { adMainBaseInstall } from "./base/adMain/index";
import { adTableBaseInstall } from "./base/adTable/index";
import { adResultBaseInstall } from "./base/adResult/index";
import { adExampleBaseInstall } from "./base/adExample/index";
import { adSelectBaseInstall } from "./base/adSelect/index";
import { adUploadAvatarBaseInstall } from "./base/adUploadAvatar/index";
//工具组件
import { adModalToolInstall } from "./tools/adModal/index";
import { adSpinToolInstall } from "./tools/adSpin/index";
/**
 * 全局组件注册
 */
export const AdComponentInstall = Vue => {
    //基础组件
    adMainBaseInstall(Vue);
    adTableBaseInstall(Vue);
    adResultBaseInstall(Vue);
    adExampleBaseInstall(Vue);
    adSelectBaseInstall(Vue);
    adUploadAvatarBaseInstall(Vue);
    //工具组件
    adModalToolInstall(Vue);
    adSpinToolInstall(Vue);
};