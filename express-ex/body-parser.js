const qs = require('node:querystring');

function bodyParser(req, res, next) {
  let bodyStr = "";
  req.on("data", (chunk) => {
    bodyStr += chunk.toString();
  });

  req.on("end", () => {
    if (req.headers["content-type"] == "application/json") {
      req.body = JSON.parse(bodyStr);
    }

    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      req.body = qs.parse(bodyStr)
    }
    next();
  });
}

module.exports = bodyParser