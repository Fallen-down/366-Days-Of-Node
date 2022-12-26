import xss from "xss";
import { exec } from "../db/mysql.js";

export function getList(author, keyword) {
  let sql = `SELECT * FROM blogs WHERE 1=1 `;

  if (author) {
    sql += `AND author='${author}' `;
  }

  if (keyword) {
    sql += `AND title LIKE '%${keyword}%' `;
  }

  sql += `ORDER BY createtime DESC;`;

  return exec(sql);
}

export function getDetail(id) {
  const sql = `SELECT * FROM blogs WHERE id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
}

export function newBlog(blogData = {}) {
  let { title, content, author } = blogData;
  title = xss(title);
  const createTime = Date.now();
  const sql = `INSERT INTO blogs (title,content,createtime,author) VALUES('${title}', '${content}',${createTime},'${author}')`;

  return exec(sql).then((insertData) => {
    // console.log("insertData is ", insertData);
    return {
      id: insertData.insertId,
    };
  });
}

export function updateBlog(id, blogData = {}) {
  const { title, content } = blogData;
  const sql = `UPDATE blogs SET title='${title}',content='${content}' WHERE id=${id}`;
  return exec(sql).then((updata) => {
    if (updata.changedRows > 0) {
      return true;
    }
    return false;
  });
}

export function delBlog(id, author) {
  const sql = `DELETE FROM blogs WHERE id=${id} AND author='${author}'`;
  return exec(sql).then((delData) => {
    if (delData.affectedRows) {
      return true;
    }
    return false;
  });
}
