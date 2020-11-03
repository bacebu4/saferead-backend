import { manager } from "./index";

const getIdPasswordByEmail = async (email) => {
  if (email.includes("@me.com")) {
    email = email.replace("@me.com", "@icloud.com");
  }
  const data = await manager.query(
    /* sql */ `
    select user_id, password
    from users
    where email = $1;
  `,
    [email],
  );

  if (data.length) {
    return data[0];
  }
  return "";
};

module.exports = {
  getIdPasswordByEmail,
};
