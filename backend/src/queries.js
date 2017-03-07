const pgp = require('pg-promise')();

const connectionString =
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`;
const db = pgp(connectionString);

export const getTitles = (req, res, next) => {
  db.none('insert into record(title, content) values($1, $2)', ['title', 'content'])
    .then(() => {
      console.log("insert: success");
    })
    .catch(() => {
      console.log("insert: error");
    });
  db.any('select * from record')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved titles',
        });
    })
    .catch(err => next(err));
};

export const getContent = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  db.one('select * from summpy where id = $1', id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved content',
        });
    })
    .catch(err => next(err));
};
