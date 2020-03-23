<template>
  <ad-main title="字典分类管理">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <ad-example title="字典分类名称">
          <el-input size="mini" v-model="params.Label" placeholder="请输入字典分类名称"></el-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <el-button size="mini" @click.native="getSystemDictionaryTypeList();">搜索</el-button>
        <el-button
          size="mini"
          type="primary"
          @click.native="$router.push({name:'adSysDictionaryModify',params:{
            type:0
          }})"
        >添加</el-button>
      </div>
    </div>

    <ad-table :headers="headers" :list="list">
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{item.ID}}</td>
          <td>{{item.Label}}</td>
          <td>
            <ad-input
              v-model="item.Sort"
              @blur.native.capture="sortBlurHandller(item)"
              style="width:50px;text-align:center;"
            ></ad-input>
          </td>
          <td>
            <el-switch
              v-model="item.IsValideCheck"
              @change="isValideChangeHandller(item)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </td>
          <td>{{item.ModifyTime|dateFormats}}</td>
          <td>
            <ad-button type="danger" size="sm" @click.native="btnDeleteHandller(item);">删除</ad-button>
            <ad-button type="primary" size="sm" @click.native="btnModifyHandller(item);">编辑</ad-button>
          </td>
        </tr>
      </tbody>
    </ad-table>
  </ad-main>
</template>

<script>
import adSystemDictionaryService from "../../../service/adSystemDictionaryService";
export default {
  name: "AdSystemDictionaryTypeComponent",
  data() {
    return {
      params: {
        ID: 0,
        Coding: "",
        Value: "",
        Label: "",
        ParentID: 0,
        IsValide: -1,
        OrderBy: "Sort",
        IsDesc: false
      },
      headers: ["编号", "字典分类名称", "排序", "是否有效", "更新时间", "操作"],
      list: []
    };
  },
  mounted() {
    this.getSystemDictionaryTypeList();
  },
  methods: {
    /**
     *
     */
    getSystemDictionaryTypeList() {
      this.list = [];

      const loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "hsla(0,0%,100%,.9)"
      });

      adSystemDictionaryService
        .getSystemDictionaryList(this.params)
        .then(response => {
          if (response && response.length > 0) {
            response.forEach(element => {
              element.IsValideCheck = element.IsValide === 1;
            });
            this.list = response;
          }
          loading.close();
        })
        .catch(err => {
          loading.close();
        });
    },
    /**
     * 更新数据字典是否有效
     */
    isValideChangeHandller(item) {
      let params = {
        ID: item.ID,
        IsValide: item.IsValideCheck ? 1 : 0
      };

      adSystemDictionaryService
        .updateSystemDictionaryIsValideByID(params)
        .then(response => {
          if (response > 0) {
            if (params.IsValide === 1) {
              this.$tip("已设置为有效");
            } else {
              this.$tip("已设置为无效");
            }
          } else {
            this.$tip("设置失败");
          }
        });
    },
    /**
     * 更新数据字典排序值
     */
    sortBlurHandller(item) {
      if (!item.Sort) {
        return;
      }

      if (isNaN(item.Sort)) {
        this.$tip("排序必须是数字");
        return;
      }

      if (item.Sort < 0) {
        this.$tip("排序不能小于0");
        return;
      }

      let params = {
        ID: item.ID,
        Sort: item.Sort
      };

      adSystemDictionaryService
        .updateSystemDictionarySortByID(params)
        .then(response => {
          this.getSystemDictionaryTypeList();
        });
    },
    /**
     * 删除数据字典
     */
    btnDeleteHandller(item) {
      let options = {};
      options.title = "确认提示";
      options.message = "确认要删除吗？";
      options.params = {
        ID: item.id,
        ParentID: item.parentId
      };
      options.save = (params, close) => {
        adSystemDictionaryService
          .deleteSystemDictionaryByID(params)
          .then(response => {
            if (response > 0) {
              this.$tip("删除成功");
              this.getSystemDictionaryTypeList();
            } else {
              this.$tip("删除失败");
            }
            close();
          });
      };

      this.confirm$(options);
    },
    /**
     * 更新数据字典
     */
    btnModifyHandller(item) {
      item.type = 0;
      this.$router.push({ name: "adSysDictionaryModify", params: item });
    }
  }
};
</script>