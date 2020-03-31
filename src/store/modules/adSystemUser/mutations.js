import Enum from "./mutation-enum"

export default {
    /**
     * 设置用户信息，对应setAdSystemUser
     */
    [Enum.SET_AD_SYSTEM_USER]: (state, args) => {
        state.adSystemUser = args;
    },
    /**
     * 设置权限信息，对应setAdSystemUserPerms
     */
    [Enum.SET_AD_SYSTEM_USER_PERMS]: (state, args) => {
        state.adSystemUserPerms = args;
    },
    /**
     * 设置部门信息，对应setAdSystemUserDept
     */
    [Enum.SET_AD_SYSTEM_USER_DEPT]: (state, args) => {
        state.adSystemUserDept = args;
    },
    /**
     * 设置岗位信息，对应setAdSystemUserJob
     */
    [Enum.SET_AD_SYSTEM_USER_JOB]: (state, args) => {
        state.adSystemUserJob = args;
    }
}