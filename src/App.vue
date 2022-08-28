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
      <loader-overlay />
    </v-main>
  </v-app>
</template>

<script>
import SideBarNavigation from "./layout/TheNavigationDrawer";
import LoaderOverlay from "@/components/LoaderOverlay";

export default {
  name: "App",

  components: {
    SideBarNavigation,
    LoaderOverlay,
  },

  data: () => ({
    //
  }),
};
</script>
