import Vue from 'vue'
import Vuex from "vuex"
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import createLogger from "vuex/dist/logger"
import adSystemUserModule from "./modules/adSystemUser/index";
import adSystemMenuModule from "./modules/adSystemMenu/index";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        adSystemUserM: adSystemUserModule,
        adSystemMenuM: adSystemMenuModule
    },
    state,
    getters,
    mutations,
    actions,
    plugins: debug ? [createLogger()] : []
})