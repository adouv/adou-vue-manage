<template>
  <select
    class="ant-input"
    :class="{'ant-input-lg':size==='large','ant-input-sm':size==='small'}"
    v-model="val"
    @change="selectChangeHandller();"
  >
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: "AdSelectBaseComponent",
  props: {
    /**
     * 控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small
     */
    size: {
      type: String,
      default: "default"
    },
    value: [String, Array, Number, Boolean]
  },
  data() {
    return {
      val: this.value
    };
  },
  mounted() {
    this.val = this.value;

    this.$nextTick(() => {
      this.val = this.value;
    });
  },
  methods: {
    /**
     *
     */
    selectChangeHandller() {
      this.$emit("input", this.val);
      this.$emit("change", this.val);
    }
  }
};
</script>