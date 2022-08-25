import axios from "axios";
const cancelToken = axios.CancelToken;
const source = cancelToken.source();

// const controller = new AbortController();
// const signal = controller.signal;

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
        .get(`http://swapi.dev/api/${data.entity}?search=${data.searchKey}`, {
          cancelToken: source.token,
        })
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
  clearData(context) {
    return new Promise((resolve) => {
      // source.cancel();
      context.commit("clearSearchData");
      resolve();
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
          if (index === 3) throw BreakException;
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
