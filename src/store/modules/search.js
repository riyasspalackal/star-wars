import axios from "axios";
const state = {
  searchList: [],
};

const getters = {
  getSearchList: (state) => state.searchList,
};

const actions = {
  loadSearchData(context, data) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://swapi.dev/api/${data.entity}?search=${data.searchKey}`)
        .then((response) => {
          resolve(response.data.results);
          context.commit("setSearchData", {
            result: response.data.results,
            entity: data.entity,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
const mutations = {
  setSearchData: (state, data) => {
    if (data.result && data.result.length) {
      state.searchList.push({ header: true, name: data.entity });
      var BreakException = {};
      try {
        data.result.forEach(function (el, index) {
          state.searchList.push(el);
          if (index === 2) throw BreakException;
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
      state.searchList.push({ divider: true, name: data.entity });
    }
  },

  clearSearchData: (state) => {
    state.searchList = [];
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
