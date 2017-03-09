import http from 'http';

const pgp = require('pg-promise')();

const connectionString =
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`;
const db = pgp(connectionString);

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
  // 流れ
  // 1. db.one select summarized text, return
  // 2. fetch text from API
  // 3. parse xml to plain text or json
  // 4. summarize
  // 5. return summarized text to client
  // 6. insert into record

  // id ではなくて, date に変更するかも
  const id = parseInt(req.params.id, 10);
  db.one('select content from record where id = $1', id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
        });
    })
    .catch((err) => {
      // next(err);

      // 以下、fetch, parse 等は catch の中に書くことじゃないと思う。
      // 解決策が今は思いつかないため、残しておく

      // 2. fetch text from API
      //   HTTP GET
      const URL = 'example.com';
      http.get(URL, (response) => {
        let body = '';
        response.setEncoding('utf8');

        response.on('data', (chunk) => {
          body += chunk;
        });

        response.on('end', (r) => {
          // 3. parse xml to json
          // json = XML.parse(body);
          // console.log(json);
        });
      }).on('error', e => console.log(e.message));

      // 4. summarize
      //    HTTP POST
      //      return summarized data
      const postData = {
        text: 'text',
        sent_limit: '3',
      };
      const options = {
        host: URL,
        port: 80,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length,
        },
      };
      const request = http.requestuest(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          console.log(chunk);
          // res.status(200)
          //    .json({
          //      status: 'success',
          //      chunk,
          //    });
        });
      });
      request.on('error', e => console.log(e.message));
      // request.write(json)
      request.end();

      // db.none('insert into record(title, content) values($1, $2)',
      //         ['title', 'content'])
      //   .then()
      //   .catch(err => next(err));
    });
};
