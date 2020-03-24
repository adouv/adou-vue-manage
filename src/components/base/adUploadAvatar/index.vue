<template>
  <div class="ad-upload-avatar-base">
    <a-upload
      :name="name"
      listType="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :beforeUpload="uploadBeforeHandller"
      @change="uploadChangeHandller"
      :customRequest="customRequestHandller"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">{{label}}</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
import adUploadService from "../../../service/adUploadService";
export default {
  name: "AdUploadAvatarBaseComponent",
  props: {
    /**
     * 名称
     * String
     */
    name: {
      type: String,
      default: "avatar"
    },
    /**
     * 按钮名称
     * String
     */
    label: {
      type: String,
      default: "上传"
    },
    value: [String]
  },
  data() {
    return {
      loading: false,
      imageUrl: this.value
    };
  },
  methods: {
    /**
     * 自定义上传
     */
    customRequestHandller(event) {
      let formData = new FormData();

      formData.append("imgFile", event.file);
      formData.append("Filename", event.filename);
      formData.append("Upload", "Submit Query");

      adUploadService
        .uploadKeFile(formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          dir: "image"
        })
        .then(response => {
          if (response) {
            let result = JSON.parse(response);
            this.imageUrl = result.fullUrl;
            this.loading = false;
            this.$emit("input", this.imageUrl);
          }
        });
    },
    /**
     * 上传前验证文件格式
     */
    uploadBeforeHandller(file, fileList) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("您只能上传 JPG 文件!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图标必须小于 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    /**
     * 上传发生改变
     */
    uploadChangeHandller(event) {
      if (event.file.status === "uploading") {
        this.loading = true;
        return;
      }
    }
  }
};
</script>