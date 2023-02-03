const xss = require("xss");
const { exec } = require("../db/mysql.js");


exports.getList = async function (author, keyword) {
  let sql = `SELECT * FROM blogs WHERE 1=1 `;

  if (author) {
    sql += `AND author='${author}' `;
  }

  if (keyword) {
    sql += `AND title LIKE '%${keyword}%' `;
  }

  sql += `ORDER BY createtime DESC;`;

  return await exec(sql);
}

exports.getDetail = async function (id) {
  const sql = `SELECT * FROM blogs WHERE id='${id}'`;
  const rows = await exec(sql)
  return rows[0];
}

exports.newBlog = async function (blogData = {}) {
  let { title, content, author } = blogData;
  title = xss(title);
  const createTime = Date.now();
  const sql = `INSERT INTO blogs (title,content,createtime,author) VALUES('${title}', '${content}',${createTime},'${author}')`;

  const insertData = await exec(sql)
  // console.log("insertData is ", insertData);
  return {
    id: insertData.insertId,
  };

}

exports.updateBlog = async function (id, blogData = {}) {
  const { title, content } = blogData;
  const sql = `UPDATE blogs SET title='${title}',content='${content}' WHERE id=${id}`;
  const updata = await exec(sql)
  if (updata.changedRows > 0) {
    return true;
  }
  return false;

}

exports.delBlog = async function (id, author) {
  const sql = `DELETE FROM blogs WHERE id=${id} AND author='${author}'`;
  const delData = await exec(sql)
  if (delData.affectedRows) {
    return true;
  }
  return false;
}
