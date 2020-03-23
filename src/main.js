// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Antd, { message, Modal } from 'ant-design-vue'
import App from './App'
import router from './router'

import localStorageService from './ddd/localStorage.service'
import httpService from './ddd/http.service'
import elementService from "./ddd/element.service"
import encryptService from './ddd/encrypt.service'
import utilService from './ddd/util.service'

import { AdComponentInstall } from "./components/index";

import { AdFilterInstall } from "./filter/index";

import $ from 'jquery'
import '@node/font-awesome/scss/font-awesome.scss'
import '@/assets/lib/Ionicons/scss/ionicons.scss'
import '@/assets/lib/webicons/scss/web-icons.scss'
import '@/assets/lib/themify-icons/themify-icons.css'
import 'ant-design-vue/dist/antd.css'
import "@/assets/scss/index.scss"

import '@node/bootstrap/dist/js/bootstrap.bundle.min.js'

Vue.config.productionTip = false

Vue.use(Antd)

AdComponentInstall(Vue);

AdFilterInstall(Vue);

Vue.message = Vue.prototype.$message = message
Vue.confirm = Vue.prototype.$confirm = Modal.confirm
Vue.info = Vue.prototype.$info = Modal.info
Vue.success = Vue.prototype.$success = Modal.success
Vue.error = Vue.prototype.$error = Modal.error
Vue.warning = Vue.prototype.$warning = Modal.warning

Vue.local = Vue.prototype.local$ = localStorageService
Vue.http = Vue.prototype.http$ = httpService
Vue.elem = Vue.prototype.elem$ = elementService
Vue.encr = Vue.prototype.encr$ = encryptService
Vue.utils = Vue.prototype.utils$ = utilService

/* eslint-disable no-new */
new Vue({
    el: '#app',
    $,
    router,
    components: { App },
    template: '<App/>'
})