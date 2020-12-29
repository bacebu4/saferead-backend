const { getConnection } = require("typeorm");

const getDailyNotes = async (userId) => {
  const manager = await getConnection();
  const raw = await manager.query(
    /* sql */ `
    select *
    from daily_notes
    where "userId" = $1
    and date_part('year', date) =  date_part('year', now())
    and date_part('month', date) =  date_part('month', now())
    and date_part('day', date) =  date_part('day', now())
    order by "noteId";
  `,
    [userId],
  );
  return raw;
};

module.exports = {
  getDailyNotes,
};
