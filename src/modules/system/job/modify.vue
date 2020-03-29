<template>
  <ad-main :title="['首页','系统管理','岗位管理',`${params.ID === 0 ? '添加' : '编辑'}岗位`]" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="岗位名称" required>
          <a-input v-model="params.Name" placeholder="请输入岗位名称"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="所属部门">
          <div class="td-tree-list" v-if="dpetList.length!==0">
            <a-tree
              :treeData="dpetList"
              :defaultSelectedKeys="[this.params.DepartmentID]"
              :autoExpandParent="true"
              defaultExpandAll
              :replaceFields="{title:'Name'}"
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
        <a-button type="secondary" @click.native="$router.go(-1);">返回</a-button>
        <a-button type="primary" @click.native="btnSave()">保存</a-button>
      </div>
    </div>
  </ad-main>
</template>

<script>
import adSystemJobService from "../../../service/adSystemJobService";
import adSystemDepartmentService from "../../../service/adSystemDepartmentService";
export default {
  name: "AdSystemRoleModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        Name: "",
        DepartmentID: 0,
        IsValide: 1,
        IsDel: 1
      },
      dpetList: [],
      defaultKey: []
    };
  },
  mounted() {
    let params = this.$route.params;
    if (params.ID !== undefined) {
      this.params = params;
    }

    this.getAdSystemJobList();
  },
  methods: {
    /**
     * 获取菜单列表
     */
    getAdSystemJobList() {
      this.dpetList = [];
      this.defaultKey = [];

      let params = {
        IsDel: 1,
        IsValide: 1
      };

      adSystemDepartmentService
        .getAdSystemDepartmentList(params)
        .then(response => {
          if (response.length > 0) {
            this.dpetList = this.utils$.getTreeData(response, 0);
          }
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
      this.params.DepartmentID =
        selectedKeys[0] === undefined ? 0 : selectedKeys[0];
    },
    /**
     * 保存
     */
    btnSave() {
      if (!this.params.Name) {
        this.$message.info("请填写岗位名称");
        return;
      }

      if (this.params.DepartmentID === 0) {
        this.$message.info("请选择所在部门");
        return;
      }

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemJobService.addAdSystemJob(this.params);
      } else {
        result = adSystemJobService.updateAdSystemJobByID(this.params);
      }

      result.then(response => {
        if (response > 0 && response !== null) {
          this.$message.info("保存成功");
        } else {
          this.$message.error("保存失败");
        }
        this.$router.go(-1);
      });
    }
  }
};
</script>