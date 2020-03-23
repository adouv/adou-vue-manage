<template>
  <div class="ad-spin-tool" v-if="option.spinning">
    <a-spin :spinning="option.spinning" :tip="option.tip">
      <div class="spin-content"></div>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: "AdSpinToolComponent",
  data() {
    return {
      option: {
        spinning: false,
        tip: "",
        show: () => {
          this.option.spinning = true;
        },
        close: () => {
          this.option.spinning = false;
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.ad-spin-tool {
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999999;
  .spin-content {
    background-color: #e6f7ff;
    height: 100vh;
    min-height: 100vh;
  }
}
</style>