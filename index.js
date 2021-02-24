require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authService } = require("./services");

const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { gmailService } = require("./services");
const db = require("./db");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const { IS_DEV } = require("./variables");

const init = async () => {
  app.use(express.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: Object.values(resolvers),
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      try {
        if (!IS_DEV) {
          const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
          const doesExists = await authService.isUserExists(id);

          if (!doesExists) {
            throw new Error();
          }

          return { userId: id };
        }
        return { userId: "57345d46-af1e-49a8-9f37-a2570a4f381d" };
      } catch (error) {
        return { userId: null };
      }
    },
  });

  app.use(cors()); // TODO configure before deployment

  apolloServer.applyMiddleware({ app });

  await gmailService.init();

  await db.init();

  const PORT = process.env.PORT || 3000;

  app.get("*", (_, res) => {
    res.send("hey");
  });

  app.listen(PORT, async () => {
    console.log("Server has been started on port 3000...");
    await gmailService.newMessageEvent();
  });
};

init();
