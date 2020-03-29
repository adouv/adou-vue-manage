<template>
  <ad-main :title="['首页','系统管理','岗位管理']">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <ad-example title="名称">
          <a-input placeholder="名称" v-model="params.Name"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-6 col-md-4">
        <ad-example title="是否有效">
          <ad-select name="IsValide" v-model="params.IsValide">
            <option :value="-1">全部</option>
            <option :value="0">否</option>
            <option :value="1">是</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getAdSystemJobPageList()">搜索</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSysJobModify'})">添加</a-button>
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
      @pageChange="getAdSystemJobPageList"
    >
      <template slot="DepartmentName" slot-scope="rows">{{rows.data.DepartmentInfo.Name}}</template>
      <template slot="IsValide" slot-scope="rows">
        <a-switch
          v-model="rows.data.IsValideCheck"
          checkedChildren="启用"
          unCheckedChildren="禁用"
          @change="userStatusCheckChangeHandller(rows.data);"
        />
      </template>
      <template slot="Operating" slot-scope="rows">
        <a-button type="danger" size="small" @click.native="btnDeleteHandller(rows.data);">删除</a-button>
        <a-button type="primary" size="small" @click.native="btnModifyHandller(rows.data);">编辑</a-button>
      </template>
      <template slot="mobile" slot-scope="item">
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
      </template>
    </ad-table>
  </ad-main>
</template>

<script>
import adSystemJobService from "../../../service/adSystemJobService";
export default {
  name: "AdSystemJobComponent",
  data() {
    return {
      params: {
        Name: "",
        DepartmentID: 0,
        IsValide: -1,
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
          title: "岗位",
          dataIndex: "Name",
          key: "Name"
        },
        {
          title: "所属部门",
          dataIndex: "DepartmentName",
          key: "DepartmentName"
        },
        {
          title: "是否有效",
          dataIndex: "IsValide",
          key: "IsValide"
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
    this.getAdSystemJobPageList();
  },
  methods: {
    /**
     * 获取列表
     */
    getAdSystemJobPageList(pageIndex = 1) {
      this.loading = true;
      this.list = [];
      this.params.PageIndex = pageIndex;
      adSystemJobService
        .getAdSystemJobPageList(this.params)
        .then(response => {
          this.listTotal = response.TotalItems;
          this.params.PageIndex = response.CurrentPage;
          if (response.Items.length > 0) {
            response.Items.forEach(element => {
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
     * 是否有效状态更新
     */
    userStatusCheckChangeHandller(item) {
      let params = {
        ID: item.ID,
        IsValide: item.IsValideCheck ? 1 : 0
      };

      adSystemJobService
        .updateAdSystemJobIsValideByID(params)
        .then(response => {
          if (response > 0) {
            if (params.IsValide === 1) {
              this.$message.info("已设置为有效");
            } else {
              this.$message.info("已设置为无效");
            }
          } else {
            this.$message.error("设置失败");
          }
        });
    },
    /**
     * 删除事件
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
          adSystemJobService
            .updateAdSystemJobIsDelByID(params)
            .then(response => {
              if (response > 0) {
                this.$message.info("删除成功");
                this.getAdSystemJobPageList();
              } else {
                this.$message.error("删除失败");
              }
            });
        }
      });
    },
    /**
     * 编辑事件
     */
    btnModifyHandller(item) {
      this.adSpin$.show({ tip: "正在加载..." });

      this.$router.push({ name: "adSysJobModify", params: item });
    }
  }
};
</script>