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
    noteId: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Info {
    reviewAmount: Int!
    latestReviewDate: String!
    streakBeginningDate: String!
  }

  type Query {
    dailyNotesIds: [String]
    notesBy(id: ID, type: String): [Note]
    note(id: ID): Note
    info(id: ID): Info
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
    addComment(noteId: ID, commentId: ID, text: String): Note
    addExistingTag(noteId: ID, tagId: ID): Note
    addNewTag(noteId: ID, tagId: ID, name: String, hue: Int): Note
    updateTag(tagId: ID, name: String, hue: Int): Boolean
    deleteTag(tagId: ID): Boolean
    deleteTagFromNote(noteId: ID, tagId: ID): Note
    deleteComment(commentId: ID, noteId: ID): Note
    updateReviewHistory(date: String): Boolean
    deleteNote(noteId: String): Boolean
    updateNote(noteId: String, text: String): Note
    updateComment(commentId: ID, text: String): Comment
  }
`;

module.exports = typeDefs;
