<template>
  <ad-main :title="['首页','系统管理','字典管理']" class="ad-system-dictionary">
    <a-layout>
      <a-layout-sider class="ad-system-dictionary-sidebar">
        <a-menu mode="inline" style="height:100%">
          <a-menu-item
            v-for="(item,index) in menuList"
            :key="index"
            @click="typeClickHandller(item);"
          >
            <span>{{item.Label}}</span>
            <a-button type="danger" size="small" @click.native="btnDeleteHandller(item);">
              <a-icon type="delete"></a-icon>
            </a-button>
            <a-button type="primary" size="small" @click.native="btnModifyHandller(item,0);">
              <a-icon type="edit"></a-icon>
            </a-button>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content
        class="ad-system-dictonary-content"
        style="background:#fff;padding:0px 20px"
      >
        <div class="row row-lg">
          <div class="col-sm-6 col-md-4">
            <ad-example title="编码">
              <a-input v-model="params.Coding" placeholder="请输入编码"></a-input>
            </ad-example>
          </div>

          <div class="col-sm-6 col-md-4">
            <ad-example title="字典名称">
              <a-input v-model="params.Label" placeholder="请输入字典名称"></a-input>
            </ad-example>
          </div>

          <div class="col-sm-6 col-md-4">
            <ad-example title="字典值">
              <a-input v-model="params.Value" placeholder="请输入字典值"></a-input>
            </ad-example>
          </div>

          <div class="col-sm-12 col-md-12">
            <a-button type="inverse" @click="getSystemDictionaryList">搜索</a-button>
            <a-button type="primary" @click="$router.push({name:'adSysDictionaryModify'});">添加</a-button>
          </div>
        </div>

        <ad-table :columns="columns" :dataSource="list" :loading="loading" :minWidth="800">
          <template slot="Sort" slot-scope="rows">
            <a-input
              v-model="rows.data.Sort"
              @blur.native.capture="sortBlurHandller(rows.data)"
              style="width:50px;text-align:center;"
            ></a-input>
          </template>
          <template slot="IsValide" slot-scope="rows">
            <a-switch
              v-model="rows.data.IsValideCheck"
              checkedChildren="启用"
              unCheckedChildren="禁用"
              @change="isValideChangeHandller(rows.data);"
            />
          </template>
          <template slot="Operating" slot-scope="rows">
            <a-button
              type="danger"
              size="small"
              icon="delete"
              @click.native="btnDeleteHandller(rows.data);"
            ></a-button>
            <a-button
              type="primary"
              size="small"
              icon="edit"
              @click.native="btnModifyHandller(rows.data,1);"
            ></a-button>
          </template>
          <template slot="mobile" slot-scope="item">
            <a-list-item>
              <a-list-item-meta>
                <a slot="title">{{item.data.ID}}-编码：{{item.data.Coding}}</a>
                <template slot="description">
                  <p>键：{{item.data.Label}}</p>
                  <p>值：{{item.data.Value}}</p>
                  <p>
                    <a-switch
                      v-model="item.data.IsValideCheck"
                      checkedChildren="启用"
                      unCheckedChildren="禁用"
                      @change="isValideChangeHandller(item.data);"
                    />
                  </p>
                  <a-button
                    type="danger"
                    size="small"
                    icon="delete"
                    @click.native="btnDeleteHandller(item.data);"
                  ></a-button>
                  <a-button
                    type="primary"
                    size="small"
                    icon="edit"
                    @click.native="btnModifyHandller(item.data,1);"
                  ></a-button>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </ad-table>
        <div class="footer" @click="toggleMenuHandller();">
          <i class="icon ti-menu"></i>
          {{text}}分类
        </div>
      </a-layout-content>
    </a-layout>
  </ad-main>
</template>

<script>
import adTreeService from "../../../service/adTreeService";
import adSystemDictionaryService from "../../../service/adSystemDictionaryService";
export default {
  name: "AdSystemDictionaryComponent",
  data() {
    return {
      text: "显示",
      params: {
        ID: 0,
        Coding: "",
        Value: "",
        Label: "",
        ParentID: 0,
        IsValide: null,
        OrderBy: "Sort",
        IsDesc: false
      },
      defaultId: 0,
      columns: [
        {
          title: "编号",
          dataIndex: "ID",
          key: "ID"
        },
        {
          title: "编码",
          dataIndex: "Coding",
          key: "Coding"
        },
        {
          title: "字典标签",
          dataIndex: "Label",
          key: "Label"
        },
        {
          title: "字典值",
          dataIndex: "Value",
          key: "Value"
        },
        {
          title: "排序",
          dataIndex: "Sort",
          key: "Sort"
        },
        {
          title: "是否有效",
          dataIndex: "IsValide",
          key: "IsValide"
        },
        {
          title: "操作",
          dataIndex: "Operating",
          key: "Operating"
        }
      ],
      menuList: [],
      list: [],
      loading: true
    };
  },
  mounted() {
    this.getLeftSystemDictionaryList();
  },
  methods: {
    /**
     * 获取字典分类栏目
     */
    getLeftSystemDictionaryList() {
      this.loading = true;
      this.menuList = [];

      adSystemDictionaryService
        .getSystemDictionaryList({
          ParentID: 0,
          OrderBy: "Sort",
          IsDesc: false
        })
        .then(response => {
          if (response && response.length > 0) {
            this.menuList = response;
            this.defaultId = this.menuList[0].ID;
            this.getSystemDictionaryList();
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    /**
     * 手机端字典分类切换
     */
    toggleMenuHandller() {
      if (
        !$(".ad-system-dictionary").hasClass(
          "show-ad-system-dictionary-sidebar"
        )
      ) {
        this.text = "隐藏";
        $(".ad-system-dictionary").addClass(
          "show-ad-system-dictionary-sidebar"
        );
      } else {
        this.text = "显示";
        $(".ad-system-dictionary").removeClass(
          "show-ad-system-dictionary-sidebar"
        );
      }
    },
    /**
     * 点击左侧获取数据字典列表事件
     */
    typeClickHandller(item) {
      this.defaultId = item.ID;
      this.toggleMenuHandller();
      this.getSystemDictionaryList();
    },

    /**
     * 获取数据字典数据列表
     */
    getSystemDictionaryList() {
      this.loading = true;

      this.list = [];

      this.params.ParentID = this.defaultId;

      adSystemDictionaryService
        .getSystemDictionaryList(this.params)
        .then(response => {
          if (response && response.length > 0) {
            response.forEach(element => {
              element.IsValideCheck = element.IsValide === 1;
              this.list.push(element);
            });
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
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
              this.$message.info("已设置为有效");
            } else {
              this.$message.info("已设置为无效");
            }
          } else {
            this.$message.info("设置失败");
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
        this.$message.info("排序必须是数字");
        return;
      }

      if (item.Sort < 0) {
        this.$message.info("排序不能小于0");
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
      this.$confirm({
        title: "提示",
        content: "确定要删除吗?",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let params = {
            ID: item.ID
          };
          adSystemDictionaryService
            .deleteSystemDictionaryByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getLeftSystemDictionaryList();
              } else {
                this.$message.info("删除失败");
              }
              close();
            });
        }
      });
    },
    /**
     * 更新数据字典
     */
    btnModifyHandller(item, type) {
      this.adSpin$.show({ tip: "正在加载..." });
      item.Type = type;
      this.$router.push({ name: "adSysDictionaryModify", params: item });
    }
  }
};
</script>

<style lang="scss" scoped>
.ant-menu-item {
  .ant-btn {
    float: right;
    margin-top: 8px;
    &:last-child {
      margin-right: 5px;
    }
    > i {
      margin: 0px !important;
    }
  }
}

.ad-system-dictionary {
  .footer {
    display: none;
    background: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    top: 110px;
    right: 10px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    padding: 10px;
    i {
      margin-right: 5px;
    }
  }
}
.show-ad-system-dictionary-sidebar {
  .ad-system-dictionary-sidebar {
    left: 0px !important;
    transition: all 0.5s;
  }
}
@media (max-width: 700px) {
  .ad-system-dictionary {
    .footer {
      display: block;
    }
    .ad-system-dictionary-sidebar {
      height: 100%;
      min-height: 100%;
      position: fixed;
      top: 0px;
      left: -200px;
      background: #fff;
      z-index: 99;
      padding-top: 50px;
      overflow-y: auto;
      transition: all 0.5s;
    }

    .ad-system-dictonary-content {
      padding: 0px !important;
    }
  }
}
</style>
