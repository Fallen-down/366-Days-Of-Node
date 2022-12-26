// 日志分析
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, "../", "../", "logs", "access.log");

// 创建 read stream
const readStream = fs.createReadStream(fileName);

// 创建 readline 对象
const readLine = readLine.createInterface({
  input: readStream,
});

let chromeNum = 0;
let sum = 0;

// 逐行读取
readLine.on("line", (lineData) => {
  if (!lineData) {
    return;
  }

  // 记录总行数
  sum++;

  const arr = lineData.split("--");
  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    // 累加 chrome 的 数量
    chromeNum++;
  }
});

// 监听读取完成
readLine.on("close", () => {
  console.log("chrome 占比:" + chromeNum / sum);
});
