<template>
  <div class="ad-icon-list-base">
    <a-tabs v-model="index" @change="callback">
      <a-tab-pane v-for="item in typeList" :tab="item.title" :key="item.key">
        <div class="icon-list">
          <div
            v-for="(item,index) in list"
            :key="index"
            @click="select(item);"
            :class="{'current':current===item.id}"
          >
            <i :class="item.icon"></i>
            <p>{{item.name}}</p>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import adIconService from "../../../service/adIconService";
export default {
  name: "AdIconListBaseComponent",
  props: {},
  data() {
    return {
      index: 0,
      current: -1,
      typeList: [
        {
          key: 0,
          title: "IconWeb"
        },
        {
          key: 1,
          title: "IconThemify"
        }
      ],
      list: []
    };
  },
  mounted() {
    this.getIconList();
  },
  methods: {
    getIconList() {
      this.list = [];

      if (this.index === 0) {
        adIconService.getIconWebList().then(response => {
          this.list = [];
          this.list = response;
        });
      } else if (this.index === 1) {
        adIconService.getIconThemifyList().then(response => {
          this.list = [];
          this.list = response;
        });
      }
    },
    callback() {
      this.getIconList();
    },
    select(item) {
      this.current = item.id;
      this.$emit("selectEvent", item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/ddd/mixin.scss";
.ad-icon-list-base {
  width: 100%;
  height: 200px;
  overflow-y: auto;
  @include scroll-bar(3px);
  .icon-list {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 20%;
      text-align: center;
      padding: 10px 0px;
      cursor: pointer;
      &:hover,
      &.current {
        background-color: #62a8ea;
        color: #fff;
        i {
          color: #fff;
        }
      }
      i {
        font-size: 24px;
        color: #76838f;
      }
    }
  }
}
</style>