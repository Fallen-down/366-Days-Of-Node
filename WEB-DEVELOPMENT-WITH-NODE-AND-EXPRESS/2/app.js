const http = require('http')
const fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
  if (!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function (err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error')
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data)
    }
  })
}

const app = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    // 'Content-Type': 'text/html'
  })
  // 规范化 url，去掉查询字符串、可选的反斜杠，并把它变成小写
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  console.log(path)
  switch (path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;

    case '/about':
      res.end('About')
      break;

    case '/img/logo.jpg':
      serveStaticFile(res, '/public/img/logo.jpg',
        'image/jpeg');
      break

    default:
      res.end('Not Found')
      break;
  }
})

app.listen(3000, function () {
  console.log('server started on localhost:3000; press Ctrl-c to terminate...')
})