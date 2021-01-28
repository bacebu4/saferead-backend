const { getConnection } = require("typeorm");

const getIdByEmail = async (email) => {
  const manager = await getConnection();

  if (email.includes("@me.com")) {
    email = email.replace("@me.com", "@icloud.com");
  }

  const [data] = await manager.query(
    /* sql */ `
    select user_id
    from users
    where email = $1;
  `,
    [email],
  );

  if (data && data.user_id) {
    return data.user_id;
  }
  return "";
};

module.exports = {
  getIdByEmail,
};
