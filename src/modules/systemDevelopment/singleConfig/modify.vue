<template>
  <ad-main :title="['首页','系统开发配置','单页资料配置',`${params.ID===0?'添加':'编辑'}单页资料配置`]" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="单页资料名称" required>
          <a-input v-model="params.Title" placeholder="请输入单页资料名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="所在组" required>
          <ad-select name="GroupID" v-model="params.GroupID">
            <option :value="0">全部</option>
            <option v-for="(item,index) in groupList" :key="index" :value="item.ID">{{item.Name}}</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="primary" @click.native="btnSave()">保存</a-button>
      </div>
    </div>
  </ad-main>
</template>

<script>
import adSingleService from "../../../service/adSingleService";
import adSingleGroupService from "../../../service/adSingleGroupService";
export default {
  name: "AdSystemDevSingleConfigModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Title: "",
        SEOTitle: "",
        SEOKeyword: "",
        SEODescription: "",
        GroupID: 0,
        Cover: "",
        FilePath: "",
        Contents: "",
        IsDel: 1
      },
      groupList: []
    };
  },
  mounted() {
    let params = this.$route.params;

    if (params.ID !== undefined) {
      this.params = params;
    }

    console.log(this.params);

    this.getAdSingleGroupList();
  },
  methods: {
    /**
     *
     */
    async getAdSingleGroupList() {
      try {
        this.groupList = [];

        let params = {
          IsDel: 1,
          OrderBy: "Sort",
          IsDesc: false
        };

        let result = await adSingleGroupService.getAdSingleGroupList(params);

        this.groupList = [];

        if (result && result.length > 0) {
          this.groupList = result;
        }

        this.adSpin$.hide();
      } catch (error) {
        this.adSpin$.hide();
      }
    },
    /**
     *
     */
    btnSave() {
      if (!this.params.Title) {
        this.$message.info("请填写单页资料名称");
        return;
      }

      if (this.params.GroupID === 0) {
        this.$message.info("请选择所在组");
        return;
      }

      this.adSpin$.show({ tip: "正在保存..." });

      let result = null;

      if (this.params.ID === 0) {
        result = adSingleService.addAdSingle(this.params);
      } else {
        result = adSingleService.updateAdSingleByID(this.params);
      }

      result
        .then(response => {
          this.adSpin$.hide();
          
          if (response > 0 && response !== null) {
            this.$message.info("保存成功");
          } else {
            this.$message.info("保存失败");
          }

          this.$router.go(-1);
        })
        .catch(err => {
          this.adSpin$.hide();
        });
    }
  }
};
</script>
