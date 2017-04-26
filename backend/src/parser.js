import { parseString } from 'xml2js';

const parser = xml => new Promise((resolve, reject) => {
  parseString(xml, (err, res) => {
    if (err) reject(err);

    resolve(res);
  });
});

export default parser;
