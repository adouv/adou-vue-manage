<template>
  <div class="ad-system-user-detail">
    <div class="header">
      <a-avatar :size="64" :src="params.Avatar" />
    </div>
    <ad-example title="用户编号：">
      <div>{{params.ID}}</div>
    </ad-example>

    <ad-example title="用户名：">
      <div>{{params.UserName}}</div>
    </ad-example>

    <ad-example title="用户类型：">
      <div>
        <a-tag color="geekblue" v-if="params.UserType===0">管理员</a-tag>
        <a-tag color="green" v-if="params.UserType===1">超级管理员</a-tag>
      </div>
    </ad-example>

    <ad-example title="用户状态：">
      <div>
        <a-tag color="geekblue" v-if="params.UserStatus===0">禁用</a-tag>
        <a-tag color="green" v-if="params.UserStatus===1">启用</a-tag>
      </div>
    </ad-example>

    <ad-example title="所拥有的角色：">
      <div>
        <span v-if="params.RoleList.length===0">未分配角色</span>
        <span v-for="(item,index) in params.RoleList" :key="index">{{item.Name}}、</span>
      </div>
    </ad-example>

    <ad-example title="创建时间：">
      <div>{{params.CreateTime}}</div>
    </ad-example>

    <ad-example title="创建用户：">
      <div>{{params.CreateUser}}</div>
    </ad-example>

    <ad-example title="更新时间：">
      <div>{{params.ModifyTime}}</div>
    </ad-example>

    <ad-example title="更新用户：">
      <div>{{params.ModifyUser}}</div>
    </ad-example>
  </div>
</template>

<script>
export default {
  name: "AdSystemUserDetailComponent",
  props: ["params"]
};
</script>

<style lang="scss">
.ad-system-user-detail {
  .header {
    padding-bottom: 20px;
  }
  .example-wrap {
    display: flex;
    margin-bottom: 20px;
    div {
      flex: 1;
    }
  }
}
</style>