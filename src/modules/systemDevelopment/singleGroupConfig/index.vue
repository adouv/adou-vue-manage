<template>
  <ad-main :title="['首页','系统开发配置','单页分类配置']">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">分类名称</h4>
          <a-input placeholder="分类名称" v-model="params.Name"></a-input>
        </div>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSingleGroupPageList()">搜索</a-button>
        <a-button
          type="primary"
          @click.native="$router.push({name:'adSysDevSingleGroupConfigModify'});"
        >添加</a-button>
      </div>
    </div>

    <ad-table
      :columns="columns"
      :dataSource="list"
      :loading="loading"
      :minWidth="1000"
      pagination
      :total="listTotal"
      :pageSize="params.PageSize"
      :pageIndex="params.PageIndex"
      @pageChange="getAdSingleGroupPageList"
    >
      <template slot="Operating" slot-scope="rows">
        <a-button type="danger" size="small" @click.native="btnDeleteHandller(rows.data);">删除</a-button>
        <a-button type="primary" size="small" @click.native="btnModifyHandller(rows.data);">编辑</a-button>
      </template>
    </ad-table>
  </ad-main>
</template>

<script>
import adSystemMenuService from "../../../service/adSystemMenuService";
import adSingleGroupService from "../../../service/adSingleGroupService";
import adSingleCustomFieldService from "../../../service//adSingleCustomFieldService";
export default {
  name: "AdSystemDevSingleGroupConfigComponent",
  data() {
    return {
      params: {
        Name: "",
        IsDel: 1,
        OrderBy: "Sort",
        IsDesc: false,
        PageIndex: 1,
        PageSize: 10
      },
      columns: [
        {
          title: "编号",
          dataIndex: "ID",
          key: "ID"
        },
        {
          title: "分类名称",
          dataIndex: "Name",
          key: "Name"
        },
        {
          title: "排序",
          dataIndex: "Sort",
          key: "Sort"
        },
        {
          title: "更新时间",
          dataIndex: "Time",
          key: "ModifyTime"
        },
        {
          title: "操作",
          dataIndex: "Operating",
          key: "Operating",
          width: "15%"
        }
      ],
      list: [],
      listTotal: 0,
      loading: false
    };
  },
  mounted() {
    this.getAdSingleGroupPageList();
  },
  methods: {
    /**
     * 获取列表
     */
    getAdSingleGroupPageList(pageIndex = 1) {
      this.loading = true;

      this.list = [];

      this.params.PageIndex = pageIndex;

      adSingleGroupService
        .getAdSingleGroupPageList(this.params)
        .then(response => {
          this.list = [];

          this.listTotal = response.TotalItems;
          this.params.PageIndex = response.CurrentPage;
          if (response.Items.length > 0) {
            this.list = response.Items;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    /**
     *
     */
    btnDeleteHandller(item, index) {
      this.$confirm({
        title: "提示",
        content: "确定要删除吗?",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let pms1 = adSingleGroupService.updateSingleGroupAndSingleCustomFieldIsDelByID(
            {
              ID: item.ID,
              IsDel: 0
            }
          );
          let pms2 = adSystemMenuService.updateSystemMenuIsDelByOtherID({
            OtherID: params.ID,
            IsDel: 0
          });
          this.http$.all([pms1, pms2]).then(
            this.http$.spread((res1, res2) => {
              if (res1 > 0) {
                this.$message.info("删除成功");
                this.getAdSingleGroupPageList();
              } else {
                this.$message.info("删除失败");
              }
              close();
            })
          );
        }
      });
    },
    /**
     *
     */
    btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });

      let params = {
        GroupID: item.ID,
        IsDel: 1
      };

      adSingleCustomFieldService
        .getAdSingleCustomFieldList(params)
        .then(response => {
          item.AdSingleCustomFieldList = response;
          this.$router.push({
            name: "adSysDevSingleGroupConfigModify",
            params: item
          });
        })
        .catch(err => {
          this.adSpin$.hide();
        });
    }
  }
};
</script>
