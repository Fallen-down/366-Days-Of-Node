const express = require('express');
// 上传文件
const formidable = require('formidable');
const { mkdirSync, existsSync, rename } = require('node:fs');
// 路径处理
const path = require('path')
// 视图引擎
const { engine, create } = require('express-handlebars');
// Gzip压缩
const compression = require('compression')
// 安全
const helmet = require("helmet");
// 随机显示
const { getFortune } = require('./lib/fortune')
// 获取天气数据
const { getWeatherData } = require('./lib/weather');

const credentials = require('./credentials.js');
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer');


// var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
// cookie: {
//   secure: true,
//   httpOnly: true,
//   domain: 'example.com',
//   path: 'foo/bar',
//   expires: expiryDate
// }

const app = express();
app.use(cookieParser(credentials.cookieSecret))

// 环境变量
const isDev = process.env.NODE_ENV === 'development';

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')))

// 设置 handlebars 视图引擎
const hbs = create({
  // 控制布局扩展名
  extname: '.hbs',
  // 默认布局
  defaultLayout: 'main',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
// 视图模块 扩展名
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

if (isDev) {
  app.use(function (req, res, next) {
    res.locals.showTests = req.query.test === '1'
    next()
  })
} else {
  // 启用视图模板编译缓存。
  app.enable('view cache');
  // Gzip压缩可以大大减少响应体的大小，
  app.use(compression())
  // 
  app.use(helmet());
}

app.use(function (req, res, next) {
  if (!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weatherContext = getWeatherData();
  next();
});

app.get('/', (req, res) => {
  // res.type('text/plain');
  // res.send('Meadowlark Travel')
  res.render('home', {
    // layout: false

    // 变量
    helpers: {
      foo() { return 'foo.'; }
    }
  });
})

app.get('/about', (req, res) => {
  // res.type('text/plain');
  // res.send('About Meadowlark Travel')
  res.render('about', { fortune: getFortune(), pageTestScript: '/qa/tests-about.js' })
})

app.get('/tours/hood-river', function (req, res) {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
  res.render('tours/request-group-rate');
});

app.get('/jquery-test', function (req, res) {
  res.render('jquery-test');
});

app.get('/contest/vacation-photo', function (req, res) {
  var now = new Date();
  res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() });
});

const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, 'upload/2023-2') })
app.post('/contest/vacation-photo/:year/:month', upload.single('photo'), function (req, res, next) {
  const regex = /\.[^/.]+$/g;
  // paragraph.match(regex)
  const { filename, originalname } = req.file
  const found = originalname.match(regex)
  if (found) {
    // 扩展名
    const file_extension = found.at(-1)
    // 新文件路径
    const new_file_path = path.join(__dirname, '/upload/2023-2/', filename + file_extension)
    // 源文件路径
    const original_file_path = path.join(__dirname, '/upload/2023-2/', filename)
    rename(original_file_path, new_file_path, function (err) {
      if (err) {
        next(err)
      } else {
        console.log(req.body)
        res.json(req.body)
      }
    })
  }

});

app.get('/sendEmail', (req, res, next) => {
  const mailTransport = nodemailer.createTransport({
    // secureConnection: true, // 用 SSL 端口 : 465
    service: '163',

    // host: 'smtp.163.com',
    // port: 465,
    // secure: true,
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.password,
    }
  })
  mailTransport.sendMail({
    from: '"18331623695@163.com',
    to: '1140173234@qq.com',
    subject: 'Your Meadowlark Travel Tour',
    html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
      'Meadowlark Travel. <b>We look forward to your visit!</b>',
    generateTextFromHtml: true,
  }, function (err) {
    if (err) {
      next(err)
    } else {
      res.json({})
    }
  });
})






// 定制 404 页面
app.use(function (req, res, next) {
  // res.type('text/plain');
  res.status(404)
  // res.send('404 - Not found');

  res.render('404')
})

// 定制 500 页面
app.use(function (err, req, res, next) {
  res.status(500);
  if (err.responseCode === 553) {
    res.json(err)
  }
  console.error(err.stack)
  // res.type('text/plain')

  // res.send('500 - Server Error')

  res.render('500')
})

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate')
})