import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "../views/Dashboard/SearchBar.vue";
import List from "../views/List/ListView.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Root",
    path: "/",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    name: "List",
    path: "/dashboard",
    component: Dashboard,
    meta: {
      title: "List",
    },
  },
  {
    name: "List",
    path: "/list",
    component: List,
    meta: {
      title: "List",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
