import { dateTimeFormats } from "./dateTime.filter";
import { dateFormats } from "./date.filter";
import { emptyFormats } from "./empty.filter";
import { adTypeFormats } from "./adType.filter";
/**
 * 过滤器
 * @param {*} Vue 
 */
export const AdFilterInstall = Vue => {
    dateTimeFormats(Vue);
    dateFormats(Vue);
    emptyFormats(Vue);
    adTypeFormats(Vue);
};