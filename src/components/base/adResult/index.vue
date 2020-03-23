<template>
  <div class="ad-result-base">
    <div class="ad-result-icon">
      <a-icon type="check-circle" class="success" v-if="status==='success'" />
      <a-icon type="close-circle" class="error" v-if="status==='error'" />
      <a-icon type="exclamation-circle" class="info" v-if="status==='info'" />
      <a-icon type="warning" class="warning" v-if="status==='warning'" />
      <a-icon type="check-circle" class="404" v-if="status==='404'" />
      <a-icon type="check-circle" class="403" v-if="status==='403'" />
      <a-icon type="check-circle" class="500" v-if="status==='500'" />
    </div>
    <div class="ad-result-title">{{title}}</div>
    <div class="ad-result-subtitle">{{des}}</div>
    <div class="ad-result-extra">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdResultBaseComponent",
  props: {
    /**
     * 结果状态，决定图标和颜色
     * `'success' | 'error' | 'info' | 'warning'| '404' | '403' | '500'`
     */
    status: {
      type: String,
      default: "info"
    },
    /**
     * 标题
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * 描述
     */
    des: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-result-base {
  width: 100%;
  padding: 48px 0px;
  .ad-result-icon {
    text-align: center;
    font-size: 80px;
    .success {
      color: #52c41a;
    }
    .error {
      color: #f5222d;
    }
    .info {
      color: #1890ff;
    }
    .warning {
      color: #faad14;
    }
  }
  .ad-result-title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .ad-result-subtitle {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }
  .ad-result-extra {
    margin-top: 32px;
    text-align: center;
  }
}
</style>