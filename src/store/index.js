import Vue from "vue";
import Vuex from "vuex";
import notifier from "./modules/notifier";
import search from "./modules/search";
import entity from "./modules/entity";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    notifier,
    search,
    entity,
  },
});
