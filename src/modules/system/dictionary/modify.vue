<template>
  <ad-main
    :title="`${type==0?'系统字典分类管理':'系统字典管理'} / ${params.ID===0?'添加':'修改'}${type==0?'系统字典分类':'系统字典'}`"
    back
    class="ad-system-dictionary-modify"
  >
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12" v-if="type==1">
        <ad-example title="所在目录">
          <select class="form-control medium" name="ParentID" v-model="params.ParentID">
            <option value="0">全部</option>
            <option
              v-for="(item,index) in dictionaryList"
              :key="index"
              :value="item.ID"
            >{{item.Label}}</option>
          </select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="type==1">
        <ad-example title="编码" des="(可为空)">
          <el-input size="mini" v-model="params.Coding" placeholder="请输入编码"></el-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example :title="`${type==0?'字典分类名称':'字典名称'}`" required>
          <el-input
            size="mini"
            v-model="params.Label"
            :placeholder="`请输入${type==0?'字典分类名称':'字典名称'}`"
          ></el-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="type==1">
        <ad-example title="字典值" required>
          <el-input size="mini" v-model="params.Value" placeholder="请输入字典值"></el-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="排序" required>
          <el-input-number size="mini" v-model="params.Sort"></el-input-number>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="是否有效">
          <el-radio-group size="mini" v-model="params.IsValide">
            <el-radio-button label="0">否</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
          </el-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <el-button size="mini" @click.native="$router.go(-1);">返回</el-button>
        <el-button size="mini" type="primary" @click.native="btnSave();">保存</el-button>
      </div>
    </div>
  </ad-main>
</template>

<script>
import adSystemDictionaryService from "../../../service/adSystemDictionaryService";
export default {
  name: "AdSystemDictionaryModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Coding: "",
        Value: "",
        Label: "",
        ParentID: 0,
        Sort: 100,
        IsValide: 1
      },
      type: 1,
      dictionaryList: []
    };
  },
  mounted() {
    let params = this.$route.params;
    this.type = params.type;

    if (params.ID !== undefined) {
      this.params = params;
    }

    this.getSystemDictionaryList();
  },
  methods: {
    getSystemDictionaryList() {
      this.dictionaryList = [];

      let params = {
        ID: 0,
        Coding: "",
        Value: "",
        Label: "",
        ParentID: 0,
        IsValide: 1,
        OrderBy: "Sort",
        IsDesc: false
      };

      adSystemDictionaryService
        .getSystemDictionaryList(params)
        .then(response => {
          if (response && response.length > 0) {
            this.dictionaryList = response;
          }
        });
    },
    btnSave() {
      if (this.type == 1) {
        if (this.params.ParentID === 0) {
          this.$tip("请选择所在目录");
          return;
        }

        if (!this.params.Label) {
          this.$tip("请输入字典名称");
          return;
        }

        if (!this.params.Value) {
          this.$tip("请输入字典值");
          return;
        }
      } else {
        if (!this.params.Label) {
          this.$tip("请输入字典名称");
          return;
        }
      }

      if (!this.params.Sort) {
        this.$tip("请输入排序值");
        return;
      }

      if (isNaN(this.params.Sort)) {
        this.$tip("排序值必须是数字");
        return;
      }

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemDictionaryService.addSystemDictionary(this.params);
      } else {
        result = adSystemDictionaryService.updateSystemDictionaryByID(
          this.params
        );
      }

      result.then(response => {
        if (response > 0 && response !== null) {
          this.$tip("保存成功");
        } else {
          this.$tip("保存失败");
        }
        this.$router.go(-1);
      });
    }
  }
};
</script>