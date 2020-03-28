<template>
  <ad-main :title="['首页','系统管理','部门管理',`${params.ID===0?'添加':'编辑'}部门`]" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="名称" required>
          <a-input v-model="params.Name" placeholder="请输入名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="上级部门" des="不选则为一级部门">
          <div class="ad-tree-list" v-if="deptList.length!==0">
            <a-tree
              :treeData="deptList"
              :replaceFields="{title:'Name'}"
              defaultExpandAll
              :defaultSelectedKeys="[params.ParentID]"
              @select="onSelectHandller"
            ></a-tree>
          </div>
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
import adSystemDepartmentService from "../../../service/adSystemDepartmentService";
export default {
  name: "AdSystemDepartmentModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Name: "",
        ParentID: 0,
        IsValide: 1,
        IsDel: 1
      },
      deptList: []
    };
  },
  mounted() {
    let params = this.$route.params;
    if (params.ID !== undefined) {
      this.params = params;
    }

    this.getAdSystemDepartmentList();
  },
  methods: {
    /**
     * 获取列表
     */
    getAdSystemDepartmentList() {
      this.deptList = [];
      adSystemDepartmentService
        .getAdSystemDepartmentList({
          IsDel: 1,
          OrderBy: "ModifyTime",
          IsDesc: false
        })
        .then(response => {
          this.deptList = this.utils$.getTreeData(response, 0);
          this.adSpin$.hide();
        })
        .catch(err => {
          this.adSpin$.hide();
        });
    },
    /**
     * 选择部门
     */
    onSelectHandller(selectedKeys, info) {
      this.params.ParentID =
        selectedKeys[0] === undefined ? 0 : selectedKeys[0];
    },
    /**
     * 保存
     */
    btnSave() {
      if (!this.params.Name) {
        this.$message.info("请填写名称");
        return;
      }

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemDepartmentService.addAdSystemDepartment(this.params);
      } else {
        result = adSystemDepartmentService.updateAdSystemDepartmentByID(
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