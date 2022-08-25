import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "../views/Dashboard/SearchBar.vue";
import List from "../views/List/ListView.vue";
import DetailsView from "../views/List/DetailsView.vue";

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
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    meta: {
      title: "List",
    },
  },
  {
    name: "List",
    path: "/list/:entity",
    component: List,
    meta: {
      title: "List",
    },
  },
  {
    name: "View",
    path: "/view/:entity",
    component: DetailsView,
    meta: {
      title: "Details view",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
