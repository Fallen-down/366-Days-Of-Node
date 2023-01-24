const http = require("http");
const fs = require("node:fs");
const path = require("path");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/") req.url = "/index.html";
  const fileName = path.join(__dirname, "./public", req.url);
  if (fs.existsSync(fileName)) {
    const rs = fs.createReadStream(fileName, "utf8");
    // res.setHeader("Content-Type", "application/json; charset=utf8");
    rs.pipe(res);
  } else {
    console.log(
      `${req.url} -- ${req.method} -- ${req.headers["content-type"]}`
    );
    // 解决中文乱码
    // res.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.end(
      JSON.stringify({
        url: req.url,
        method: req.method,
        headers: req.headers,
      })
    );
  }
});

server.listen(3000);
