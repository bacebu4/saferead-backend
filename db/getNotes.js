import { manager } from './index';

const getNotes = async (id) => {
  const raw = await manager.query(/* sql */`
    select note_text, comment_text, book_title, author_full_name, n.note_id
    from users
        join notes n on users.user_id = n.user_id
        join books b on n.book_id = b.book_id
        join authors a on b.author_id = a.author_id
        left join comments c on n.note_id = c.note_id
    where users.user_id = $1 and seen = false;
  `, [id]);
  return raw;
};

module.exports = {
  getNotes,
};
