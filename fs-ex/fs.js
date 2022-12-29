const fs = require("node:fs");
const fsPro = require("node:fs/promises");
const path = require("node:path");

const fileName = path.join(__dirname, "index.html");

// 定义正则表达式

const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 处理 css
async function resolveCSS(htmlStr) {
  // 正则提取内容
  const rl = regStyle.exec(htmlStr);
  if (rl === null) {
    return rl;
  } else {
    // 多个 style 标签 通过 style 转换成数组
    let cl = rl[0].split("</style>");

    // 替换数组中的 scrip 标签
    cl = cl.map((style) => {
      return style.replace("<style>", "").replace(/\r\n/g, "").trim();
    });
    // 过滤掉 undefined
    cl = cl.filter((item) => item);
    // 文件目录路径
    const filePath = path.join(__dirname, "/style");
    // 判断目录是否存在
    if (fs.existsSync(filePath)) await fsPro.rm(filePath, { recursive: true });
    // 新增目录
    await fsPro.mkdir(filePath, { recursive: true });

    cl.forEach((item) => {
      const random = Math.floor(Math.random() * Math.pow(10, 8));
      fsPro
        .writeFile(path.join(filePath, `/style${random}.css`), item)
        .then((result) => {
          if (result == null) {
            console.log("css 写入成功");
          }
        });
    });
  }
}

// 处理 js 脚本
async function resolveJS(htmlStr) {
  const rl = regScript.exec(htmlStr);
  const newJS = rl[0].replace(/<script>/g, "").replace(/<\/script>/g, "");
  // 文件目录路径
  const filePath = path.join(__dirname, "/js");
  // 判断目录是否存在
  if (fs.existsSync(filePath)) await fsPro.rm(filePath, { recursive: true });
  // 新增目录
  await fsPro.mkdir(filePath, { recursive: true });
  fsPro.writeFile(path.join(filePath, `/log.js`), newJS).then((result) => {
    if (result == null) {
      console.log("js 写入成功");
    }
  });
}

// 处理 html
function resolveHTMl(htmlStr) {
  const newHTML = htmlStr
    .toString()
    .replace(regStyle, '<link rel="stylesheet" href="style.css" />')
    .replace(regScript, '<script src="./js/log.js"></script>');

  fsPro
    .writeFile(path.join(__dirname, "index1.html"), newHTML)
    .then((result) => {
      if (result == null) {
        console.log("html 写入成功");
      }
    });
}

fsPro.readFile(fileName).then((data) => {
  resolveCSS(data);
  resolveJS(data);
  resolveHTMl(data);
});
