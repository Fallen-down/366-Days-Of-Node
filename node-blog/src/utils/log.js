import fs from "node:fs";
import fsPro from "node:fs/promises";
import path from "node:path";
import url from "node:url";

// 生成 write stream
function createWriteStream(fileName) {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  const writeStream = fs.createWriteStream(fullFileName, { flags: "a" });
  return writeStream;
}

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + "\n");
}

// 写访问日志
const accessWriteStream = createWriteStream("access.log");

// 写访问日志
export function access(log) {
  writeLog(accessWriteStream, log);
}
