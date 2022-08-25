import { mapActions } from "vuex";

const common = {
  watch: {},
  data() {
    return {};
  },
  computed: {},

  methods: {
    ...mapActions(["showSnack"]),

    errorChecker(error) {
      var response = error;
      if (error.response) {
        response = error.response;
      }
      this.showMessageFromError(response);
    },

    showMessageFromError(response) {
      setTimeout(() => {
        let message =
          typeof response.data != "undefined" &&
          typeof response.data.message != "undefined"
            ? response.data.message
            : "Unknown error occurred.";

        this.showError(message);
        this.hideLoader();
      });
    },

    showError(message) {
      this.showSnack({
        text: message,
        type: "error",
        timeout: 10000,
      });
    },
  },
};

export default common;
