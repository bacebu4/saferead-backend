require("dotenv").config();
const express = require("express");
// const { ApolloServer } = require("apollo-server-express");

const app = express();
const cors = require("cors");
const routes = require("./routes");
const { messagesService } = require("./services");
// const { notesService } = require("./services");
const db = require("./db");
// const resolvers = require("./resolvers");
// const typeDefs = require("./schema");
const graphqlController = require("./controllers/graphql.controller");

const init = async () => {
  app.use(express.json());
  app.use("/api", routes);

  // const apolloServer = new ApolloServer({
  //   typeDefs,
  //   dataSources: () => ({ notesService }),
  //   resolvers,
  // });
  app.use(cors()); // TODO configure before deployment

  // apolloServer.applyMiddleware({ app });

  await messagesService.init();
  await db.init();

  const PORT = process.env.PORT || 3000;
  app.use("/graphql", graphqlController);

  app.get("*", (_, res) => {
    res.send("hey");
  });

  app.listen(PORT, async () => {
    console.log("Server has been started on port 3000...");
    await messagesService.newMessageEvent();
  });
};

init();
