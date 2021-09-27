'use strict';

const http = require('http');
const extract = require('./extract');
const load = require('./load');

const etl = async () => {
  console.log('Extracting...');
  const events = await extract.extract();
  console.log('Extracting finished');
  console.log('Loading...');
  await load.load(events);
  console.log('Load finished');
};

const server = http.createServer((req, res) => {
  if (req.url === process.env.TRIGGER_ETL) {
      etl()
        .then(() => {
          res.end('OK');
        })
        .catch((error) => {
          res.end(error.message);
        });
  }
});

server.listen(process.env.PORT, () => {
  console.log('Server started');
});