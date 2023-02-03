const express = require('express');
const path = require('path')
// 视图引擎
const { engine, create } = require('express-handlebars');


const app = express();

// 环境变量
const isDev = process.env.NODE_ENV === 'development';

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')))

// 设置 handlebars 视图引擎
const hbs = create({
  // 默认布局
  defaultLayout: 'main',
  helpers: {
    // foo() { return 'FOO!'; },
    // bar() { return 'BAR!'; }
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

if (!isDev) {
  app.enable('view cache');
}

app.get('/', (req, res) => {
  // res.type('text/plain');
  // res.send('Meadowlark Travel')
  res.render('home', {
    // layout: false

    // 变量
    showTitle: true,
    helpers: {
      foo() { return 'foo.'; }
    }
  });
})

app.get('/about', (req, res) => {
  const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ];

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  // res.type('text/plain');
  // res.send('About Meadowlark Travel')
  res.render('about', { fortune: randomFortune })
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
  console.error(err.stack)
  // res.type('text/plain')
  res.status(500);
  // res.send('500 - Server Error')

  res.render('500')
})

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate')
})