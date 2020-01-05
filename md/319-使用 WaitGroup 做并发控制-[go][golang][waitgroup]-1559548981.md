#### 0x00 题目：一个常见的业务场景

> 
通过气象台提供的天气接口，**并行** 地获取`北京`和`成都`的天气情况，返回一个无序列表。

接口参考: `http://www.weather.com.cn/data/cityinfo/{城市编码}.html`

北京 101010100    成都  101270101

以上业务场景，属于比较常见的并行获取资源。

多进程（线程）（协程）并行操作是基本操作，考核点在于如何让主线可以统筹控制各个支线。

一般来说我们有3种常见结题思路：

1. 全局共享的哨兵变量
2. 利用`channel`做协程间的通信（模型类似事件监听）
3. 通过高度封装的 `sync.WaitGroup`

由于后续会专门出一篇关于`channel`的内容，本篇我们只讲述最简单的`sync.WaitGroup`
#### =============== 敲黑板分界线 ================

> 
此处只展示结构，完整代码请看 [这里](https://github.com/captainblue2013/pieces-of-code)

```javascript
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
)

/**
 *
 */
type WeatherBody struct {
	WeatherInfo `json:"weatherinfo"`
}

type WeatherInfo struct {
	// 城市
	City string `json:"city"`
	// 最低温度
	Low string `json:"temp1"`
	// 最高温度
	High string `json:"temp2"`
}

// 获取天气情况的函数
func GetWeatherByCity(cityCode string) WeatherInfo {
	resp, err := http.Get("http://www.weather.com.cn/data/cityinfo/" + cityCode + ".html")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	weatherBody := WeatherBody{}

	json.Unmarshal(body, &amp;weatherBody)

	return weatherBody.WeatherInfo
}

func main() {
	result := []WeatherInfo{}
	// 声明一个 waitGroup 并增加两个等待信号
	var wg sync.WaitGroup
	wg.Add(2)

	// 使用协程请求北京天气情况
	go func() {
		weatherInfo := GetWeatherByCity("101010100")
		result = append(result, weatherInfo)
		// 告诉 wg 我已经完成任务
		wg.Done()
	}()

	// 使用协程请求成都天气情况
	go func() {
		weatherInfo := GetWeatherByCity("101270101")
		result = append(result, weatherInfo)
		// 告诉 wg 我已经完成任务
		wg.Done()
	}()

	wg.Wait()
	fmt.Printf("%+v\n", result)
}

/**
知识点
1. http模块的使用方式
2. byte数组与 json 的转换
3. WaitGroup 的 Add、Done、Wait方法的配合使用
*/
```
#### 主要代码讲解
1. 通过 `wg.Add(2)`设置两个信号量
2. 在 `goroutine`里执行任务结束后，记得调用`wg.Done()`
3. 在 **主协程** 里使用 `wg.Wait()`等待所有任务完成
4. 打印结果

#### 0x01 提问 &amp; 练手 环节
1. 上述代码，如果把 `wg.Add(2)`改为 `wg.Add(1)`会是什么效果？
2. 上述代码，如果把 `wg.Add(2)`改为 `wg.Add(3)`会是什么效果？
3. 上述代码，如果去掉 `wg.Wait()`会是什么效果？

