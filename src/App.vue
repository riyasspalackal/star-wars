<template>
  <v-app>
    <side-bar-navigation />

    <v-main>
      <v-container fill-height>
        <v-layout>
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBarNavigation from "./layout/TheNavigationDrawer";
export default {
  name: "App",

  components: {
    SideBarNavigation,
  },

  data: () => ({
    //
  }),
};
</script>
