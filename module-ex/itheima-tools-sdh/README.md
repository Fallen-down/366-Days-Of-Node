## 安装

```
npm install itheima-tools-sdh
```

## 导入

```js
const itheima = require("itheima-tools-sdh");
```

### 格式化时间

```js
// 调用 dateFormat 对时间进行格式化
const dtStr = itheima.dateFormat(new Date());
// 输出结构 2023-01-08 14:35:07
console.log(dtStr);
```

## 转义 HTML 中的特殊字符

```js
// 待转换的 HTML 字符串
const htmlStr = '<h1 title="abc">这是 h1 标签 <span>123&nbps;<span></h1>';
// 调用 htmlEscape 方法进行转换
const str = itheima.htmlEscape(htmlStr);
// 转换结果 &lt;h1 title=&quot;abc&quot;&gt;这是 h1 标签 &lt;span&gt;123&amp;nbps;&lt;span&gt;&lt;/h1&gt
console.log(str);
```

## 还原 HTML 中的特殊字符

```js
// 待还原的 HTML 字符串
const str2 = itheima.htmlUnEscape(str);

// 转换结果 <h1 title="abc">这是 h1 标签 <span>123&nbps;<span></h1>
console.log(str2);
```

## 开源协议

ISC