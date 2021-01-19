const { authService } = require("../services");

const authResolver = {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const token = await authService.login(email, password);

        return token;
      } catch (__) {
        return "";
      }
    },
    register: async (_, { email, password }) => {
      try {
        const token = await authService.register(email, password);

        return token;
      } catch (__) {
        return "";
      }
    },
  },
};

module.exports = authResolver;
