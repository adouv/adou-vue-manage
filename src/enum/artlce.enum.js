import EsEnum from "./enum";
export default {
    /**
     * 文本类型 
     * 0-input(输入框)、
     * 1-file(上传框)、
     * 2-select(选择器)、
     * 3-radio(单选框)、
     * 4-checkbox(多选框)、
     * 5-textarea(多行文本框)、
     * 6-time(时间选择器)、
     * 7-date(日期选择器)、
     * 8-start date、end date(开始、结束日期选择器)
     */
    articleType: [
        { code: 0, name: "input" },
        { code: 1, name: "file" },
        { code: 2, name: "select" },
        { code: 3, name: "radio" },
        { code: 4, name: "checkbox" },
        { code: 5, name: "textarea" },
        { code: 6, name: "time" },
        { code: 7, name: "date" },
        { code: 8, name: "sedate" }
    ],
    /**
     * 扩展字段数据（单页、文章、产品）
     */
    fixedFieldList: [{
            value: 1,
            label: "标题",
            desc: "固定属性，不可修改",
            setting: []
        },
        {
            value: 2,
            label: "SEO标题",
            desc: "固定属性，不可修改",
            setting: []
        },
        {
            value: 3,
            label: "SEO关键词",
            desc: "固定属性，不可修改",
            setting: []
        },
        {
            value: 4,
            label: "SEO描述",
            desc: "固定属性，不可修改",
            setting: []
        },
        {
            value: 5,
            label: "封面",
            desc: "固定属性，不可修改",
            setting: [{
                    label: "封面图宽度",
                    value: "100"
                },
                {
                    label: "封面图高度",
                    value: "100"
                }
            ]
        },
        {
            value: 6,
            label: "文件",
            desc: "固定属性，不可修改",
            setting: [{
                label: "文件大小",
                value: "100"
            }]
        },
        {
            value: 7,
            label: "内容",
            desc: "固定属性，不可修改",
            setting: []
        }
    ]
}