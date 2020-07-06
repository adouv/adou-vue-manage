<template>
  <ad-main :title="['首页','销控管理','楼房管理','编辑楼房']" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="所属项目" required>
          <ad-select name="ProjectID" v-model="params.ProjectID">
            <option :value="0">请选择项目</option>
            <option v-for="(item,index) in list" :key="index" :value="item.ID">{{item.Name}}</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="房屋图片" required>
          <ad-ke-upload-btn
            label="上传图片"
            :beforeCallback="beforeCallbackHandller"
            :uploadCallback="uploadCallbackHandller"
          ></ad-ke-upload-btn>
          <div style="width:100%;margin-top:10px" v-if="params.Pictrue!=''">
            <img :src="params.Pictrue" style="max-width:150px" />
          </div>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="所在栋" required>
          <a-input v-model="params.Floor" addon-after="栋" placeholder="请输入所在栋"></a-input>
        </ad-example>
      </div>

      <!-- <div class="col-sm-12 col-md-12">
        <ad-example title="所在楼层" required>
          <a-input v-model="params.Layer" addon-after="层" placeholder="请输入所在楼层"></a-input>
        </ad-example>
      </div> -->

      <div class="col-sm-12 col-md-12">
        <ad-example title="所在单元" required>
          <a-input v-model="params.Unit" addon-after="单元" placeholder="请输入所在单元"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="房间号" required>
          <a-input v-model="params.RoomNum" addon-after="房" placeholder="请输入房间号"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="房屋类型" des="店铺、住宅..." required>
          <a-input v-model="params.RoomType" placeholder="请输入房间号"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="单价">
          <a-input v-model="params.UnitPrice" placeholder="请输入单价"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="优惠价格">
          <a-input v-model="params.DiscountedPrice" placeholder="请输入优惠价格"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="户型">
          <a-input v-model="params.UnitType" placeholder="请输入户型"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="装修情况">
          <a-input v-model="params.Decoration" placeholder="请输入装修情况"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="朝向">
          <a-input v-model="params.Driection" placeholder="请输入朝向"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="建筑面积">
          <a-input v-model="params.Area" placeholder="请输入建筑面积"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="primary" @click.native="btnSave()">保存</a-button>
      </div>
    </div>
  </ad-main>
</template>

<script>
import adSalesProjectService from "../../../service/adSalesProjectService";
import adSaleRoomService from "../../../service/adSaleRoomService";
export default {
  name: "AdSalesBuildingModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        ProjectID: 0,
        ProjectName: "",
        Pictrue: "",
        Floor: "",
        Layer: "",
        Unit: "",
        RoomNum: "",
        RoomType: "",
        UnitPrice: "",
        DiscountedPrice: "",
        UnitType: "",
        Decoration: "",
        Driection: "",
        Area: "",
        Status: 0,
        IsDel: 1
      },
      list: []
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.list = [];

      adSalesProjectService
        .getAdSalesProjectList({
          IsDel: 1
        })
        .then(response => {
          if (response && response.length > 0) {
            this.list = response;
          }
        });
    },
    async btnSave() {
      if (this.params.ProjectID === 0) {
        this.$message.info("请选择所属项目");
        return;
      }

      if (!this.params.Floor) {
        this.$message.info("请填写所在栋");
        return;
      }

      if (!this.params.Layer) {
        this.$message.info("请填写所在楼层");
        return;
      }

      if (!this.params.Unit) {
        this.$message.info("请填写所在单元");
        return;
      }

      if (!this.params.RoomNum) {
        this.$message.info("请填写房间号");
        return;
      }

      if (!this.params.RoomType) {
        this.$message.info("请填写房屋类型");
        return;
      }

      let result = null;

      if (this.params.ID === 0) {
        result = await adSaleRoomService.addAdSaleRoomHandler(this.params);
      } else {
        result = await adSaleRoomService.updateAdSaleRoomByIDHandler(
          this.params
        );
      }

      if (result > 0 && result !== null) {
        this.$message.info("保存成功");
      } else {
        this.$message.error("保存失败");
      }
      this.$router.go(-1);
    }
  }
};
</script>