const { dateFormat } = require("./dateFormat");
const { format } = require("date-fns");

const dt = new Date().getTime();
console.log(dateFormat(dt));

console.log(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
