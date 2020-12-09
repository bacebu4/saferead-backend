const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { notesService } = require("../services");

const schema = buildSchema(`#graphql
type Note {
  id: ID!
  text: String!
  note_text: String!
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
`);

const root = {
  hello: () => "hello controller",
  notes: async () => {
    const data = await notesService.getNotes(
      "57345d46-af1e-49a8-9f37-a2570a4f381d",
    );
    const notesWithTags = await notesService.getNotesWithTags(data);
    const notesWithComments = await notesService.getNotesWithComments(
      notesWithTags,
    );
    return notesWithComments;
  },
};

const graphql = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

module.exports = graphql;
