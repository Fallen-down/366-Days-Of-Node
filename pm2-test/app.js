const http = require('http');

const server = http.createServer((req, res) => {
  // 模拟日志
  console.log('cur time', Date.now());
  // 模拟错误
  console.error('错误日志', Date.now());

  // 抛出错误
  if (req.url === '/err') {
    throw new Error('/err 错误了')
  }

  res.setHeader('Content-type', 'application/json');
  res.end(
    JSON.stringify(
      {
        erron: 0,
        msg: 'pm2 test server 3'
      }
    ))
})

server.listen(8000, () => {
  console.log('server listening on port 8000...')
})
