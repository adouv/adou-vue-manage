<template>
  <ad-main :title="['首页','系统开发配置','单页资料配置']">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">单页资料名称</h4>
          <a-input placeholder="单页资料名称" v-model="params.Title"></a-input>
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">所在分组</h4>
          <ad-select name="GroupID" v-model="params.GroupID">
            <option value="0">全部</option>
            <option v-for="(item,index) in groupList" :key="index" :value="item.ID">{{item.Name}}</option>
          </ad-select>
        </div>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSinglePageList()">搜索</a-button>
        <a-button
          type="primary"
          @click.native="$router.push({name:'adSysDevSingleConfigModify'})"
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
      @pageChange="getAdSinglePageList"
    >
      <template slot="Operating" slot-scope="rows">
        <a-button type="danger" size="small" @click.native="btnDeleteHandller(rows.data);">删除</a-button>
        <a-button type="primary" size="small" @click.native="btnModifyHandller(rows.data);">编辑</a-button>
      </template>
    </ad-table>
  </ad-main>
</template>

<script>
import adSingleService from "../../../service/adSingleService";
import adSingleGroupService from "../../../service/adSingleGroupService";
export default {
  name: "AdSystemDevSingleConfigComponent",
  data() {
    return {
      params: {
        Title: "",
        GroupID: 0,
        IsDel: 1,
        OrderBy: "ModifyTime",
        IsDesc: true,
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
          title: "标题",
          dataIndex: "Title",
          key: "Title"
        },
        {
          title: "所在组",
          dataIndex: "GroupName",
          key: "GroupName"
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
      groupList: [],
      list: [],
      listTotal: 0,
      loading: true
    };
  },
  mounted() {
    this.getAdSinleData();
  },
  methods: {
    /**
     * 获取单页资料数据
     */
    async getAdSinleData() {
      try {
        this.loading = true;
        this.groupList = [];
        this.list = [];
        let promiseList = [];

        let params = {
          IsDel: 1,
          OrderBy: "Sort",
          IsDesc: false
        };

        promiseList.push(adSingleGroupService.getAdSingleGroupList(params));
        promiseList.push(adSingleService.getAdSinglePageList(this.params));

        let result = await Promise.all(promiseList);

        this.groupList = [];
        this.list = [];

        this.groupList = result[0].length === 0 ? [] : result[0];

        this.listTotal = result[1].TotalItems;
        this.params.PageIndex = result[1].CurrentPage;
        if (result[1].Items.length > 0) {
          this.list = result[1].Items;
        }

        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * 获取单页资料列表
     */
    getAdSinglePageList(pageIndex = 1) {
      this.loading = true;
      this.list = [];

      this.params.PageIndex = pageIndex;

      adSingleService
        .getAdSinglePageList(this.params)
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
     * 删除
     */
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
          adSingleService.updateAdSingleIsDelByID(params).then(response => {
            if (response > 0) {
              this.$message.info("删除成功");
              this.getAdSinleData();
            } else {
              this.$message.info("删除失败");
            }
          });
        }
      });
    },
    /**
     * 编辑
     */
    btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });
      this.$router.push({ name: "adSysDevSingleConfigModify", params: item });
    }
  }
};
</script>
