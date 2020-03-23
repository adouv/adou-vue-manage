/**
 * ElementService
 * 操作页面DOM
 */

export default {
    /**
     * 判断body是否包含某个样式
     * @param {*} className 样式名称
     */
    bodyHasClass(className) {
        let result = false;
        if (document.body.className.split(' ').find(e => e == className)) {
            result = true;
        }
        return result;
    },
    /**
     * 给body添加样式
     * @param {*} className 样式名称 
     */
    bodyAddClass(className) {
        let classList = document.body.className.split(' ')
        if (classList !== null) {
            classList.push(className)
        }
        document.body.className = classList.join(' ')
    },
    /**
     * 移除body的某个样式
     * @param {*} className 样式名称 
     */
    bodyRemoveClass(className) {
        let classList = document.body.className.split(' ')
        if (classList !== null) {
            document.body.className = classList
                .filter((value, index, array) => {
                    return value !== className
                })
                .join(' ')
        }
    },
    /**
     * 给dom添加class类
     * @param {*} baseName 
     * @param {*} className 
     */
    domAddClass(baseName, className) {
        let classList = document.getElementsByClassName(baseName)[0].className.split(' ');
        if (classList !== null) {
            classList.push(className);
            document.getElementsByClassName(baseName)[0].className = classList.join(' ');
        }
    },
    domRemoveClass(baseName, className) {
        let classList = document.getElementsByClassName(baseName)[0].className.split(' ');
        if (classList !== null) {
            document.getElementsByClassName(baseName)[0].className = classList
                .filter((value, index, array) => {
                    return value !== className
                })
                .join(' ')
        }
    },
    /**
     * 是否包含class
     * @param {*} baseName 
     * @param {*} className 
     */
    domHasClass(baseName, className) {
        let result = false;
        if (document.getElementsByClassName(baseName)[0].className.split(' ').find(e => e == className)) {
            result = true;
        }
        return result;
    },
    /**
     * 移除打印提示会话框
     *
     */
    removeLodopMessageDocument() {
        this.bodyRemoveClass("td-lodop-message");
    }
}