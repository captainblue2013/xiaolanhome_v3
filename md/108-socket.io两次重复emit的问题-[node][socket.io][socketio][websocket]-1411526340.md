
背景：

```javascript
express+angular+socket.io实现的即时通信，在客户端emit一个事件信号的时候,
会重复发两次！任何信号都是！
```

纠结这个问题很久，查了好多资料，再一次印证google强大的事实，在浏览一篇外文时找到了答案。
`http://stackoverflow.com/questions/18815843/socket-io-event-being-triggered-twice `楼主自问自答也是蛮拼的，反正是解决了我的问题。

> 
For future reference this was occurring because I was setting my angular controller in both my HTML and under my $routeProvider. This was then triggering everything twice. 

**原因就是：Angular惹的祸，在html页面里定义的控制器，和在路由表里定义的控制器，都会生效，这样就造成了定义了两个同样的控制器，那么触发两次emit就不难理解了。以下是两个定义路由的地方：** 
![QQ截图20140924103714.png](http://log.fyscu.com/usr/uploads/2014/09/1373443136.png)

![QQ截图20140924103743.png](http://log.fyscu.com/usr/uploads/2014/09/1977159788.png)
**解决方案：我取消了路由表里定义的控制器，因为还是比较习惯在html里写控制器，scope范围比较好掌握。 ** 
