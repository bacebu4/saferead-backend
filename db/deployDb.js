import { manager } from "./index";

const deployDb = async () => {
  await manager.query(/* sql */ `
  drop table if exists users cascade ;
  `);
  await manager.query(/* sql */ `
drop table if exists  notes cascade ;
  `);
  await manager.query(/* sql */ `
drop table if exists  comments cascade ;
  `);
  await manager.query(/* sql */ `
drop table if exists  books cascade;
  `);
  await manager.query(/* sql */ `
drop table if exists  authors cascade;
  `);
  await manager.query(/* sql */ `
drop table if exists  tags cascade;
  `);
  await manager.query(/* sql */ `
drop table if exists  notes_tags cascade;
  `);
  await manager.query(/* sql */ `
  create table users (
    user_id text PRIMARY KEY,
    review_amount int,
    streak int,
    missed int,
    current int,
    reviewed bool,
    createdAt date,
    email text UNIQUE,
    password text);
  `);
  await manager.query(/* sql */ `
  create table notes (
    note_id text PRIMARY KEY,
    user_id text,
    book_id text,
    createdAt date,
    updatedAt date,
    note_text text,
    seen bool,
    CONSTRAINT fk_users
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
                ON DELETE CASCADE
);
  `);
  await manager.query(/* sql */ `
  create table comments (
    comment_id text PRIMARY KEY,
    note_id text,
    comment_text text,
    createdAt date,
    updatedAt date,
    CONSTRAINT fk_notes
        FOREIGN KEY(note_id)
        REFERENCES notes(note_id)
                      ON DELETE CASCADE
);
  `);
  await manager.query(/* sql */ `
  create table authors (
    author_id text PRIMARY KEY,
    author_full_name text
);
  `);
  await manager.query(/* sql */ `
  create table books (
    book_id text PRIMARY KEY,
    author_id text,
    book_title text,
    CONSTRAINT fk_authors
        FOREIGN KEY(author_id)
        REFERENCES authors(author_id)
                   ON DELETE SET NULL
);
  `);
  await manager.query(/* sql */ `
  alter table notes add constraint fk_books
  foreign key(book_id) references books(book_id) ON DELETE SET NULL ;
  `);
  await manager.query(/* sql */ `
  create table tags (
    tag_id text UNIQUE,
    tag_name text,
    hue int,
    user_id text,
    CONSTRAINT fk_users
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
                   ON DELETE cascade,
    primary key (tag_id, user_id)
);
  `);
  await manager.query(/* sql */ `
  create table notes_tags (
    tag_id text,
    note_id text,
    CONSTRAINT fk_tags
        FOREIGN KEY(tag_id)
        REFERENCES tags(tag_id)
                        ON DELETE CASCADE,
    CONSTRAINT fk_notes
        FOREIGN KEY(note_id)
            REFERENCES notes(note_id)
                        ON DELETE CASCADE,
    primary key (note_id, tag_id)
);
  `);
};

module.exports = {
  deployDb,
};
