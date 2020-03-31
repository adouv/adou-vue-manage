import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const adSystemUserModule = {
    state: {
        adSystemUser: {},
        adSystemUserPerms: [],
        adSystemUserDept: {},
        adSystemUserJob: {}
    },
    getters: getters,
    mutations: mutations,
    actions: actions
};

export default adSystemUserModule;