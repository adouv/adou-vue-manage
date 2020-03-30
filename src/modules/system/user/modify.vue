<template>
  <ad-main :title="['首页','系统管理','用户管理',`${params.ID===0?'添加':'编辑'}用户`]" back>
    <div class="row row-lg">
      <div class="col-sm-12 col-md-12">
        <ad-example title="用户名" des="(用户名不能包含汉字！)" required>
          <a-input v-model="params.UserName" placeholder="请输入用户名"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="用户头像">
          <ad-upload-avatar name="avatar" v-model="params.Avatar"></ad-upload-avatar>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="密码" required>
          <a-input type="password" v-model="params.UserPwd" placeholder="请输入密码"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="确认密码" required>
          <a-input type="password" v-model="params.UserPwdConfirm" placeholder="请输入确认密码"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="性别">
          <a-radio-group v-model="params.Gender" buttonStyle="solid" size="small">
            <a-radio-button :value="1">男</a-radio-button>
            <a-radio-button :value="2">女</a-radio-button>
          </a-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="邮箱">
          <a-input v-model="params.Email" placeholder="请输入邮箱"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="手机号">
          <a-input v-model="params.Mobile" placeholder="请输入手机号"></a-input>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="部门" required>
          <div class="ad-tree-list" v-if="deptList.length!==0">
            <a-tree
              :treeData="deptList"
              :replaceFields="{title:'Name'}"
              defaultExpandAll
              :defaultSelectedKeys="[params.DepartmentID]"
              @select="onSelectHandller"
            ></a-tree>
          </div>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="岗位" required>
          <ad-select name="JobID" v-model="params.JobID">
            <option :value="0">请选择岗位</option>
            <option v-for="(item,index) in jobList" :key="index" :value="item.ID">{{item.Name}}</option>
          </ad-select>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="是否超级管理员">
          <a-radio-group v-model="params.UserType" buttonStyle="solid" size="small">
            <a-radio-button :value="0">否</a-radio-button>
            <a-radio-button :value="1">是</a-radio-button>
          </a-radio-group>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12" v-if="params.UserType==0">
        <ad-example title="角色" des="不是超级管理时必选">
          <div class="td-tree-list" v-if="roleList.length!==0">
            <a-tree checkable :treeData="roleList" v-model="params.RoleList" />
          </div>
        </ad-example>
      </div>

      <div class="col-sm-12 col-md-12">
        <ad-example title="用户状态">
          <a-radio-group v-model="params.UserStatus" buttonStyle="solid" size="small">
            <a-radio-button :value="0">禁用</a-radio-button>
            <a-radio-button :value="1">启用</a-radio-button>
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
import adSystemUserService from "../../../service/adSystemUserService";
import adSystemRoleService from "../../../service/adSystemRoleService";
import adSystemDepartmentService from "../../../service/adSystemDepartmentService";
import adSystemJobService from "../../../service/adSystemJobService";
import validEnum from "../../../enum/valid.enum";
export default {
  name: "AdSystemUserModifyComponent",
  data() {
    return {
      params: {
        ID: 0,
        UserName: "",
        UserPwd: "",
        UserPwdConfirm: "",
        Gender: 1,
        Email: "",
        Mobile: "",
        Avatar: "",
        UserType: 0,
        UserStatus: 1,
        DepartmentID: 0,
        JobID: 0,
        RoleID: 0,
        RoleList: [],
        Sort: 100
      },
      roleList: [],
      deptList: [],
      jobList: []
    };
  },
  created() {
    let params = this.$route.params;

    if (params.ID !== undefined) {
      this.params = params;
      this.params.UserPwdConfirm = params.UserPwd;
    }

    this.getRoleAndDeptAndJobList();
  },
  methods: {
    async getRoleAndDeptAndJobList() {
      try {
        this.roleList = [];
        this.deptList = [];
        this.jobList = [];

        let params = {
          IsValide: 1,
          IsDel: 1,
          OrderBy: "ModifyTime",
          IsDesc: true
        };

        let rolePro = adSystemRoleService.GetSystemRoleList(params);
        let deptPro = adSystemDepartmentService.getAdSystemDepartmentList(
          params
        );
        let jobPro = adSystemJobService.getAdSystemJobList(params);

        let result = await Promise.all([rolePro, deptPro, jobPro]);

        if (result[0].length > 0) {
          result[0].forEach(element => {
            this.roleList.push({
              key: element.ID,
              title: element.Name,
              children: []
            });
          });
        }

        if (result[1].length > 0) {
          this.deptList = this.utils$.getTreeData(result[1], 0);
        }

        if (result[2].length > 0) {
          this.jobList = result[2];
        }

        this.adSpin$.hide();
      } catch (error) {
        this.adSpin$.hide();
      }
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
      if (this.params.UserType === 1) {
        this.params.RoleList = [];
      }

      if (!this.params.UserName) {
        this.$message.info("请填写用户名");
        return;
      }

      if (validEnum.CHINESE_EXP.test(this.params.UserName)) {
        this.$message.info("用户名不能包含中文");
        return;
      }

      if (this.params.ID === 0) {
        if (!this.params.UserPwd) {
          this.$message.info("请填写密码");
          return;
        }

        if (!this.params.UserPwdConfirm) {
          this.$message.info("请填写确认密码");
          return;
        }

        if (this.params.UserPwd !== this.params.UserPwdConfirm) {
          this.$message.info("两次输入密码不一致");
          return;
        }
      } else {
        if (this.params.UserPwd && this.params.UserPwdConfirm) {
          if (this.params.UserPwd !== this.params.UserPwdConfirm) {
            this.$message.info("两次输入密码不一致");
            return;
          }
        }
      }

      if (this.params.DepartmentID === 0) {
        this.$message.info("请选择部门");
        return;
      }

      if (this.params.JobID === 0) {
        this.$message.info("请选择岗位");
        return;
      }

      if (this.params.UserType == 0) {
        if (this.params.RoleList.length === 0) {
          this.$message.info("至少选择一个角色");
          return;
        }
      } else {
        this.params.RoleID = 0;
        this.params.RoleList = [];
      }

      this.params.UserType = this.params.UserType;
      this.params.UserStatus = this.params.UserStatus;

      let result = null;

      if (this.params.ID === 0) {
        result = adSystemUserService.AddSystemUser(this.params);
      } else {
        result = adSystemUserService.UpdateSystemUserByID(this.params);
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