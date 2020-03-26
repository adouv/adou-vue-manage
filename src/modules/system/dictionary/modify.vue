<template>
  <ad-main
    :title="['首页','系统管理','字典管理',`${params.ID===0?'添加':'编辑'}字典`]"
    back
    class="ad-system-dictionary-modify"
  >
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="菜单类型">
          <a-radio-group v-model="params.Type" buttonStyle="solid">
            <a-radio-button :value="0">目录</a-radio-button>
            <a-radio-button :value="1">菜单</a-radio-button>
          </a-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="所属分类">
          <ad-select name="ParentID" v-model="params.ParentID">
            <option :value="0">所属分类</option>
            <option
              v-for="(item,index) in dictionaryList"
              :key="index"
              :value="item.ID"
            >{{item.Label}}</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="编码">
          <a-input v-model="params.Coding" placeholder="请输入字典名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example :title="`字典${params.Type===0?'名称':'标签'}`">
          <a-input v-model="params.Label" :placeholder="`请输入字典${params.Type===0?'名称':'标签'}`"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.Type===1">
        <ad-example title="字典值">
          <a-input v-model="params.Value" placeholder="请输入字典值"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="排序">
          <a-input type="number" v-model="params.Sort" placeholder="请输入排序值"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="是否有效">
          <a-radio-group v-model="params.IsValide" buttonStyle="solid" size="small">
            <a-radio-button :value="0">否</a-radio-button>
            <a-radio-button :value="1">是</a-radio-button>
          </a-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <a-button type="primary" @click.native="btnSave()">保存</a-button>
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
        IsValide: 1,
        Type: 0
      },
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
    /**
     * 获取一级分类列表
     */
    getSystemDictionaryList() {
      this.dictionaryList = [];

      let params = {
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
          this.adSpin$.hide();
        })
        .catch(err => {
          this.adSpin$.hide();
        });
    },
    /**
     * 保存
     */
    btnSave() {
      if (this.params.Type === 0) {
        if (!this.params.Label) {
          this.$message.info("请输入字典名称");
          return;
        }
      } else {
        if (this.params.ParentID === 0) {
          this.$message.info("请选择所属分类");
          return;
        }

        if (!this.params.Label) {
          this.$message.info("请输入字典标签");
          return;
        }
        if (!this.params.Value) {
          this.$message.info("请输入字典值");
          return;
        }
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
          this.$message.info("保存成功");
        } else {
          this.$message.info("保存失败");
        }
        this.$router.go(-1);
      });
    }
  }
};
</script>