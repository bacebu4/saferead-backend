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

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type AccountInfo {
    reviewAmount: Int!
    streak: Int!
    missed: Int!
    current: Int!
    createdAt: String!
    reviewed: Boolean!
  }

  type InitInfo {
    tags: [Tag]!
    latestBooks: [Book]!
    accountInfo: AccountInfo
  }

  type Query {
    dailyNotes: [Note]
    note(id: String): Note
    initInfo: InitInfo
    books: [Book]
  }

  type Mutation {
    addNewTag(name: String, hue: Int, id: String, noteId: String): Boolean
    updateReviewHistory(date: String): Boolean
    deleteNote(noteId: String): Boolean
    updateNote(noteId: String, text: String): Boolean
  }
`;

module.exports = typeDefs;
