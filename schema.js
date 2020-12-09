const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Note {
    id: ID!
    text: String!
    title: String!
    authorFullName: String!
    tags: [Tag]
    deleted: Boolean
    # comments: [Comment]
  }

  type Tag {
    id: ID!
    name: String
  }

  type Query {
    hello: String
    notes: [Note]
  }
`;

module.exports = typeDefs;
