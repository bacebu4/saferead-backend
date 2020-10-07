import { manager } from './index';

const getIdByEmail = async (email) => {
  if (email.includes('@me.com')) {
    email = email.replace('@me.com', '@icloud.com');
  }
  const data = await manager.query(/* sql */`
    select user_id
    from users
    where email = $1;
  `, [email]);

  console.log(data);
  if (data.length) {
    return data[0].user_id;
  }
  return '';
};

module.exports = {
  getIdByEmail,
};
