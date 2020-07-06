<template>
  <ad-main :title="['首页','销控管理','项目管理']">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">项目名称</h4>
          <a-input placeholder="项目名称" v-model="params.Name"></a-input>
        </div>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getDataList()">搜索</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSalesProjectModify'})">添加</a-button>
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
      @pageChange="getDataList"
    >
      <template slot="Operating" slot-scope="rows">
        <a-button type="danger" size="small" @click.native="btnDeleteHandller(rows.data);">删除</a-button>
        <a-button type="primary" size="small" @click.native="btnModifyHandller(rows.data);">编辑</a-button>
      </template>
      <!-- <template slot="mobile" slot-scope="item">
        <a-list-item>
          <a-list-item-meta>
            <a slot="title">{{item.data.ID}}-{{item.data.Name}}</a>

            <template slot="description">
              <p>部门：{{item.data.DepartmentInfo.Name}}</p>
              <p>更新时间：{{item.data.ModifyTime|dateFormats}}</p>
              <p>
                <a-switch
                  v-model="item.data.IsValideCheck"
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  @change="userStatusCheckChangeHandller(item.data);"
                />
              </p>

              <a-button type="danger" size="small" @click.native="btnDeleteHandller(item.data);">删除</a-button>
              <a-button type="primary" size="small" @click.native="btnModifyHandller(item.data);">编辑</a-button>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>-->
    </ad-table>
  </ad-main>
</template>

<script>
import adSalesProjectService from "../../../service/adSalesProjectService";
export default {
  name: "AdSalesProjectComponent",
  data() {
    return {
      params: {
        Name: "",
        IsDel: 1,
        OrderBy: "ModifyTime",
        IsDesc: false,
        PageIndex: 1,
        PageSize: 10
      },
      columns: [
        {
          title: "编号",
          dataIndex: "ID",
          key: "ID",
          class: "mobild"
        },
        {
          title: "项目名称",
          dataIndex: "Name",
          key: "Name"
        },
        {
          title: "咨询电话",
          dataIndex: "Tel",
          key: "Tel"
        },
        {
          title: "更新时间",
          dataIndex: "Time",
          key: "ModifyTime"
        },
        {
          title: "操作",
          dataIndex: "Operating",
          key: "Operating"
        }
      ],
      list: [],
      listTotal: 0,
      loading: true
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    async getDataList(pageIndex = 1) {
      this.loading = true;
      this.list = [];
      this.params.PageIndex = pageIndex;

      try {
        let result = await adSalesProjectService.getAdSalesProjectPageList(
          this.params
        );

        this.listTotal = result.TotalItems;
        this.params.PageIndex = result.CurrentPage;
        if (result.Items.length > 0) {
          result.Items.forEach(element => {
            element.IsValideCheck = element.IsValide === 1;
            this.list.push(element);
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    btnDeleteHandller(item) {
      this.$confirm({
        title: "提示",
        content: "确定要删除吗?",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let params = {
            ID: item.ID,
            IsDel: 0
          };
          adSalesProjectService
            .updateAdSalesProjectIsDelByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getDataList();
              } else {
                this.$message.error("删除失败");
              }
            });
        }
      });
    },
    btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });

      this.$router.push({ name: "adSalesProjectModify", params: item });
    }
  }
};
</script>