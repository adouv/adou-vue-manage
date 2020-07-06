<template>
  <ad-main :title="['首页','销控管理','楼房管理']">
    <div class="row row-lg">
      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">所属项目</h4>
          <ad-select name="ProjectID" v-model="params.ProjectID">
            <option :value="0">请选择项目</option>
            <option v-for="(item,index) in projectList" :key="index" :value="item.ID">{{item.Name}}</option>
          </ad-select>
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">所属栋</h4>
          <a-input placeholder="栋" v-model="params.Floor"></a-input>
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">所属单元</h4>
          <a-input placeholder="单元" v-model="params.Unit"></a-input>
        </div>
      </div>

      <div class="col-sm-6 col-md-4">
        <div class="example-wrap">
          <h4 class="example-title">所属房间</h4>
          <a-input placeholder="房间号" v-model="params.RoomNum"></a-input>
        </div>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="inverse" @click.native="getDataList()">搜索</a-button>
        <a-button type="primary" @click.native="$router.push({name:'adSalesBuildingModify'})">添加</a-button>
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
      <template
        slot="RoomText"
        slot-scope="rows"
      >{{rows.data.Floor}}栋{{rows.data.Unit}}单元{{rows.data.RoomNum}}</template>

      <template slot="UnitPrice" slot-scope="rows">
        {{rows.data.UnitPrice?'￥'+rows.data.UnitPrice:'￥0.00'}}/m
        <sup>2</sup>
      </template>

      <template slot="DiscountedPrice" slot-scope="rows">
        {{rows.data.DiscountedPrice?'￥'+rows.data.DiscountedPrice:'￥0.00'}}/m
        <sup>2</sup>
      </template>

      <template slot="UnitType" slot-scope="rows">{{rows.data.UnitType?rows.data.UnitType:'-'}}</template>

      <template slot="Area" slot-scope="rows">
        {{rows.data.Area?rows.data.Area:'0'}}/m
        <sup>2</sup>
      </template>

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
import adSaleRoomService from "../../../service/adSaleRoomService";
export default {
  name: "AdSalesBuildingComponent",
  data() {
    return {
      params: {
        ProjectID: 0,
        Floor: "",
        Layer: "",
        Unit: "",
        RoomNum: "",
        Status: -1,
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
          title: "房间",
          dataIndex: "RoomText",
          key: "RoomText"
        },
        {
          title: "房屋类型",
          dataIndex: "RoomType",
          key: "RoomType"
        },
        {
          title: "单价",
          dataIndex: "UnitPrice",
          key: "UnitPrice"
        },
        {
          title: "优惠价格",
          dataIndex: "DiscountedPrice",
          key: "DiscountedPrice"
        },
        {
          title: "户型",
          dataIndex: "UnitType",
          key: "UnitType"
        },
        {
          title: "建筑面积",
          dataIndex: "Area",
          key: "Area"
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
      loading: true,
      projectList: []
    };
  },
  mounted() {
    this.getProjectList();
    this.getDataList();
  },
  methods: {
    getDataList(pageIndex = 1) {
      this.loading = true;
      this.list = [];
      this.params.PageIndex = pageIndex;

      adSaleRoomService
        .getAdSaleRoomPageListHandler(this.params)
        .then(result => {
          this.listTotal = result.TotalItems;
          this.params.PageIndex = result.CurrentPage;
          if (result.Items.length > 0) {
            result.Items.forEach(element => {
              element.IsValideCheck = element.IsValide === 1;
              this.list.push(element);
            });
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    getProjectList() {
      this.projectList = [];

      adSalesProjectService
        .getAdSalesProjectList({
          IsDel: 1
        })
        .then(response => {
          if (response && response.length > 0) {
            this.projectList = response;
          }
        });
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
          adSaleRoomService
            .updateAdSaleRoomIsDelByIDHandler(params)
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

      this.$router.push({ name: "adSalesBuildingModify", params: item });
    }
  }
};
</script>