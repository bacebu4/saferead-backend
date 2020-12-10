const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Note {
    id: ID!
    text: String!
    title: String!
    author: String!
    tags: [Tag]
    deleted: Boolean
    comments: [Comment]!
  }

  type Tag {
    id: ID!
    name: String!
    hue: String!
  }

  type Comment {
    id: ID!
    text: String!
    createdAt: String!
  }

  type Query {
    dailyNotes: [Note]
    note(id: String): Note
  }
`;

module.exports = typeDefs;
