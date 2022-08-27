<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div style="position: relative">
          <v-text-field
            label="Please search character name"
            outlined
            background-color="#fff"
            v-model="searchKey"
            @keyup="search"
          >
          </v-text-field>
          <ul class="dropdown-menu slide-enter-active" v-if="searchList.length">
            <div v-for="(result, index) in searchList" :key="index">
              <li v-if="result.header" class="header">
                <span>{{ result.name }} </span>
              </li>
              <li
                v-if="result.divider"
                class="divider pa-0"
                @click="viewAllList(result.name)"
              >
                <v-btn text color="teal accent-4" @click="reveal = true">
                  View all
                </v-btn>
              </li>
              <li v-if="!result.divider && !result.header" class="content">
                <div v-html="highlight(result)"></div>
                <!-- <span>
                  {{
                    result.name ? result.name : result.title | highlight("f")
                  }}
                </span> -->
              </li>
            </div>
          </ul>
        </div>
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
      searchKey: "",
      name: null,
    };
  },

  mounted() {},

  computed: {
    searchList() {
      return this.$store.getters.getSearchList;
    },
  },

  methods: {
    search: debounce(function () {
      if (this.searchKey) {
        this.searchHelper();
      } else {
        this.$store.dispatch("clearData");
      }
    }, 200),

    searchHelper() {
      this.isLoading = true;
      this.$http
        .get(`http://swapi.dev/api/`)
        .then((response) => {
          let apis = response.data;
          this.callEntitiesApi(apis);
        })
        .catch((error) => {
          this.errorChecker(error);
        });
    },

    async callEntitiesApi(apis) {
      await this.$store.dispatch("clearData").then(() => {
        for (let key in apis) {
          console.log(key);
          this.$store.dispatch("loadSearchData", {
            entity: key,
            searchKey: this.searchKey,
          });
        }
      });
    },

    viewAllList(entity) {
      this.$router.push({
        name: "List",
        params: { entity: entity },
      });
    },

    highlight(result) {
      return result.name
        ? result.name.replaceAll(
            this.searchKey,
            "<span class='highlight'>" + this.searchKey + "</span>"
          )
        : result.title.replaceAll(
            this.searchKey,
            "<span class='highlight'>" + this.searchKey + "</span>"
          );
    },
  },
};
</script>
<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.38);
  border-right: 1px solid rgba(0, 0, 0, 0.38);
  border-left: 1px solid rgba(0, 0, 0, 0.38);
  background: #6ed8c9;
  font-size: 20px;
  text-align: left;
  padding-left: 11px;
  text-transform: capitalize;
}
.divider {
  font-size: 20px;
  text-align: right;
  padding: 11px;
}
.content {
  text-align: left;
  padding-left: 20px;
  font-size: 18px;
  text-transform: capitalize;
}
.dropdown-menu {
  padding: 0 !important;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.38);
  position: absolute;
  top: 55px;
}
.slide-enter-active {
  animation: fadeIn 1s;
}
.slide-leave-active {
  animation: fadeIn reverse 1s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.highlight {
  font-weight: bold;
  background-color: #fff176;
}
</style>



