<template>
  <textarea
    :id="id"
    :name="name"
    v-model="outContent"
    class="ad-k-edit-base-component"
    style="width:100%;height:300px;"
  ></textarea>
</template>

<script>
import {
  basePath,
  fileBasePath,
  items,
  htmlTags,
  colorTable,
  fontSizeTable
} from "./kedit.enum";
export default {
  name: "AdKeditBaseComponent",
  props: {
    /**
     * 编辑器内容 url
     */
    html: {
      type: String,
      default: ""
    },
    /**
     * 编辑器id
     */
    id: {
      type: String,
      default: "kindEditor"
    },
    /**
     * 编辑器名称
     */
    name: {
      type: String,
      default: "content"
    },
    /**
     * 宽
     */
    width: {
      type: String,
      default: "100%"
    },
    /**
     * 高
     */
    height: {
      type: String,
      default: "400px"
    },
    /**
     * 最小宽
     */
    minWidth: {
      type: Number,
      default: 650
    },
    /**
     * 最小高
     */
    minHeight: {
      type: Number,
      default: 400
    },
    /**
     * 语言配置
     */
    langType: {
      type: String,
      default: "zh-CN"
    },
    /**
     * 主题配置
     */
    themeType: {
      type: String,
      default: "default"
    },
    /**
     * body 的样式
     */
    bodyClass: {
      type: String,
      default: "ad-ke-content"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editor: null,
      outContent: this.value
    };
  },
  watch: {
    value(val) {
      if (this.editor) {
        this.editor.html(val);
        this.$emit("input", val);
      }
    }
  },
  mounted() {
    this.initKindEditor();

    if (this.editor) {
      this.editor.html(this.outContent);
      this.$emit("input", this.editor.html());
    }
  },
  /**
   * keep-alive 进入时创建
   */
  activated() {
    this.initKindEditor();
  },
  /**
   * keep-alive 离开时移除
   */
  deactivated() {
    this.removeKindEditor();
  },
  /**
   * 实例销毁之前移除
   */
  beforeDestroy() {
    this.removeKindEditor();
  },
  methods: {
    /**
     * 初始化
     */
    initKindEditor() {
      this.removeKindEditor();

      this.editor = window.KindEditor.create(`#${this.id}`, {
        width: this.width,
        height: this.height,
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        items: items,
        noDisableItems: ["source", "fullscreen"],
        filterMode: false,
        htmlTags: htmlTags,
        wellFormatMode: true,
        resizeType: 2,
        themeType: "default",
        langType: this.langType,
        designMode: true,
        fullscreenMode: false,
        basePath: basePath,
        themesPath: `${basePath}themes/`,
        pluginsPath: `${basePath}plugins/`,
        langPath: `${basePath}lang/`,
        minChangeSize: 5,
        urlType: "",
        newlineTag: "p",
        pasteType: 2,
        dialogAlignType: "page",
        shadowMode: true,
        zIndex: 811213,
        useContextmenu: true,
        syncType: "form",
        indentChar: "\t",
        cssPath: "",
        cssData: "",
        bodyClass: this.bodyClass,
        colorTable: colorTable,
        afterCreate: res => {
          // console.log("设置编辑器创建后执行的回调函数,afterCreate:", res);
        },
        afterChange: res => {
          console.log(this.editor);
          if (this.editor) {
            this.outContent = this.editor.html();
            this.$emit("input", this.outContent);
          }
          // console.log("编辑器内容发生变化后执行的回调函数,afterChange:", res);
        },
        afterTab: res => {
          // console.log("按下TAB键后执行的的回调函数,afterTab:", res);
        },
        afterFocus: res => {
          // console.log("编辑器聚焦(focus)时执行的回调函数,afterFocus:", res);
        },
        afterBlur: res => {
          // console.log("编辑器失去焦点(blur)时执行的回调函数,afterBlur:", res);
        },
        afterUpload: res => {
          // console.log("上传文件后执行的回调函数,afterUpload:", res);
        },
        uploadJson: `${fileBasePath}upload_json.ashx`,
        fileManagerJson: `${fileBasePath}file_manager_json.ashx`,
        allowPreviewEmoticons: true,
        allowImageUpload: true,
        allowFlashUpload: true,
        allowMediaUpload: true,
        allowFileUpload: true,
        allowFileManager: true,
        fontSizeTable: fontSizeTable,
        imageTabIndex: 0,
        formatUploadUrl: true,
        fullscreenShortcut: false,
        extraFileUploadParams: {},
        filePostName: "imgFile",
        fillDescAfterUploadImage: true,
        afterSelectFile: res => {
          // console.log(
          //   "从图片空间选择文件后执行的回调函数,afterSelectFile:",
          //   res
          // );
        },
        pagebreakHtml:
          "<hr style='page-break-after: always;' class='ke-pagebreak' />",
        allowImageRemote: true,
        autoHeightMode: false,
        fixToolBar: false
      });
    },
    /**
     * 移除
     */
    removeKindEditor() {
      this.editor = null;
      window.KindEditor.remove(`#${this.id}`);
    }
  },
  watch: {
    /**
     * 编辑器内容改变事件
     */
    outContent(val) {
      this.$emit("input", val);
    }
  }
};
</script>