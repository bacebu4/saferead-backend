const { loginService } = require("../services");

const loginResolver = {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const token = await loginService.login(email, password);

        if (!token) {
          throw new Error();
        }

        return token;
      } catch (__) {
        return "";
      }
    },
  },
};

module.exports = loginResolver;
