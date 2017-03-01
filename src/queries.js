const pgp = require('pg-promise')();

const connectionString = 'postgres://localhost:5432/summpy';
const db = pgp(connectionString);

export const getTitles = (req, res, next) => {
  db.any('select * from summpy')
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
