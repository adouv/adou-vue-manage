<template>
  <ad-left-main
    :data="parentList"
    :index="index"
    :title="`数据字典 / ${title}`"
    subTitle="字典目录"
    @clickEvent="leftClickHandller"
  >
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <ad-example title="编码">
          <el-input size="mini" v-model="params.Coding" placeholder="请输入编码"></el-input>
        </ad-example>
      </div>

      <div class="col-sm-6 col-md-4">
        <ad-example title="字典名称">
          <el-input size="mini" v-model="params.Label" placeholder="请输入字典名称"></el-input>
        </ad-example>
      </div>

      <div class="col-sm-6 col-md-4">
        <ad-example title="字典值">
          <el-input size="mini" v-model="params.Value" placeholder="请输入字典值"></el-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <el-button size="mini" @click.native="getSystemDictionaryList();">搜索</el-button>
        <el-button
          size="mini"
          type="primary"
          @click.native="$router.push({name:'adSysDictionaryModify',params:{
            type:1
          }})"
        >添加</el-button>
      </div>
    </div>

    <ad-table :headers="headers" :list="list">
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{item.ID}}</td>
          <td>{{item.Coding}}</td>
          <td>{{item.Label}}</td>
          <td>{{item.Value}}</td>
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
          <td>
            <ad-button type="danger" size="sm" @click.native="btnDeleteHandller(item);">删除</ad-button>
            <ad-button type="primary" size="sm" @click.native="btnModifyHandller(item);">编辑</ad-button>
          </td>
        </tr>
      </tbody>
    </ad-table>
  </ad-left-main>
</template>

<script>
import adTreeService from "../../../service/adTreeService";
import adSystemDictionaryService from "../../../service/adSystemDictionaryService";
export default {
  name: "AdSystemDictionaryComponent",
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
      index: 0,
      title: "",
      headers: [
        "编号",
        "编码",
        "字典名称",
        "字典值",
        "排序",
        "是否有效",
        "操作"
      ],
      parentList: [],
      list: []
    };
  },
  mounted() {
    this.getLeftSystemDictionaryList();
  },
  methods: {
    getLeftSystemDictionaryList() {
      this.parentList = [];

      const loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "hsla(0,0%,100%,.9)"
      });

      let params = {
        ID: 0,
        Coding: "",
        Value: "",
        Label: "",
        ParentID: 0,
        IsValide: -1,
        OrderBy: "Sort",
        IsDesc: false
      };

      adSystemDictionaryService
        .getSystemDictionaryList(params)
        .then(response => {
          if (response && response.length > 0) {
            this.parentList = response;
            this.index = this.parentList[0].ID;
            this.title = this.parentList[0].Label;
            this.getSystemDictionaryList();
          }
          loading.close();
        })
        .catch(err => {
          loading.close();
        });
    },
    /**
     * 点击左侧获取数据字典列表事件
     */
    leftClickHandller(event) {
      this.index = event.ID;
      this.getSystemDictionaryList();
    },

    /**
     * 获取数据字典数据列表
     */
    getSystemDictionaryList() {
      this.list = [];

      const loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "hsla(0,0%,100%,.9)"
      });

      this.params.ParentID = this.index;

      adSystemDictionaryService
        .getSystemDictionaryList(this.params)
        .then(response => {
          if (response && response.length > 0) {
            response.forEach(element => {
              element.IsValideCheck = element.IsValide === 1;
              this.list.push(element);
            });
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
          this.getSystemDictionaryList();
        });
    },
    /**
     * 删除数据字典
     */
    btnDeleteHandller(item) {
      let _this = this;
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
              _this.$tip("删除成功");
              _this.getLeftSystemDictionaryList();
            } else {
              _this.$tip("删除失败");
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
      item.type = 1;
      this.$router.push({ name: "adSysDictionaryModify", params: item });
    }
  }
};
</script>

<style lang="scss">
.ad-system-dictionary {
  .el-table__header {
    th {
      font-weight: normal !important;
    }
  }
}
</style>