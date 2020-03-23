<template>
  <div class="example-wrap">
    <h4 class="example-title">
      {{title}}
      <span class="required" style="color:#f00;font-size:10px;" v-if="required">*</span>
      <span style="color:#f00;font-size:10px;">{{des}}</span>
    </h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AdExampleBaseComponent",
  props: {
    title: {
      type: String,
      default: "默认标题"
    },
    required: {
      type: Boolean,
      default: false
    },
    des: {
      type: [String, Number, Boolean],
      default: ""
    }
  }
};
</script>