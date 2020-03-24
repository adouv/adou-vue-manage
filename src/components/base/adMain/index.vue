<template>
  <a-layout class="ad-main-base">
    <a-breadcrumb style="margin: 16px 0;padding:0px 24px">
      <a-breadcrumb-item v-for="(item,index) in title" :key="index">{{item}}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <div class="back" v-if="back" @click="$router.go(-1);">
        <a-icon type="rollback" />
        <p>返回</p>
      </div>
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
    back: {
      type: Boolean,
      default: false
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
  .back {
    border-radius: 50%;
    position: fixed;
    right: 5px;
    bottom: 50px;
    z-index: 99999;
    width: 45px;
    height: 45px;
    text-align: center;
    background: #1d6ad2;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    p {
      font-size: 12px;
      font-weight: normal;
      margin-top: -5px;
    }
  }
}
</style>