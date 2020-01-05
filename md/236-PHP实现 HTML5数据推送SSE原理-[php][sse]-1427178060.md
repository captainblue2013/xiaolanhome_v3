
SSE是一种允许服务器端向客户端推送新数据（简称数据推送）的HTML5技术。

![请输入图片描述](http://bbs.html5cn.org/data/attachment/forum/201503/23/154252lgtq0fb9ifsggbbt.png)

当数据源有新数据时，服务器端能立刻发送给一个或多个客户端，而不用等客户端来请求，这些新数据可能是突发新闻、最新股票、上线朋友的聊天信息、新的天气预报、策略游戏中的下一步等。

SSE适用于更新频繁、低延迟并且数据都是从服务端到客户端。它和WebSocket的区别：

1）便利，不需要添加任何新组件，用任何习惯的后端语言和框架就能继续使用，不用为新建虚拟机弄一个新的IP或新的端口号而劳神。

2）服务器端的简洁。因为SSE能在现有的HTTP/HTTPS协议上运作，所以它能够直接运行于现有的代理服务器和认证技术。

WebSocket相较SSE最大的优势在于它是双向交流的，这意味着服务器发送数据就像从服务器接受数据一样简单，而SSE一般通过一个独立的Ajax请求从客户端向服务端传送数据，因此相对于WebSocket使用Ajax会增加开销。因此，如果需要以每秒一次或者更快的频率向服务端传输数据，就应该用WebSocket。
## 浏览器端：
```javascript
&lt;!doctype html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;basic SSE test&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;pre id = "x"&gt;initializting...&lt;/pre&gt;
        &lt;!--之所以使用pre标签而不是p或者div是为了确保数据能以它被接受时的格式呈现，而不会修改或格式化--&gt;

    &lt;/body&gt;
    &lt;script&gt;
        var es = new EventSource("basic_sse.php");
        es.addEventListener("message",function(e){
            //e.data
            document.getElementById("x").innerHTML += "\n"+e.data;
        },false);//使用false表示在冒泡阶段处理事件，而不是捕获阶段。
    &lt;/script&gt;
&lt;/html&gt;
```
## 服务器端：
```javascript
&lt;?php
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');
    $time = date('Y-m-d H:i:s');

    echo 'retry: 1000'.PHP_EOL;
    echo 'data: The server time is: '.$time.PHP_EOL.PHP_EOL;
?&gt;
```

效果截图

![屏幕快照 2015-03-24 下午2.18.38.png](http://log.fyscu.com/usr/uploads/2015/03/2566330320.png)

# 注意事项：

> 
1.“Content-Type: text/event-stream”是专门为SSE设计的MIME类型`

2.retry可以定义推送间隔,如果不发送这个指令，默认间隔5000毫秒`

3.每行指令后面要有换行 \n ，用php的请用兼容方案 PHP_EOL`

4.最后一条指令要两个换行`

5.未完，其他详细容后发布`

