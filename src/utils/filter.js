import Vue from "vue";

Vue.filter("highlight", function (words, query) {
  return words.replace(
    query,
    "<span style='font-weight: bold'>" + query + "</span>"
  );
});

export default Vue.filter;
