<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-autocomplete
          outlined
          label="Please search character name"
          :items="searchResult"
          item-text="name"
          item-value="name"
          :loading="isLoading"
          v-model="people"
          :search-input.sync="search"
          return-object
        >
          <template v-slot:item="{ item }">
            <span>{{ item.name }}</span>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  data() {
    return {
      apis: [],
      searchResult: [],
      isLoading: false,
      people: "",
      name: null,
      search: null,
    };
  },

  watch: {
    search: debounce(function (val) {
      this.searchHelper(val);
    }, 200),
  },

  mounted() {
    // this.getApis();
  },

  methods: {
    searchHelper(val) {
      this.isLoading = true;
      this.$http
        .get(`http://swapi.dev/api/`)
        .then((response) => {
          let apis = response.data;
          this.callEntitiesApi(apis, val);
        })
        .catch((error) => {
          this.errorChecker(error);
        });
    },

    async callEntitiesApi(apis, val) {
      let result;
      this.searchResult = [];
      for (let key in apis) {
        result = await this.searchWithKey(key, val);

        if (result && result.length) {
          this.searchResult.push({ header: key });
          this.searchResult.push({ divider: true });
          result.forEach((res) => {
            this.searchResult.push(res);
          });
        }
      }
    },

    searchWithKey(key, val) {
      return new Promise((resolve) => {
        this.$http
          .get(`http://swapi.dev/api/${key}?search=${val}`)
          .then((response) => {
            resolve(response.data.results);
          })
          .catch((error) => {
            this.errorChecker(error);
          });
      });
    },
  },
};
</script>



