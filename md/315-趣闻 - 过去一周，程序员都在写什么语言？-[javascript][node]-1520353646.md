
一直以来我在使用一个叫**wakatime** 的工具来记录每天的编码情况。

比如：

![daily_waka.png](http://log.fyscu.com/usr/uploads/2018/03/637394479.png)

想要了解**wakatime** 的， 自己去[https://wakatime.com](https://wakatime.com)了解一下。

除了这个以外，**wakatime** 还提供一个公开的排行榜，展示了**最近七天** 用户的编码排名情况。

![leader.png](http://log.fyscu.com/usr/uploads/2018/03/1817434637.png)

### 于是机会来了。
- 把这个排名的数据抓取下来，只要前40页
- 把每一个用户使用的语言列表、每个语言的时长记录统计起来
- 按语言归类， 看看哪个语言最近7天的使用时间最多。

### 第一步，数据爬下来，目标40页
我当然是不希望抓页面的，这样太没趣，更重要的是

**人家有提供接口！！！** 

> 
https://wakatime.com/api/v1/leaders?page=1

这下事情就简单多了，代码如下：

```javascript
'use strict';
const request = require('request-agent').init();
const fs = require('fs');

(async () =&gt; {
  let data = {};
  for (let i = 0; i &lt; 40; i++) {
    data = await request
      .method('get')
      .url(`https://wakatime.com/api/v1/leaders?page=${i + 1}`)
      .send();
    fs.writeFileSync(`./waka_stat/${i + 1}.json`, data.body);
  }
})().then((v) =&gt; {
  console.log(v); process.exit(0);
}).catch((e) =&gt; {
  console.log(e);
});
```
### 第二步，统计
你可能要问， 为什么不一遍请求接口一遍统计呢？

原因是这个接口速度有点蛋疼（翻墙好点）， 先把数据拉下来， 这样我统计的部分调试也方便。

贴代码：

```javascript
'use strict';
const fs = require('fs');
let result = {};

for (let i = 1; i &lt;= 40; i++) {
  let data = require(`./${i}.json`).data;
  let len = data.length;
  for (let k = 0; k &lt; len; k++) {
    let languages = data[k].running_total.languages;
    for (let index in languages) {
      result[languages[index].name] = result[languages[index].name] || 0;
      result[languages[index].name] += languages[index].total_seconds;
    }
  }
}

let unsort = [];
for (let k in result) {
  unsort.push({
    name: k,
    seconds: Number.parseInt(result[k] / 3600),
  });
}
unsort.sort((a, b) =&gt; {
  if (a.seconds &gt; b.seconds) return -1;
  return 1;
})
fs.writeFileSync('./waka_stat/result.json', JSON.stringify(unsort, null, 2));
```
### 结果
贴一部分：

![WordArt.png](http://log.fyscu.com/usr/uploads/2018/03/748102548.png)

```javascript
[
  {
    "name": "JavaScript",
    "hours": 15112
  },
  {
    "name": "PHP",
    "hours": 9366
  },
  {
    "name": "Java",
    "hours": 4164
  },
  {
    "name": "TypeScript",
    "hours": 3262
  },
  {
    "name": "Python",
    "seconds": 3119
  },
  {
    "name": "HTML",
    "hours": 3054
  },
  {
    "name": "C#",
    "hours": 2662
  },
  {
    "name": "Ruby",
    "hours": 1981
  },
  {
    "name": "Vue.js",
    "hours": 1698
  }...
```
