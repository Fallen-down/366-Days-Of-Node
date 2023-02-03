module.exports = {
  apps: [{
    "name": "pm2-test-server",
    "script": "./app.js",
    "watch": true,
    "ignore_watch": ["node_modules", "logs"],
    // "instances": 4,
    "error_file": "logs/err.log",
    "out_file": "logs/out.log",
    "log_date_format": "YYYY-MM-DD HH:mm:ss"
  }]
}
