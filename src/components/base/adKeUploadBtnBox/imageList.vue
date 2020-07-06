<template>
  <div class="ad-ke-upload-image-list">
    <div class="image-msg" v-if="params.list.length==0">正文中无可用做封面的图片</div>
    <!--从内容中选取图片-->
    <div class="image-list" v-if="params.type===1 && params.list.length>0">
      <ul>
        <li v-for="(item,index) in params.list" :key="index" @click="imgSelectHandller(item);">
          <p v-if="item.check">
            <span>
              <i class="icon ti-check"></i>
            </span>
          </p>
          <img
            :src="item.src"
            :width="item.width"
            :height="item.height"
            :style="{marginTop:item.marginTop+'px'}"
            alt
          />
        </li>
      </ul>
    </div>
    <!--从图片库选取图片-->
    <div class="server-image-list" v-if="params.type===2 && params.list.length>0">
      <div class="file-left">
        <ul>
          <li :class="{'current':ind===-1}" @click="getAllImageList();">全部图片({{count}})</li>
          <li
            v-for="(item,index) in params.list"
            :key="index"
            :class="{'current':ind===index}"
            @click="selectImageHandller(item,index);"
          >{{item.filename}}({{item.count}})</li>
        </ul>
      </div>
      <div class="file-main">
        <ul>
          <li v-for="(item,index) in imageList" :key="index" @click="imgSelectHandller(item);">
            <p v-if="item.check">
              <span>
                <i class="icon ti-check"></i>
              </span>
            </p>
            <img
              :src="`${item.prefix}${item.filename}`"
              :width="item.width"
              :height="item.height"
              :style="{marginTop:item.marginTop+'px'}"
              alt
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import adUploadService from "../../../service/adUploadService";
export default {
  name: "AadKeUploadBtnBoxImageListBaseComponent",
  props: ["params"],
  data() {
    return {
      imageList: [],
      count: 0,
      ind: -1,
      imageConfig: {
        width: 115,
        height: 115
      }
    };
  },
  mounted() {
    if (this.params.type === 2) {
      this.getAllImageList();
    }
  },
  methods: {
    /**
     *
     */
    imgSelectHandller(item) {
      item.check = !item.check;

      if (this.params.type === 1) {
        this.params.list
          .filter(e => e.index != item.index)
          .forEach(element => {
            element.check = false;
          });
      } else {
        this.imageList
          .filter(e => e.index != item.index)
          .forEach(element => {
            element.check = false;
          });
      }
    },
    /**
     *
     */
    selectImageHandller(item, index) {
      this.ind = index;
      this.imageList = [];
      let res = this.params.list.find(e => e.filename === item.filename);
      if (res) {
        this.imageList.push(...res.list);
      }
    },
    /**
     *
     */
    getAllImageList() {
      this.ind = -1;
      this.imageList = [];
      if (this.params.list.length > 0) {
        this.params.list.forEach(item => {
          if (item.list.length > 0) {
            item.list.forEach(t => {
              t.width = 0;
              t.height = 0;
              t.marginTop = 0;

              let src = t.prefix + t.filename;

              let fw = this.imageConfig.width;
              let fh = this.imageConfig.height;

              let image = new Image();
              image.src = src;

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
                this.imageList.push(t);
              };
            });
            this.count = this.imageList.length;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/ddd/mixin.scss";
.ad-ke-upload-image-list {
  height: 350px;
  .image-msg {
    text-align: center;
    line-height: 350px;
  }
  /** */
  .image-list {
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        width: 16.6%;
        text-align: center;
        padding: 5px 0px;
        p {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          span {
            display: block;
            width: 115px;
            height: 115px;
            line-height: 115px;
            color: #fff;
            font-size: 40px;
            font-weight: bold;
            margin: 5px auto;
            background: rgba($color: #000000, $alpha: 0.5);
          }
        }
      }
    }
  }
  /** */
  .server-image-list {
    display: flex;
    > div {
      border: 1px solid #ddd;
      height: 350px;

      &.file-left {
        border-right: 1px solid #ddd;
        width: 180px;
        overflow-y: auto;
        @include scroll-bar(6px);
        ul {
          list-style: none;
          padding: 0px;
          margin: 0px;
          li {
            height: 40px;
            line-height: 40px;
            text-indent: 2em;
            font-size: 14px;
            font-weight: 400px;
            cursor: pointer;
            &.current {
              background: rgba($color: #000000, $alpha: 0.03);
            }
          }
        }
      }
      &.file-main {
        border-left: none;
        width: 100%;
        flex: 1;
        overflow-y: auto;
        @include scroll-bar(6px);
        ul {
          list-style: none;
          padding: 0px;
          margin: 0px;
          display: flex;
          flex-wrap: wrap;
          li {
            position: relative;
            width: 25%;
            height: 115px;
            text-align: center;
            padding: 5px 0px;
            overflow: hidden;
            p {
              position: absolute;
              left: 0px;
              top: 0px;
              width: 100%;
              height: 100%;
              span {
                display: block;
                width: 115px;
                height: 115px;
                line-height: 115px;
                color: #fff;
                font-size: 40px;
                font-weight: bold;
                margin: 5px auto;
                background: rgba($color: #000000, $alpha: 0.5);
              }
            }
          }
        }
      }
    }
  }
}
</style>