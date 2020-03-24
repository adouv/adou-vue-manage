<template>
  <div class="ad-test">
    <div class="cropper-main">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
        @realTime="realTimeHandller"
      ></vueCropper>
    </div>
    <div class="cropper-tool">
      <input type="button" class="oper" value="+" title="放大" @click="changeScale(1)" />
      <input type="button" class="oper" value="-" title="缩小" @click="changeScale(-1)" />
      <input type="button" class="oper" value="↺" title="左旋转" @click="rotateLeft" />
      <input type="button" class="oper" value="↻" title="右旋转" @click="rotateRight" />
      <input type="button" class="oper" x value="↓" title="下载" @click="down('blob')" />
      <div style="margin-left:20px;">
        <div
          class="show-preview"
          :style="{'width': '150px', 'height':'150px',  'overflow': 'hidden', 'margin': '5px'}"
        >
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  name: "AdTestComponent",
  components: {
    VueCropper
  },
  data() {
    return {
      option: {
        /**
         * 裁剪图片的地址
         */
        img: require("../assets/aaaaaa.jpg"),
        /**
         * 裁剪生成图片的质量
         */
        outputSize: 1, //剪切后的图片质量（0.1-1）
        /**
         * 是否输出原图比例的截图
         */
        full: false, //输出原图比例截图 props名full
        /**
         * 裁剪生成图片的格式
         */
        outputType: "jpg",
        /**
         * 上传图片是否可以移动
         */
        canMove: true,
        /**
         * 上传图片按照原始比例渲染
         */
        original: false,
        /**
         * 截图框能否拖动
         */
        canMoveBox: true,
        /**
         * 是否默认生成截图框
         */
        autoCrop: true,
        /**
         * 默认生成截图框宽度
         */
        autoCropWidth: 150,
        /**
         * 默认生成截图框高度
         */
        autoCropHeight: 150,
        /**
         * 固定截图框大小 不允许改变
         */
        fixedBox: true
      },
      previews: {}
    };
  },
  methods: {
    realTimeHandller(data) {
      console.log(data);
      this.previews = data;
    },
    //放大/缩小
    changeScale(num) {
      console.log("changeScale");
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      console.log("rotateLeft");
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      console.log("rotateRight");
      this.$refs.cropper.rotateRight();
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-test {
  display: flex;
  .cropper-main {
    width: 247px;
    height: 228px;
  }
  .cropper-tool{
      border: 1px solid #f00;
  }
}
</style>