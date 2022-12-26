import {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} from "../controller/blog.js";

import { SuccessModel, ErrorModel } from "../model/resModel.js";

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

export default function handleBlogRouter(req, res) {
  const method = req.method;
  const id = req.query.id || "";

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";

    if (loginCheckResult) {
      return loginCheckResult;
    }
    author = req.session.username;

    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const result = getDetail(id);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  // 新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    req.body.author = req.session.username;

    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  // 更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const result = updateBlog(id, req.body);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新博客失败");
      }
    });
  }

  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const result = delBlog(id, req.session.username);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除博客失败");
      }
    });
  }
}
