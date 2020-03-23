<template>
  <a-layout class="ad-main-base">
    <a-breadcrumb style="margin: 16px 0;padding:0px 24px">
      <a-breadcrumb-item v-for="(item,index) in title" :key="index">{{item}}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <a-alert v-if="message" :message="message" banner style="margin-bottom:20px" />
      <slot></slot>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "AdMainBaseComponent",
  props: {
    title: {
      type: Array,
      default: () => []
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/ddd/mixin.scss";
.ad-main-base {
  .ant-layout-content {
    overflow-x: auto;
    @include scroll-bar(3px);
  }
}
</style>