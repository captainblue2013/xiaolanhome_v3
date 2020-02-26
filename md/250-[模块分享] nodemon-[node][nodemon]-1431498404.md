# http://nodemon.io/
```javascript
nodemon 可以在node程序开发阶段，自动监测代码变化，自动重启程序，
让你可以像写php一样，保存一下，刷新页面就有效果。
```
# 安装
`npm install nodemon -g`

```javascript
安装在全局，所有项目都能用。
```
# 使用
```javascript
nodemon app.js  代替原来的   node app.js
值得注意的是，nodemon是监控当前启动nodemon的目录，
所以，如果你在 / 下启动 nodemon /path/of/app.js
它将监控整个 / 的变化。细思极恐
```
# 建议
```javascript
建议启动nodemon时，加上 -i 参数，忽略掉views目录和public目录，
nodemon app.js -i views -i public  
-i 参数表示忽略指定目录或文件的变化。
这样做的好处是，单纯改改html、css、js这种文件的时候，不用自动重启，
导致session丢失的问题。
```
