import { login } from "../controller/user.js";
import { SuccessModel, ErrorModel } from "../model/resModel.js";
import { get, set } from "../db/redis.js";

export default function handleUserRouter(req, res) {
  const method = req.method;

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then((data) => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // 同步到 redis
        set(req.sessionId, req.session);
        return new SuccessModel(data);
      } else {
        return new ErrorModel();
      }
    });
  }
}
