<template>
  <div class="ad-table-base">
    <table
      class="table table-striped"
      :style="{minWidth:`${minWidth}px`}"
      v-if="dataSource.length>0 && !loading"
    >
      <thead>
        <tr>
          <th
            scope="col"
            v-for="(item,index) in columns"
            :key="index"
            :class="item.class"
            :width="item.width"
          >{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in dataSource" :key="index">
          <td v-for="(col,colIndex) in columns" :key="colIndex" :class="col.class">
            <slot :name="col.key" :data="item">
              <span v-if="col.dataIndex!=='Time'">{{item[col.key]}}</span>
              <span v-if="col.dataIndex==='Time'">{{item[col.key]|dateFormats}}</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="table-mobile">
      <a-list itemLayout="horizontal" :dataSource="dataSource">
        <a-list-item slot="renderItem" slot-scope="item">
          <slot name="mobile" :data="item"></slot>
        </a-list-item>
      </a-list>
    </div>
    <ad-result title="暂无数据" v-if="dataSource.length===0 && !loading">
      <slot name="not-bottom"></slot>
    </ad-result>
    <div class="ad-table-base-loading" v-if="loading">
      <a-spin tip="正在加载...">
        <div class="spin-content"></div>
      </a-spin>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdTableBaseComponent",
  props: {
    minWidth: {
      type: Number,
      default: 1000
    },
    /**
     * 加载
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 表头
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 数据源
     */
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: this.dataSource
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/ddd/mixin.scss";
.ad-table-base {
  $loading-height: 300px;
  min-height: $loading-height;
  position: relative;
  margin-top: 20px;
  overflow-x: auto;
  @include scroll-bar(3px);
  .ad-table-base-loading {
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    .spin-content {
      width: 100%;
      height: $loading-height;
      background-color: #e6f7ff;
      padding: 30px;
    }
  }

  .table {
    thead {
      th {
        border-top: none;
        border-bottom: none;
        font-weight: normal;
      }
    }
    tbody {
      tr {
        background: #fff;
      }
    }
  }

  .table-mobile {
    display: none;
  }
}

@media (max-width: 700px) {
  .table {
    display: none;
  }
  .table-mobile {
    display: block !important;
  }
}
</style>