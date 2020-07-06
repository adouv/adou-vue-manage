/**
 * 配置编辑器的工具栏，其中”/”表示换行，”|”表示分隔符。
 * 
 */
const itemList = [
    /**
     * HTML代码
     */
    {
        key: 0,
        label: 'source',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 1,
        label: '|',
        show: true
    },
    /**
     * 后退
     */
    {
        key: 2,
        label: 'undo',
        show: true
    },
    /**
     * 前进
     */
    {
        key: 3,
        label: 'redo',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 4,
        label: '|',
        show: true
    },
    /**
     * 预览
     */
    {
        key: 5,
        label: 'preview',
        show: false
    },
    /**
     * 打印
     */
    {
        key: 6,
        label: 'print',
        show: true
    },
    /**
     * 插入模板
     */
    {
        key: 7,
        label: 'template',
        show: true
    },
    /**
     * 插入程序代码
     */
    {
        key: 8,
        label: 'code',
        show: true
    },
    /**
     * 剪切
     */
    {
        key: 9,
        label: 'cut',
        show: true
    },
    /**
     * 复制
     */
    {
        key: 10,
        label: 'copy',
        show: true
    },
    /**
     * 粘贴
     */
    {
        key: 11,
        label: 'paste',
        show: true
    },
    /**
     * 粘贴为无格式文本
     */
    {
        key: 12,
        label: 'plainpaste',
        show: true
    },
    /**
     * 从Word粘贴
     */
    {
        key: 13,
        label: 'wordpaste',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 14,
        label: '|',
        show: true
    },
    /**
     * 左对齐
     */
    {
        key: 15,
        label: 'justifyleft',
        show: true
    },
    /**
     * 居中
     */
    {
        key: 16,
        label: 'justifycenter',
        show: true
    },
    /**
     * 右对齐
     */
    {
        key: 17,
        label: 'justifyright',
        show: true
    },
    /**
     * 两端对齐
     */
    {
        key: 18,
        label: 'justifyfull',
        show: true
    },
    /**
     * 编号
     */
    {
        key: 19,
        label: 'insertorderedlist',
        show: true
    },
    /**
     * 项目符号
     */
    {
        key: 20,
        label: 'insertunorderedlist',
        show: true
    },
    /**
     * 增加缩进
     */
    {
        key: 21,
        label: 'indent',
        show: true
    },
    /**
     * 减少缩进
     */
    {
        key: 22,
        label: 'outdent',
        show: true
    },
    /**
     * 下标
     */
    {
        key: 23,
        label: 'subscript',
        show: true
    },
    /**
     * 上标
     */
    {
        key: 24,
        label: 'superscript',
        show: true
    },
    /**
     * 清理HTML代码
     */
    {
        key: 25,
        label: 'clearhtml',
        show: true
    },
    /**
     * 一键排版
     */
    {
        key: 26,
        label: 'quickformat',
        show: true
    },
    /**
     * 全选
     */
    {
        key: 27,
        label: 'selectall',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 28,
        label: '|',
        show: true
    },
    /**
     * 全屏显示
     */
    {
        key: 29,
        label: 'fullscreen',
        show: false
    },
    /**
     * 分割
     */
    {
        key: 30,
        label: '/',
        show: true
    },
    /**
     * 段落
     */
    {
        key: 31,
        label: 'formatblock',
        show: true
    },
    /**
     * 字体
     */
    {
        key: 32,
        label: 'fontname',
        show: true
    },
    /**
     * 文字大小
     */
    {
        key: 33,
        label: 'fontsize',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 34,
        label: '|',
        show: true
    },
    /**
     * 文字颜色
     */
    {
        key: 35,
        label: 'forecolor',
        show: true
    },
    /**
     * 文字背景
     */
    {
        key: 36,
        label: 'hilitecolor',
        show: true
    },
    /**
     * 粗体
     */
    {
        key: 37,
        label: 'bold',
        show: true
    },
    /**
     * 斜体
     */
    {
        key: 38,
        label: 'italic',
        show: true
    },
    /**
     * 下划线
     */
    {
        key: 39,
        label: 'underline',
        show: true
    },
    /**
     * 删除线
     */
    {
        key: 40,
        label: 'strikethrough',
        show: true
    },
    /**
     * 行距
     */
    {
        key: 41,
        label: 'lineheight',
        show: true
    },
    /**
     * 删除格式
     */
    {
        key: 42,
        label: 'removeformat',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 43,
        label: '|',
        show: true
    },
    /**
     * 图片
     */
    {
        key: 44,
        label: 'image',
        show: true
    },
    /**
     * 多图片
     */
    {
        key: 45,
        label: 'multiimage',
        show: true
    },
    /**
     * Flash
     */
    {
        key: 46,
        label: 'flash',
        show: true
    },
    /**
     * 视音频
     */
    {
        key: 47,
        label: 'media',
        show: true
    },
    /**
     * 插入文件
     */
    {
        key: 48,
        label: 'insertfile',
        show: true
    },
    /**
     * 表格
     */
    {
        key: 49,
        label: 'table',
        show: true
    },
    /**
     * 插入横线
     */
    {
        key: 50,
        label: 'hr',
        show: true
    },
    /**
     * 插入表情
     */
    {
        key: 51,
        label: 'emoticons',
        show: true
    },
    /**
     * 百度地图
     */
    {
        key: 52,
        label: 'baidumap',
        show: true
    },
    /**
     * 插入分页符
     */
    {
        key: 53,
        label: 'pagebreak',
        show: true
    },
    /**
     * 插入锚点
     */
    {
        key: 54,
        label: 'anchor',
        show: true
    },
    /**
     * 超级链接
     */
    {
        key: 55,
        label: 'link',
        show: true
    },
    /**
     * 取消超级链接
     */
    {
        key: 56,
        label: 'unlink',
        show: true
    },
    /**
     * 分割
     */
    {
        key: 57,
        label: '|',
        show: true
    },
    /**
     * 关于
     */
    {
        key: 58,
        label: 'about',
        show: true
    }
];
/**
 * 指定要保留的HTML标记和属性。Object的key为HTML标签名，value为HTML属性数组，”.”开始的属性表示style属性。
 */
const htmlTags = {
    font: ['color', 'size', 'face', '.background-color'],
    span: [
        '.color', '.background-color', '.font-size', '.font-family', '.background',
        '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
    ],
    div: [
        'align', '.border', '.margin', '.padding', '.text-align', '.color',
        '.background-color', '.font-size', '.font-family', '.font-weight', '.background',
        '.font-style', '.text-decoration', '.vertical-align', '.margin-left'
    ],
    table: [
        'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
        '.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
        '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
        '.width', '.height', '.border-collapse'
    ],
    'td,th': [
        'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
        '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
        '.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
    ],
    a: ['href', 'target', 'name'],
    embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
    img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
    'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': [
        'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
        '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
    ],
    pre: ['class'],
    hr: ['class', '.page-break-after'],
    'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del': []
};
/**
 * 指定取色器里的颜色。
 */
const colorTable = [
    ['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
    ['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
    ['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
    ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
];
/**
 * 指定文字大小。
 */
const fontSizeTable = ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px'];

/**
 * 根目录
 */
let basePath = "/Adoumanage/static/KE/";
/**
 * 文件根目录
 */
let fileBasePath = "/_Ashx/KE/";
/**
 * 配置编辑器的工具栏，其中”/”表示换行，”|”表示分隔符。
 */
let items = [];
itemList.filter(e => e.show === true).forEach(ele => {
    items.push(ele.label);
});

/**
 * 编辑器初始化参数
 */
const initOptions = [
    /**
     * 编辑器的宽度，可以设置px或%，比textarea输入框样式表宽度优先度高。
     * 数据类型: String
     * 默认值: textarea输入框的宽度
     */
    {
        key: 0,
        label: "width",
        value: "100%",
        type: String,
        show: true
    },
    /**
     * 编辑器的高度，只能设置px，比textarea输入框样式表高度优先度高。
     * 数据类型: String
     * 默认值: textarea输入框的高度
     */
    {
        key: 1,
        label: "height",
        value: "400px",
        type: String
    },
    /**
     * 指定编辑器最小宽度，单位为px。
     * 数据类型: Int
     * 默认值: 650
     */
    {
        key: 2,
        label: "minWidth",
        value: 650,
        type: Number,
        show: true
    },
    /**
     * 指定编辑器最小高度，单位为px。
     * 数据类型: Int
     * 默认值: 100
     */
    {
        key: 3,
        label: "minHeight",
        value: 100,
        type: Number,
        show: true
    },
    /**
     * 配置编辑器的工具栏，其中”/”表示换行，”|”表示分隔符。
     * 数据类型: Array
     * 默认值:
     * [
     *   'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
     *   'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
     *   'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
     *   'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
     *   'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
     *   'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
     *   'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
     *   'anchor', 'link', 'unlink', '|', 'about'
     * ]
     */
    {
        key: 4,
        label: "items",
        value: items,
        type: Array,
        show: true
    },
    /**
     * designMode 为false时，要保留的工具栏图标。
     * 数据类型: Array
     * 默认值: [‘source’, ‘fullscreen’]
     */
    {
        key: 5,
        label: "noDisableItems",
        value: ['source', 'fullscreen'],
        type: Array,
        show: true
    },
    /**
     * true时根据 htmlTags 过滤HTML代码，false时允许输入任何代码。
     * 数据类型: Boolean
     * 默认值: true
     * Note
     * 4.1.1版本开始默认值为true。
     */
    {
        key: 6,
        label: "filterMode",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 指定要保留的HTML标记和属性。Object的key为HTML标签名，value为HTML属性数组，”.”开始的属性表示style属性。
     * 数据类型: Object
     * 默认值:
     * {
        font : ['color', 'size', 'face', '.background-color'],
        span : [
                '.color', '.background-color', '.font-size', '.font-family', '.background',
                '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
        ],
        div : [
                'align', '.border', '.margin', '.padding', '.text-align', '.color',
                '.background-color', '.font-size', '.font-family', '.font-weight', '.background',
                '.font-style', '.text-decoration', '.vertical-align', '.margin-left'
        ],
        table: [
                'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
                '.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
                '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
                '.width', '.height', '.border-collapse'
        ],
        'td,th': [
                'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
                '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
                '.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
        ],
        a : ['href', 'target', 'name'],
        embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
        img : ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
        'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
                'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
                '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
        ],
        pre : ['class'],
        hr : ['class', '.page-break-after'],
        'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : []
     * }
     */
    {
        key: 7,
        label: "htmlTags",
        value: htmlTags,
        type: Object,
        show: true
    },
    /**
     * true时美化HTML数据。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 8,
        label: "wellFormatMode",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
     * 数据类型: Int
     * 默认值: 2
     */
    {
        key: 9,
        label: "resizeType",
        value: 2,
        type: Number,
        show: true
    },
    /**
     * 指定主题风格，可设置”default”、”simple”，指定simple时需要引入simple.css。
     * 数据类型: String
     * 默认值: “default”
     * 示例:
     * <link rel="stylesheet" href="../themes/default/default.css" />
     * <link rel="stylesheet" href="../themes/simple/simple.css" />
     * <script charset="utf-8" src="../kindeditor.js"></script>
     * <script charset="utf-8" src="../lang/zh-CN.js"></script>
     * <script>
     *         var editor;
     *         KindEditor.ready(function(K) {
     *                 editor = K.create('#editor_id', {
     *                         themeType : 'simple'
     *                 });
     *         });
     * </script>
     */
    {
        key: 10,
        label: "themeType",
        value: "default",
        type: String,
        show: true
    },
    /**
     * 指定语言，可设置”en”、”zh-CN”，需要引入lang/[langType].js。
     * 数据类型: String
     * 默认值: “zh-CN”
     * 示例:
     * <link rel="stylesheet" href="../themes/default/default.css" />
     * <script charset="utf-8" src="../kindeditor.js"></script>
     * <script charset="utf-8" src="../lang/en.js"></script>
     * <script>
     *        var editor;
     *        KindEditor.ready(function(K) {
     *                editor = K.create('#editor_id', {
     *                        langType : 'en'
     *                });
     *        });
     * </script>
     */
    {
        key: 11,
        label: "langType",
        value: "zh-CN",
        type: String,
        show: true
    },
    /**
     * 可视化模式或代码模式
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 12,
        label: "designMode",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * true时加载编辑器后变成全屏模式。
     * 数据类型: Boolean
     * 默认值: false
     */
    {
        key: 13,
        label: "fullscreenMode",
        value: false,
        type: Boolean,
        show: true
    },
    /**
     * 指定编辑器的根目录路径。
     * 数据类型: String
     * 默认值: 根据kindeditor.js文件名自动获取
     */
    {
        key: 14,
        label: "basePath",
        value: basePath,
        type: String,
        show: true
    },
    /**
     * 指定编辑器的themes目录路径。
     * 数据类型: String
     * 默认值: basePath + ‘themes/’
     */
    {
        key: 15,
        label: "themesPath",
        value: `${basePath}themes/`,
        type: String,
        show: true
    },
    /**
     * 指定编辑器的plugins目录路径。
     * 数据类型: String
     * 默认值: basePath + ‘plugins/’
     */
    {
        key: 16,
        label: "pluginsPath",
        value: `${basePath}plugins/`,
        type: String,
        show: true
    },
    /**
     * 指定编辑器的lang目录路径。
     * 数据类型: String
     * 默认值: basePath + ‘lang/’
     */
    {
        key: 17,
        label: "langPath",
        value: `${basePath}lang/`,
        type: String,
        show: true
    },
    /**
     * undo/redo文字输入最小变化长度，当输入的文字变化小于这个长度时不会添加到undo记录里。
     * 数据类型: String
     * 默认值: 5
     */
    {
        key: 18,
        label: "minChangeSize",
        value: 5,
        type: String,
        show: true
    },
    /**
     * 改变站内本地URL，可设置”“、”relative”、”absolute”、”domain”。空为不修改URL，relative为相对路径，absolute为绝对路径，domain为带域名的绝对路径。
     * 数据类型: String
     * 默认值: “”
     */
    {
        key: 19,
        label: "urlType",
        value: "",
        type: String,
        show: true
    },
    /**
     * 设置回车换行标签，可设置”p”、”br”。
     * 数据类型: String
     * 默认值: “p”
     */
    {
        key: 20,
        label: "newlineTag",
        value: "p",
        type: String,
        show: true
    },
    /**
     * 设置粘贴类型，0:禁止粘贴, 1:纯文本粘贴, 2:HTML粘贴
     * 数据类型: Int
     * 默认值: 2
     */
    {
        key: 21,
        label: "pasteType",
        value: 2,
        type: Number,
        show: true
    },
    /**
     * 设置弹出框(dialog)的对齐类型，可设置”“、”page”，指定page时按当前页面居中，指定空时按编辑器居中。
     * 数据类型: String
     * 默认值: “page”
     */
    {
        key: 22,
        label: "dialogAlignType",
        value: "page",
        type: String,
        show: true
    },
    /**
     * true时弹出层(dialog)显示阴影。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 23,
        label: "shadowMode",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 指定弹出层的基准z-index。
     * 数据类型: Int
     * 默认值: 811213
     */
    {
        key: 24,
        label: "zIndex",
        value: 811213,
        type: Number,
        show: true
    },
    /**
     * true时使用右键菜单，false时屏蔽右键菜单。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 25,
        label: "useContextmenu",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 同步数据的方式，可设置”“、”form”，值为form时提交form时自动同步，空时不会自动同步。
     * 数据类型: String
     * 默认值: “form”
     */
    {
        key: 26,
        label: "syncType",
        value: "form",
        type: String,
        show: true
    },
    /**wellFormatMode 为true时，HTML代码缩进字符。
     * 数据类型: String
     * 默认值: “\t”
     * 
     */
    {
        key: 27,
        label: "indentChar",
        value: "\t",
        type: String,
        show: true
    },
    /**
     * 指定编辑器iframe document的CSS文件，用于设置可视化区域的样式。
     * 数据类型: String或Array
     * 默认值: 空
     */
    {
        key: 28,
        label: "cssPath",
        value: "",
        type: [String, Array],
        show: true
    },
    /**
     * 指定编辑器iframe document的CSS数据，用于设置可视化区域的样式。
     * 数据类型: String
     * 默认值: 空
     */
    {
        key: 29,
        label: "cssData",
        value: "",
        type: String,
        show: true
    },
    /**
     * 指定编辑器iframe document body的className。
     * 数据类型: String
     * 默认值: “ke-content”
     */
    {
        key: 30,
        label: "bodyClass",
        value: "ke-content",
        type: String,
        show: true
    },
    /**
     * 指定取色器里的颜色。
     * 数据类型: Array
     * 默认值:
     * [
     *  ['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
     *  ['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
     *  ['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
     *  ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
     * ]
     */
    {
        key: 31,
        label: "colorTable",
        value: colorTable,
        type: Array,
        show: true
    },
    /**
     * 设置编辑器创建后执行的回调函数。
     * 数据类型: Function
     * 默认值: 无
     */
    {
        key: 32,
        label: "afterCreate",
        value: (res) => {
            console.log('设置编辑器创建后执行的回调函数,afterCreate:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 编辑器内容发生变化后执行的回调函数。
     * 数据类型: Function
     * 默认值: 无
     */
    {
        key: 33,
        label: "afterChange",
        value: (res) => {
            console.log('编辑器内容发生变化后执行的回调函数,afterChange:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 按下TAB键后执行的的回调函数。
     * 数据类型: Function
     * 默认值: 插入4个空格的函数
     */
    {
        key: 34,
        label: "afterTab",
        value: (res) => {
            console.log('按下TAB键后执行的的回调函数,afterTab:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 编辑器聚焦(focus)时执行的回调函数。
     * 数据类型: Function
     * 默认值: 无
     */
    {
        key: 35,
        label: "afterFocus",
        value: (res) => {
            console.log('编辑器聚焦(focus)时执行的回调函数,afterFocus:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 编辑器失去焦点(blur)时执行的回调函数。
     * 数据类型: Function
     * 默认值: 无
     */
    {
        key: 36,
        label: "afterBlur",
        value: (res) => {
            console.log('编辑器失去焦点(blur)时执行的回调函数,afterBlur:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 上传文件后执行的回调函数。
     * 数据类型: Function
     * 默认值: 无
     * KindEditor.ready(function(K) {
     *       K.create('#id', {
     *                afterUpload : function(url) {
     *                        alert(url);
     *              }
     *        });
     * });
     */
    {
        key: 37,
        label: "afterUpload",
        value: (res) => {
            console.log('上传文件后执行的回调函数,afterUpload:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 指定上传文件的服务器端程序。
     * 数据类型: String
     * 默认值: basePath + ‘php/upload_json.php’
     */
    {
        key: 38,
        label: "uploadJson",
        value: `${fileBasePath}upload_json.ashx`,
        type: String,
        show: true
    },
    /**
     * 指定浏览远程图片的服务器端程序。
     * 数据类型: String
     * 默认值: basePath + ‘php/file_manager_json.php’
     */
    {
        key: 39,
        label: "fileManagerJson",
        value: `${fileBasePath}file_manager_json.ashx`,
        type: String,
        show: true
    },
    /**
     * true时鼠标放在表情上可以预览表情。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 40,
        label: "allowPreviewEmoticons",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * true时显示图片上传按钮。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 41,
        label: "allowImageUpload",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * true时显示Flash上传按钮。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 42,
        label: "allowFlashUpload",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * true时显示视音频上传按钮。
     * 数据类型: Boolean
     * 默认值: true
     */
    {
        key: 43,
        label: "allowMediaUpload",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * true时显示文件上传按钮。
     * 数据类型: Boolean
     * 默认值: true
     * Note
     * 4.0.6版本开始支持。
     */
    {
        key: 44,
        label: "allowFileUpload",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * true时显示浏览远程服务器按钮。
     * 数据类型: Boolean
     * 默认值: false
     */
    {
        key: 45,
        label: "allowFileManager",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 指定文字大小。
     * 数据类型: Array
     * 默认值:
     * ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px']
     */
    {
        key: 46,
        label: "fontSizeTable",
        value: fontSizeTable,
        type: Array,
        show: true
    },
    /**
     * 图片弹出层的默认显示标签索引。
     * 数据类型: Int
     * 默认值: 0
     * Note
     * 4.0.6版本开始支持。
     */
    {
        key: 47,
        label: "imageTabIndex",
        value: 0,
        type: Number,
        show: true
    },
    /**
     * false时不会自动格式化上传后的URL。
     * 数据类型: Boolean
     * 默认值: true
     * Note
     * 4.1版本开始支持。
     */
    {
        key: 48,
        label: "formatUploadUrl",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * false时禁用ESC全屏快捷键。
     * 数据类型: Boolean
     * 默认值: false
     * Note
     * 4.1版本开始支持，从4.1.2版本开始默认值为false。
     */
    {
        key: 49,
        label: "fullscreenShortcut",
        value: false,
        type: Boolean,
        show: true
    },
    /**
     * 上传图片、Flash、视音频、文件时，支持添加别的参数一并传到服务器。
     * 数据类型: Array
     * 默认值: {}
     * KindEditor.ready(function(K) {
     *         K.create('#id', {
     *                 extraFileUploadParams : {
     *                         item_id : 1000,
     *                         category_id : 1
     *                 }
     *         });
     * });
     * Note
     * 4.1.1版本开始支持。
     */
    {
        key: 50,
        label: "extraFileUploadParams",
        value: {},
        type: Array,
        show: true
    },
    /**
     * 指定上传文件form名称。
     * 数据类型: String
     * 默认值: imgFile
     * Note
     * 4.1.2版本开始支持。
     */
    {
        key: 51,
        label: "filePostName",
        value: "imgFile",
        type: String,
        show: true
    },
    /**
     * true时图片上传成功后切换到图片编辑标签，false时插入图片后关闭弹出框。
     * 数据类型: Boolean
     * 默认值: false
     * Note
     * 4.1.2版本开始支持。
     */
    {
        key: 52,
        label: "fillDescAfterUploadImage",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 从图片空间选择文件后执行的回调函数。
     * 数据类型: Function
     * 默认值: 无
     * Note
     * 4.1.2版本开始支持。
     */
    {
        key: 53,
        label: "afterSelectFile",
        value: (res) => {
            console.log('从图片空间选择文件后执行的回调函数,afterSelectFile:', res);
        },
        type: Function,
        show: true
    },
    /**
     * 可指定分页符HTML。
     * 数据类型: String
     * 默认值: <hr style=”page-break-after: always;” class=”ke-pagebreak” />
     * Note
     * 4.1.3版本开始支持。
     */
    {
        key: 54,
        label: "pagebreakHtml",
        value: "<hr style='page-break-after: always;' class='ke-pagebreak' />",
        type: String,
        show: true
    },
    /**
     * true时显示网络图片标签，false时不显示。
     * 数据类型: Boolean
     * 默认值: true
     * Note
     * 4.1.6版本开始支持。
     */
    {
        key: 55,
        label: "allowImageRemote",
        value: true,
        type: Boolean,
        show: true
    },
    /**
     * 值为true，并引入autoheight.js插件时自动调整高度。
     * 数据类型: Boolean
     * 默认值: false
     * Note
     * 4.1.8版本开始支持。
     */
    {
        key: 56,
        label: "autoHeightMode",
        value: false,
        type: Boolean,
        show: true
    },
    /**
     * 值为true，并引入fixtoolbar.js插件时固定工具栏位置。
     * 数据类型: Boolean
     * 默认值: false
     */
    {
        key: 57,
        label: "fixToolBar",
        value: false,
        type: Boolean,
        show: true
    }
];



let params = {};
initOptions.forEach(ele => {
    params[ele.label] = ele.value;
});

module.exports = {
    options: params,
    basePath: "/Adoumanage/static/KE/",
    fileBasePath: "/_Ashx/KE/",
    items: items,
    htmlTags: htmlTags,
    colorTable: colorTable,
    fontSizeTable: fontSizeTable
};