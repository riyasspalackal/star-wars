<template>
  <div style="width: 100%">
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col>
        <v-card class="overflow-hidden">
          <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll>
            <v-spacer></v-spacer>
            <v-app-bar-title>{{
              itemDetails.name ? itemDetails.name : itemDetails.title
            }}</v-app-bar-title>

            <v-spacer></v-spacer>
          </v-app-bar>
          <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            max-height="600"
          >
            <v-container style="height: 1000px"></v-container>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          href: "/dashboard",
        },
        {
          text: "List",
          disabled: false,
          href: "/list/" + this.$route.params.entity,
        },
        {
          text: "List",
          disabled: true,
        },
      ],
    };
  },

  computed: {
    itemDetails() {
      return this.$store.getters.getSelectedItem;
    },
  },

  watch: {},

  mounted() {},

  methods: {},
};
</script>
