import Vue from 'vue'
/** 
 * 打印服务
 */
let CreatedOKLodop7766 = null;
let CLodopIsLocal;
export function needCLodop() {
    try {
        let ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i))
            return true;
        if (ua.match(/iPhone|iPod|iPad/i))
            return true;
        if (ua.match(/Android/i))
            return true;
        if (ua.match(/Edge\D?\d+/i))
            return true;

        let verTrident = ua.match(/Trident\D?\d+/i);
        let verIE = ua.match(/MSIE\D?\d+/i);
        let verOPR = ua.match(/OPR\D?\d+/i);
        let verFF = ua.match(/Firefox\D?\d+/i);
        let x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64))
            return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64))
                return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32)
                return true;
        } else if ((!verTrident) && (!verIE)) {
            let verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41)
                    return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
}


//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
    var src1 = "http://localhost:8000/CLodopfuncs.js?priority=1";
    var src2 = "http://localhost:18000/CLodopfuncs.js?priority=0";

    let head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    let oscript = document.createElement("script");
    oscript.src = src1;
    head.insertBefore(oscript, head.firstChild);
    oscript = document.createElement("script");
    oscript.src = src2;
    head.insertBefore(oscript, head.firstChild);
    CLodopIsLocal = !!((src1 + src2).match(/\/\/localho|\/\/127.0.0./i));
};

export function message(msg) {
    let options = {};
    options.title = "打印提示";
    options.message = msg;
    options.showConfirmButton = false;
    Vue.confirm(options);
}

export function getLodop(oOBJECT, oEMBED) {
    let strHtmUpdate = "<font color='#FF00FF'>打印控件需要升级!点击这里<a href='" + process.env.printApi + "install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    let strHtm64_Install = "<font color='#FF00FF'>打印控件未安装!点击这里<a href='" + process.env.printApi + "install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    let strHtm64_Update = "<font color='#FF00FF'>打印控件需要升级!点击这里<a href='" + process.env.printApi + "install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    let strHtmFireFox = "<font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    let strHtmChrome = "<font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
    let strCLodopInstall_1 = "<font color='#FF00FF'>Web打印服务CLodop未安装启动，点击这里<a href='" + process.env.printApi + "CLodop_Setup_for_Win32NT.exe' target='_self'>下载执行安装</a>";
    let strCLodopInstall_2 = "（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
    let strCLodopInstall_3 = "，成功后请刷新本页面。</font>";
    let strCLodopUpdate = "<font color='#FF00FF'>Web打印服务CLodop需升级!点击这里<a href='" + process.env.printApi + "CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
    let LODOP;
    try {
        let ua = navigator.userAgent;
        let isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
        if (needCLodop()) {
            try {
                LODOP = getCLodop();
            } catch (err) {}
            if (!LODOP && document.readyState !== "complete") {
                Vue.eleAlert("网页还没下载完毕，请稍等一下再操作.", '打印提示', {
                    dangerouslyUseHTMLString: true
                });
                return;
            }
            if (!LODOP) {
                /** 
                 * document.body.innerHTML = strStart + strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3 + strEnd + document.body.innerHTML;
                 */
                Vue.eleAlert(strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3, '打印提示', {
                    dangerouslyUseHTMLString: true
                });
                return;
            } else {
                if (CLODOP.CVERSION < "3.0.7.5") {
                    /** 
                     * document.body.innerHTML = strStart + strCLodopUpdate + strEnd + document.body.innerHTML;
                     */
                    Vue.eleAlert(strCLodopUpdate, '打印提示', {
                        dangerouslyUseHTMLString: true
                    });
                }
                if (oEMBED && oEMBED.parentNode) {
                    oEMBED.parentNode.removeChild(oEMBED);
                }
                if (oOBJECT && oOBJECT.parentNode) {
                    oOBJECT.parentNode.removeChild(oOBJECT);
                }
            }
        } else {
            let is64IE = isIE && !!(ua.match(/x64/i));
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT || oEMBED) {
                if (isIE) {
                    LODOP = oOBJECT;
                } else {
                    LODOP = oEMBED;
                }
            } else if (!CreatedOKLodop7766) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) {
                    LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                } else {
                    LODOP.setAttribute("type", "application/x-print-lodop");
                }

                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else {
                LODOP = CreatedOKLodop7766;
            }

            //=====Lodop插件未安装时提示下载地址:==========
            if ((!LODOP) || (!LODOP.VERSION)) {
                let hhh = "";
                if (ua.indexOf('Chrome') >= 0) {
                    /** 
                     * document.body.innerHTML = strHtmChrome + document.body.innerHTML;
                     */
                    hhh = strHtmChrome;
                }

                if (ua.indexOf('Firefox') >= 0) {
                    /** 
                     * document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
                     */
                    hhh = strHtmFireFox;
                }
                /** 
                 * document.body.innerHTML = strStart + (is64IE ? strHtm64_Install : strHtmInstall) + strEnd + document.body.innerHTML;
                 */
                Vue.eleAlert(hhh + (is64IE ? strHtm64_Install : strHtmInstall), '打印提示', {
                    dangerouslyUseHTMLString: true
                });
                return LODOP;
            }
        }
        if (LODOP.VERSION < "6.2.2.6") {
            if (!needCLodop()) {
                /**
                 * document.body.innerHTML = strStart + (is64IE ? strHtm64_Update : strHtmUpdate) + strEnd + document.body.innerHTML;
                 */
                Vue.eleAlert((is64IE ? strHtm64_Update : strHtmUpdate), '打印提示', {
                    dangerouslyUseHTMLString: true
                });
            }
            return LODOP;
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==



        //=======================================================
        return LODOP;
    } catch (err) {
        Vue.tip(`getLodop出错:${err}`);
    }
}