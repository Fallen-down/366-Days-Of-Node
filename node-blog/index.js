import queryString from "query-string";
import cookie from "cookie";
import { access } from "./src/utils/log.js";
import handleBlogRouter from "./src/router/blog.js";
import handleUserRouter from "./src/router/user.js";

// 获取 cookie 的过期时间
function getCookieExpires() {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
}

// 用于处理 postdata
const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });
};

export default function serverHandle(req, res) {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers["user-agent"]} -- ${Date.now()}`);
  // 设置返回格式 JSON
  res.setHeader("Content-Type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];
  req.query = queryString.parse(url.split("?")[1]);

  // 解析 cookie
  const cookies = cookie.parse(req.headers.cookie || "");
  req.cookie = cookies;

  let userId = req.cookie.userId;
  let needSetCookie = false;

  if (userId) {
    needSetCookie = false;
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理 blog 路由

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("userId", String(userId), {
              path: "/",
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7, // 1 week
            })
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("userId", String(userId), {
              path: "/",
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7, // 1 week
            })
          );
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 未命中路由，返回 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
}
