import { Server } from 'http';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'x-test, Content-Type, Accept, Access-Control-Allow-Headers',
};

const server = Server((req, res, reqBody = '') => {
  if (req.url === '/result4/') {
    req
      .on('data', d => reqBody += d)
      .on('end', () => {
        res.writeHead(200, {
          'Content-type': 'application/json; charset=utf-8',
          ...CORS
        });

        const data = {
          'message': 'zdarya',
          'x-result': req.headers['x-test'],
          'x-body': reqBody
        };

        return res.end(JSON.stringify(data));
      });
  } else {
    res.writeHead(200, {
      'Content-type': 'application/json; charset=utf-8',
      ...CORS
    });
    res.end();
  }
});

server.listen(80);