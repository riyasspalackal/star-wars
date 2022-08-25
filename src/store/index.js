import Vue from "vue";
import Vuex from "vuex";
import notifier from "./modules/notifier";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    notifier,
  },
});
