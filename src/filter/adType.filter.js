/** 
 * 时间格式化过滤器
 */
export const adTypeFormats = (Vue) => {
    Vue.filter('adTypeFormats', (dataStr) => {
        let result = "登录页面顶部";
        switch (dataStr) {
            case 1:
                result = "登录页面顶部";
                break;
            case 3:
                result = "登录页中部";
                break;
            case 4:
                result = "登录页底部";
                break;
            case 5:
                result = "注册页顶部";
                break;
            case 6:
                result = "注册页中部";
                break;
            case 7:
                result = "注册页底部";
                break;
            case 8:
                result = "页面左侧";
                break;
            case 9:
                result = "页面右侧";
                break;
            case 10:
                result = "广告位";
                break;
        };
        return result;
    })
}