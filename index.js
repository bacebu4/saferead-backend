require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const routes = require("./routes");
const { messagesService } = require("./services");
const db = require("./db");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const init = async () => {
  app.use(express.json());
  app.use("/api", routes);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: Object.values(resolvers),
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      try {
        const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        return { userId: isVerified.id };
      } catch (error) {
        return { userId: null };
      }
    },
  });
  app.use(cors()); // TODO configure before deployment

  apolloServer.applyMiddleware({ app });

  await messagesService.init();
  await db.init();

  const PORT = process.env.PORT || 3000;

  app.get("*", (_, res) => {
    res.send("hey");
  });

  app.listen(PORT, async () => {
    console.log("Server has been started on port 3000...");
    await messagesService.newMessageEvent();
  });
};

init();
