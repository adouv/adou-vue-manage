<template>
  <div class="ad-ke-upload-btn-box-base-component">
    <p v-if="!val">
      <i class="icon ti-plus"></i>
      <span>选择封面</span>
    </p>
    <img v-if="val" :src="val" />
    <div class="ad-ke-upload-btn">
      <ul>
        <li @click="selectContentImage();">从正文选择</li>
        <li @click="selectLibraryImage();">从图片库选择</li>
      </ul>
    </div>
  </div>
</template>

<script>
import adUploadService from "../../../service/adUploadService";
import AadKeUploadBtnBoxImageListBaseComponent from "./imageList.vue";
export default {
  name: "AadKeUploadBtnBoxBaseComponent",
  props: {
    content: {
      type: String,
      default: ""
    },
    value: [String]
  },
  data() {
    return {
      val: this.value,
      params: {
        path: "",
        order: "Name",
        dir: "image",
        auto: "auto"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 从文章中选择图片
     */
    selectContentImage() {
      let imgList = [];
      let html = this.content;
      //匹配img标签
      let imgRegex = new RegExp(/<img.*?(?:>|\/>)/gi);
      let imgResult = html.match(imgRegex);
      if (imgResult && imgResult.length > 0) {
        //匹配src属性
        let imgSrcRegex = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        imgResult.forEach((img, ind) => {
          let t = {
            index: ind,
            src: img.match(imgSrcRegex)[1],
            check: false,
            width: 0,
            height: 0,
            marginTop: 0
          };

          let fw = 115;
          let fh = 115;

          let image = new Image();
          image.src = t.src;

          image.onload = () => {
            if (image.width > 0 && image.height > 0) {
              if (image.width / image.height >= fw / fh) {
                if (image.width > fw) {
                  t.width = fw;
                  t.height = (image.height * fw) / image.width;
                } else {
                  t.width = image.width;
                  t.height = image.height;
                }
              } else {
                if (image.height > fh) {
                  t.width = (image.width * fh) / image.height;
                  t.height = fh;
                } else {
                  t.width = image.width;
                  t.height = image.height;
                }
              }
            }

            t.marginTop = (fh - t.height) / 2;
            imgList.push(t);
          };
        });
      }
      let params = {
        type: 1,
        list: imgList
      };
      this.showModal(params);
    },
    /**
     * 从图片库选择图片
     */
    selectLibraryImage() {
      adUploadService.getFileList(this.params).then(response => {
        if (response) {
          let list = [];
          let folder = JSON.parse(response);
          if (folder.file_list.length > 0) {
            let promiseList = [];
            folder.file_list.forEach((item, index) => {
              item.index = index;
              item.list = [];
              list.push(item);
              promiseList.push(
                adUploadService.getFileList({
                  path: item.filename + "/",
                  order: "NAME",
                  dir: "image",
                  auto: "auto"
                })
              );
            });

            this.getImageListByFolder(promiseList, list);
          } else {
            let params = {
              type: 2,
              list: list
            };
            this.showModal(params);
          }
        }
      });
    },
    /**
     * 通过文件夹获取图片文件
     */
    getImageListByFolder(promiseList, list) {
      if (promiseList.length > 0) {
        Promise.all(promiseList).then(response => {
          if (response) {
            response.forEach(file => {
              let fileResult = JSON.parse(file);
              let folderItem = list.find(
                e => e.filename === fileResult.current_dir_path.replace("/", "")
              );
              if (folderItem) {
                folderItem.count = fileResult.file_list.length;
                if (fileResult.file_list.length > 0) {
                  fileResult.file_list.forEach((t, i) => {
                    t.prefix = fileResult.current_url.replace(
                      "/_Ashx/KE/../..",
                      ""
                    );
                    t.index = Math.random() * fileResult.file_list.length * 2;
                    t.check = false;
                    folderItem.list.push(t);
                  });
                }
              }
            });
          }
          let params = {
            type: 2,
            list: list
          };
          this.showModal(params);
        });
      }
    },
    /**
     *
     */
    showModal(params = {}) {
      let options = {};
      options.title = params.type === 1 ? "从正文选择图片" : "从图片库选择图片";
      options.cleanText = "关闭";
      options.saveText = "裁剪";
      options.showSave = true;
      options.componentName = AadKeUploadBtnBoxImageListBaseComponent;
      options.width = 800;
      options.height = 500;
      options.params = params;
      options.save = (params, close) => {
        if (params.type === 1) {
          let res = params.list.find(e => e.check);
          if (res) {
            this.val = res.src;
            this.$emit("input", this.val);
          }
        }

        if (params.type === 2) {
          let imgList = [];
          if (params.list.length > 0) {
            params.list.forEach(item => {
              if (item.list.length > 0) {
                item.list.forEach(sub => {
                  imgList.push(sub);
                });
              }
            });
          }
          let res = imgList.find(e => e.check);
          if (res) {
            this.val = res.prefix + res.filename;
            this.$emit("input", this.val);
          }
        }

        if (!this.val) {
          this.$tip("请选择要裁剪的封面");
        } else {
          close();
          this.showCropModal();
        }
      };
      this.modal$(options);
    },
    /**
     *
     */
    showCropModal() {}
  }
};
</script>

<style lang="scss">
.ad-ke-upload-btn-box-base-component {
  border: 2px dashed #ebebeb;
  color: #43b548;
  width: 200px;
  height: 200px;
  text-align: center;
  position: relative;
  overflow: hidden;
  .ad-ke-upload-btn {
    display: none;
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: 40px;
    line-height: 40px;
    background-color: rgba($color: #000, $alpha: 0.5);
    color: #fff;
    ul {
      display: flex;
      margin: 0px;
      padding: 0px;
      list-style: none;
      li {
        width: 50%;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  &:hover {
    background-color: #f6f8f9;
    .ad-ke-upload-btn {
      display: block;
    }
  }
  img {
    width: 100%;
    height: auto;
  }
  p {
    padding-top: 80px;
    i {
      font-size: 20px;
    }
    span {
      display: block;
      font-size: 14px;
    }
  }

  //   span {
  //     display: block;
  //     font-weight: 200;
  //     &:first {
  //       font-size: 14px;
  //     }
  //     i {
  //       font-size: 24px;
  //     }
  //   }
}
</style>