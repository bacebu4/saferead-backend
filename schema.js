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
    hue: Int!
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
    notesBy(id: ID, type: String): [Note]
    note(id: ID): Note
    initInfo: InitInfo
    books: [Book]
    latestBooks: [Book]
    tags: [Tag]
    latestTags: [Tag]
  }

  type UpdatedNote {
    id: ID!
    text: String!
  }

  type Mutation {
    addNewTag(name: String, hue: Int, id: String, noteId: String): Boolean
    updateReviewHistory(date: String): Boolean
    deleteNote(noteId: String): Boolean
    updateNote(noteId: String, text: String): Note
  }
`;

module.exports = typeDefs;
