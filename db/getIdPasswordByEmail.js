const { getConnection } = require("typeorm");

const getIdPasswordByEmail = async (email) => {
  const manager = await getConnection();

  if (email.includes("@me.com")) {
    email = email.replace("@me.com", "@icloud.com");
  }

  const [data] = await manager.query(
    /* sql */ `
    select user_id, password
    from users
    where email = $1;
  `,
    [email],
  );

  if (data && data.user_id && data.password) {
    return data;
  }
  return "";
};

module.exports = {
  getIdPasswordByEmail,
};
