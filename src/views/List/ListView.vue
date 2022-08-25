<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      apis: [],
      data: [],
      isLoading: false,
    };
  },

  mounted() {
    this.getApis();
  },

  methods: {
    getApis() {
      this.isLoading = true;
      this.$http
        .get(`http://swapi.dev/api/`)
        .then((response) => {
          this.apis = response.data;
        })
        .catch((error) => {
          this.errorChecker(error);
        });
    },
  },
};
</script>
