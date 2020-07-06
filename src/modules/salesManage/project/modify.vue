<template>
  <ad-main :title="['首页','销控管理','项目管理','编辑项目']" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="项目名称" required>
          <a-input v-model="params.Name" placeholder="请输入项目名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="项目封面" required>
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
        <ad-example title="咨询电话" required>
          <a-input v-model="params.Tel" placeholder="请输入咨询电话"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="项目介绍">
          <ad-kedit name="edit0" v-model="params.Info" v-if="loading" ref="edit0"></ad-kedit>
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
export default {
  name: "AdSalesProjectModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Name: "",
        Pictrue: "",
        Tel: "",
        Info: "",
        IsDel: 1
      },
      loading: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      let params = this.$route.params;
      if (params.ID !== undefined) {
        this.params = params;
      }
      this.adSpin$.hide();
      this.loading = true;
      console.log(this.params);
    });
  },
  methods: {
    beforeCallbackHandller(event) {
      console.log(event);
      return true;
    },
    uploadCallbackHandller(event) {
      let result = JSON.parse(event);
      this.params.Pictrue = result.fullUrl;
    },
    async btnSave() {
      if (!this.params.Name) {
        this.$message.info("请填写项目名称");
        return;
      }

      if (!this.params.Tel) {
        this.$message.info("请填写咨询电话");
        return;
      }

      let result = null;
      if (this.params.ID === 0) {
        result = await adSalesProjectService.addAdSalesProject(this.params);
      } else {
        result = await adSalesProjectService.updateAdSalesProjectByID(
          this.params
        );
      }

      console.log(result);

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