<template>
  <div class="ad-system-menu-operation">
    <a-alert message="点击图标进行选择" banner style="margin-bottom:20px" />
    <a-form>
      <a-form-item v-for="(item,index) in list" :key="index">
        <div style="display:flex;align-items:center">
          <a-avatar shape="square" size="large" style="cursor:pointer">
            <i :class="item.Icon"></i>
          </a-avatar>
          <a-input
            v-model="item.Title"
            placeholder="请输入权限名称"
            style="margin-left:10px; margin-right: 10px"
          ></a-input>
          <a-icon
            v-if="list.length > 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="list.length === 1"
          />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="dashed" style="width:100%" @click="add">
          <a-icon type="plus" />添加
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "AdSystemMenuOperationComponent",
  props: {
    params: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      list: this.params.OperationList
    };
  },
  mounted() {
    this.adSpin$.hide();
  },
  methods: {
    add() {
      this.list.push({
        ID: 0,
        Title: "",
        Icon: "fa fa-file-image-o",
        Url: "",
        Path: "",
        OtherID: 0,
        ParentID: 0,
        LevelID: 0,
        Type: 0,
        Perms: "",
        Sort: 100,
        IsValide: 1,
        IsDel: 1
      });
    }
  }
};
</script>