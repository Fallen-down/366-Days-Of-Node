// 补零
function padZero(n) {
  return n > 9 ? n : `0${n}`;
}

// 格式化时间
function dateFormat(dateStr) {
  const date = new Date(dateStr);

  const yyyy = date.getFullYear();
  const MM = padZero(date.getMonth() + 1);
  const dd = padZero(date.getDate());

  const HH = padZero(date.getHours());
  const mm = padZero(date.getMinutes());
  const ss = padZero(date.getSeconds());

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

module.exports = {
  dateFormat,
};
