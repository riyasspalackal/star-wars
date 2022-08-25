import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import common from "./mixins/common";
import "./utils/filter";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.mixin(common);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
