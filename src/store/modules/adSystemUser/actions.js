import Vue from "vue";
import Enum from "./mutation-enum"
import adSystemUserService from "../../../service/adSystemUserService"

export default {
    /**
     * 用户登录
     * @param {*} param0 
     * @param {*} args 
     */
    adSysLogin({ commit }, args) {
        return new Promise((resolve, reject) => {
            adSystemUserService.SystemUserLogin(args).then(response => {
                if (response) {
                    if (response.UserStatus === 0) {
                        reject({ msg: "用户已禁用,请联系管理员" });
                    } else {
                        resolve(response);
                    }
                } else {
                    reject({ msg: "登录失败,账号或密码错误" });
                }
            });
        });
    },
    /**
     * 设置用户信息
     * @param {*} param0 
     * @param {*} args 
     */
    setAdSystemUser({ commit }, args) {
        commit(Enum.SET_AD_SYSTEM_USER, args);
    },
    /**
     * 设置用户角色信息
     * @param {*} param0 
     * @param {*} args 
     */
    setAdSystemUserPerms({ commit }, args) {
        if (args.length === 0) {
            commit(Enum.SET_AD_SYSTEM_USER_PERMS, 'ROLE_SYSTEM_DEFAULT');
        } else {
            commit(Enum.SET_AD_SYSTEM_USER_PERMS, args);
        }
    },
    /**
     * 设置用户部门信息
     * @param {*} param0 
     * @param {*} args 
     */
    setAdSystemUserDept({ commit }, args) {
        if (!args) {
            commit(Enum.SET_AD_SYSTEM_USER_DEPT, 'DEPT_SYSTEM_DEFAULT');
        } else {
            commit(Enum.SET_AD_SYSTEM_USER_DEPT, args);
        }
    },
    /**
     * 设置用户岗位信息
     * @param {*} param0 
     * @param {*} args 
     */
    setAdSystemUserJob({ commit }, args) {
        if (!args) {
            commit(Enum.SET_AD_SYSTEM_USER_JOB, 'JOB_SYSTEM_DEFAULT');
        } else {
            commit(Enum.SET_AD_SYSTEM_USER_JOB, args);
        }
    }
}