import axios from "axios";
const state = {
  entityList: [],
  selectedItem: null,
};

const getters = {
  getEntityList: (state) => state.entityList,
  getSelectedItem: (state) => state.selectedItem,
};

const actions = {
  loadEntity(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://swapi.dev/api/${data.entity}?page=${data.page}`)
        .then((response) => {
          context.commit("setEntityData", response.data.results);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
const mutations = {
  setEntityData: (state, data) => {
    if (data && data.length) {
      state.entityList = data;
    }
  },

  delete: (state, item) => {
    if (state.entityList.indexOf(item)) {
      state.entityList.splice(state.entityList.indexOf(item), 1);
    }
  },

  create: (state, item) => {
    state.entityList.unshift(item);
  },

  setSelectedItem: (state, item) => {
    state.selectedItem = item;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
