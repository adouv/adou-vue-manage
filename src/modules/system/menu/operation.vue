<template>
  <div class="ad-system-menu-operation">
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12" v-for="(item,index) in list" :key="index">
        <ad-example title>
          <div style="display:flex;align-items:center;">
            <a-input v-model="item.Title" placeholder="按钮名称" style="margin:0px 10px"></a-input>
            <a-input v-model="item.Perms" placeholder="权限标识" style="margin:0px 10px"></a-input>
            <a-icon
              v-if="list.length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="remove(item,index);"
            />
          </div>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title>
          <a-button type="dashed" style="width: 100%" @click="add">
            <a-icon type="plus" />增加权限
          </a-button>
        </ad-example>
      </div>
    </div>
  </div>
</template>

<script>
import adSystemMenuService from "../../../service/adSystemMenuService";
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
        ParentID: this.params.ID,
        LevelID: 0,
        Type: 2,
        Perms: "",
        Sort: 100,
        IsValide: 1,
        IsDel: 1
      });
    },
    remove(item, index) {
      this.list.splice(index, 1);
    },
    btnSave() {
      if (this.params.OperationList.length === 0) {
        this.$message.info("请增加权限");
        return;
      }

      let resultList = [];

      this.params.OperationList.forEach(item => {
        if (item.ID === 0) {
          resultList.push(adSystemMenuService.addSystemMenu(item));
        } else {
          resultList.push(adSystemMenuService.updateSystemMenuByID(item));
        }
      });

      Promise.all(resultList).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-system-menu-operation {
  .example-wrap {
    margin-bottom: 10px !important;
  }
}
</style>