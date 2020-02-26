
如果是直接启动node程序的

```javascript
req.connection.remoteAddress
```

如果是使用了nginx反向代理,在nginx相关配置地方加上

```javascript
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

然后代码里使用

```javascript
var headers = req.headers;
console.log(headers['x-real-ip'] || headers['x-forwarded-for']);
```
