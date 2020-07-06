<template>
  <button type="button" class="el-button el-button--danger ad-upload-button el-button--mini">
    <span>{{btnText}}</span>
    <input
      type="file"
      ref="uploadFile"
      name="uploadFile"
      id="uploadFile"
      class="file"
      :multiple="false"
      @change="sunmitFile($event);"
    />
  </button>
</template>

<script>
import adUploadService from "../../../service/adUploadService";
export default {
  name: "AdKeUploadBtnBaseComponent",
  props: {
    label: {
      type: String,
      default: "上传文件"
    },
    dir: {
      type: String,
      default: "image"
    },
    beforeCallback: {
      type: Function,
      default: files => {
        return false;
      }
    },
    uploadCallback: {
      type: Function,
      default: response => {}
    }
  },
  data() {
    return {
      fileName: "",
      files: [],
      imageExt: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
      btnText: this.label
    };
  },
  methods: {
    /**
     *
     */
    sunmitFile($event) {
      this.btnText = "上传中....";
      let self = this;
      let files = $event.target.files;
      this.files = files;
      let ext = this.files[0].name.split(".").pop();
      this.fileName = this.files[0].name.replace(`.${ext}`, "");
      let next = true;
      /**
       * 上传文件前处理事件
       */
      if (
        !this.beforeCallback({
          files: this.files,
          ext: ext,
          fileName: this.fileName
        })
      ) {
        this.btnText = this.label;
        next = false;
        this.clearUpload();
      }

      if (this.dir === "image") {
        if (!this.imageExt.includes(`.${ext}`)) {
          this.$tip("文件格式不正确");
          next = false;
          this.btnText = this.label;
          this.clearUpload();
          return;
        }
      }
      //上传前验证通过，执行上传
      if (next) {
        /**
         * 组织数据
         */
        let formData = new FormData();

        formData.append("imgFile", files[0]);
        formData.append("Filename", this.fileName);
        formData.append("Upload", "Submit Query");

        /**
         * 配置类型
         */
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          dir: this.dir
        };
        /**
         * 发送数据到服务端
         */
        adUploadService
          .uploadKeFile(formData, config)
          .then(response => {
            self.uploadCallback(response);
            this.btnText = this.label;
            this.clearUpload();
          })
          .catch(error => {
            this.btnText = this.label;
            this.clearUpload();
          });
      }
    },
    /**
     *
     */
    clearUpload() {
      this.$refs.uploadFile.value = null;
    }
  }
};
</script>


<style lang="scss" scoped>
.ad-upload-button {
  border: 1px solid #46be8a;
  background: #46be8a;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .file {
    border: 1px solid #f00;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 28px;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
