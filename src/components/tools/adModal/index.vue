<template>
  <a-modal
    v-model="modalOption.visible"
    :title="modalOption.title"
    :bodyStyle="modalOption.bodyStyle"
    :cancelText="modalOption.cancelText"
    :centered="modalOption.centered"
    :closable="modalOption.closable"
    :closeIcon="modalOption.closeIcon"
    :confirmLoading="modalOption.confirmLoading"
    :destroyOnClose="modalOption.destroyOnClose"
    :forceRender="modalOption.forceRender"
    :getContainer="modalOption.getContainer"
    :keyboard="modalOption.keyboard"
    :mask="modalOption.mask"
    :maskClosable="modalOption.maskClosable"
    :maskStyle="modalOption.maskStyle"
    :okText="modalOption.okText"
    :okType="modalOption.okType"
    :width="modalOption.width"
    :wrapClassName="modalOption.wrapClassName"
    :zIndex="modalOption.zIndex"
  >
    <div v-if="modalOption.content">{{modalOption.content}}</div>
    <component
      v-if="modalOption.componentName"
      :is="modalOption.componentName"
      :params="modalOption.params"
    ></component>
    <template slot="footer">
      <a-button @click="cancelHandller" v-if="modalOption.cancelTextShow">{{modalOption.cancelText}}</a-button>
      <a-button
        type="primary"
        @click="okHandller"
        v-if="modalOption.okTextShow"
      >{{modalOption.okText}}</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: "AdModalToolComponent",
  data() {
    return {
      modalOption: {
        /**
         * 标题
         * String|slot
         */
        title: "默认标题",
        /**
         * 对话框是否可见 (v-model)
         * Boolean
         */
        visible: false,
        /**
         * 取消按钮文字
         * String| slot
         */
        cancelText: "取消",
        /**
         * 是否显示取消按钮
         */
        cancelTextShow: true,
        /**
         * 确认按钮文字
         * String|slot
         */
        okText: "确定",
        /**
         * 是否显示确定按钮
         */
        okTextShow: true,
        /**
         * 确认按钮类型
         * String
         */
        okType: "primary",
        /**
         * 垂直居中展示 Modal
         * Boolean
         */
        centered: true,
        /**
         * 是否显示右上角的关闭按钮
         * Boolean
         */
        closable: true,
        /**
         * 自定义关闭图标
         * VNode | slot
         */
        closeIcon: null,
        /**
         * 确定按钮 loading
         * Boolean
         */
        confirmLoading: false,
        /**
         * 关闭时销毁 Modal 里的子元素
         * Boolean
         */
        destroyOnClose: false,
        /**
         * 强制渲染 Modal
         * Boolean
         */
        forceRender: false,
        /**
         * 指定 Modal 挂载的 HTML 节点
         * (instance): HTMLElement
         */
        getContainer: () => document.body,
        /**
         * ok 按钮 props, 遵循 jsx规范
         */
        okButtonProps: {},
        /**
         * cancel 按钮 props, 遵循 jsx规范
         */
        cancelButtonProps: {},
        /**
         * 是否支持键盘 esc 关闭
         * Boolean
         */
        keyboard: true,
        /**
         * 是否展示遮罩
         * Boolean
         */
        mask: true,
        /**
         * 点击蒙层是否允许关闭
         * Boolean
         */
        maskClosable: false,
        /**
         * 遮罩样式
         * Object
         */
        maskStyle: {},

        /**
         * 宽度
         * String|Number
         */
        width: 520,
        /**
         * 对话框外层容器的类名
         * String
         */
        wrapClassName: "",
        /**
         * 设置 Modal 的 z-index
         * Number
         */
        zIndex: 1000,
        /**
         * 内容
         * String
         */
        content: "",
        /**
         * 组件名称
         * Object
         */
        componentName: null,
        /**
         * 组件参数
         * Object
         */
        params: {},
        /**
         * 点击遮罩层或右上角叉或取消按钮的回调
         */
        cancelHandller: options => {},
        /**
         * 点击确定回调
         */
        okHandller: (options, close) => {}
      }
    };
  },
  methods: {
    /**
     * 关闭回调
     */
    closeHandller() {
      this.modalOption.visible = false;
    },
    /**
     * 点击遮罩层或右上角叉或取消按钮的回调
     */
    cancelHandller() {
      this.closeHandller();
      this.modalOption.cancelHandller(this.modalOption);
    },
    /**
     * 点击确定回调
     */
    okHandller() {
      this.modalOption.okHandller(this.modalOption, this.closeHandller);
    }
  }
};
</script>