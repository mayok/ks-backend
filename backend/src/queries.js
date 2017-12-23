import http from 'http';
import parse from './parser';

const pgp = require('pg-promise')();

const connectionString =
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`;
const db = pgp(connectionString);


const fetchTextFrom = url => new Promise((resolve, reject) => {
  const req = http.get(url, (res) => {
    if (res.statusCode < 200 || res.statusCode > 299) {
      reject(new Error(`Failed to load page, status code: ${res.statusCode}`));
    }

    const body = [];
    res.on('data', chunk => body.push(chunk));
    res.on('end', () => resolve(body.join('')));
  });
  req.on('error', err => reject(err));
});

const summarize = (text, options) => new Promise((resolve, reject) => {
  const postData = {
    text,
    sent_limit: options.sent_limit,
  };
  const params = {
    host: options.url,
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };
  const req = http.request(params, (res) => {
    const body = [];
    res.on('data', chunk => body.push(chunk));
    res.on('end', () => resolve(body.join('')));
  });
  req.on('error', err => reject(err));
  req.write(postData);
  req.end();
});

export const getTitles = (req, res, next) => {
  db.any('select title from record')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
        });
    })
    .catch(err => next(err));
};

export const getContent = (req, res, next) => {
  // id ではなくて, date に変更するかも
  const id = parseInt(req.params.id, 10);
  db.oneOrNone('select content from record where id = $1', id)
    .then((data) => {
      if (data) {
        res.status(200)
          .json({
            status: 'success',
            data,
          });
      } else {
        // TODO: URL はどこか別の場所で定義する
        const URL = 'example.com';
        fetchTextFrom(URL)
          .then(xml => parse(xml))
          .then(text => summarize(text, {
            url: URL,
            sent_limit: 3,
          }))
          .then(json => res.status(200)
            .json({
              status: 'success',
              json,
            }))
          .then(db.none(
            'insert into record(title, content) values($1, $2)',
            ['title', 'content'],
          )
            .then()
            .catch(err => next(err)))
          .catch(err => console.log(err));
      }
    })
    .catch((err) => { next(err); });
};
