<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-table
      :headers="headers"
      :items="list"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $route.params.entity }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Create new
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-if="$route.params.entity != 'films'"
                        v-model="editedOrDeletedItems.name"
                        label="Enter name"
                      ></v-text-field>
                      <v-text-field
                        v-else
                        v-model="editedOrDeletedItems.title"
                        label="Enter name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close()">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save()"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
            @mouseover="selectItem(item)"
            @mouseleave="unSelectItem()"
          >
            <td @click="viewDetails(item)">
              {{ item.name ? item.name : item.title }}
            </td>
            <td @click="viewDetails(item)">
              {{ getColumnValue(item) }}
            </td>
            <td>
              <div v-if="item === selectedItem">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
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
          disabled: true,
        },
      ],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "model",
          align: "start",
          sortable: false,
          value: "model",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      list: [],
      editedOrDeletedItems: { name: "" },
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      isEdit: false,
      selectedItem: false,
    };
  },

  watch: {
    page() {
      this.getData();
    },
  },

  computed: {
    formTitle() {
      return this.isEdit
        ? `Edit ${this.$route.params.entity} Name`
        : `Add ${this.$route.params.entity} Name`;
    },
  },

  mounted() {
    if (typeof this.$route.params.entity != "undefined") {
      this.getData();
    }
  },

  methods: {
    getData() {
      let params = {
        entity: this.$route.params.entity,
        page: this.page,
      };
      this.showLoader();
      this.$store.dispatch("loadEntity", params).then((res) => {
        this.hideLoader();
        this.list = res.results;
        if (res.count && res.count > 10)
          this.pageCount = res.count / this.itemsPerPage;
        this.pageCount = Math.round(this.pageCount);
        if (this.$route.params.entity == "films") {
          this.headers[0].value = "title";
          this.headers[1].text = "Director";
        }
        if (this.$route.params.entity == "people") {
          this.headers[1].text = "Birth Year";
        }
        if (this.$route.params.entity == "species") {
          this.headers[1].text = "Language";
        }
        if (this.$route.params.entity == "planets") {
          this.headers[1].text = "population";
        }
      });
    },

    viewDetails(item) {
      this.$store.commit("setSelectedItem", item);
      this.$router.push({
        name: "View",
        params: { entity: this.$route.params.entity },
      });
    },

    editItem(item) {
      this.editedOrDeletedItems = item;
      this.dialog = true;
      this.isEdit = true;
    },

    unSelectItem() {
      this.selectedItem = false;
    },

    selectItem(item) {
      this.selectedItem = item;
    },

    save() {
      if (!this.isEdit) {
        this.$store.commit("create", this.editedOrDeletedItems);
        this.list = this.$store.getters.getEntityList;
        this.$forceUpdate();
      }
      this.close();
    },

    close() {
      this.editedOrDeletedItems = {};
      this.dialog = false;
      this.isEdit = false;
    },

    deleteItem(item) {
      this.editedOrDeletedItems = item;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.commit("delete", this.editedOrDeletedItems);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.editedOrDeletedItems = {};
    },

    getColumnValue(item) {
      switch (this.$route.params.entity) {
        case "films":
          return item.director;
        case "people":
          return item.birth_year;
        case "species":
          return item.language;
        case "planets":
          return item.population;
        case "vehicles":
          return item.model;
        case "starships":
          return item.model;
        default:
      }
    },
  },
};
</script>