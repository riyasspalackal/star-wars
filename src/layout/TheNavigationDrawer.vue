<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    :mini-variant.sync="mini"
    width="230"
    color="menu_bg"
  >
    <v-list>
      <v-list-item-group v-model="item" mandatory color="primary">
        <v-list-item value="dashboard" link color="primary" to="/dashboard">
          <v-list-item-icon>
            <v-icon color="menu_icon">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item value="dashboard" link color="primary" to="/list">
          <v-list-item-icon>
            <v-icon color="menu_icon">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list-item link color="primary" @click.stop="mini = !mini" dense>
        <v-list-item-icon>
          <v-icon color="menu_icon">{{
            mini ? "mdi-chevron-double-right" : "mdi-chevron-double-left"
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Collapse Sidebar</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    item: 0,
    mini: false,
  }),

  created() {
    this.item = this.$route.meta.item;
  },
  watch: {
    $route() {
      this.item = this.$route.meta.item;
    },
  },
  methods: {},
};
</script>
<style scoped>
.btn_chevron {
  margin-top: 50%;
  z-index: 10000;
}
</style>
